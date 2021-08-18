import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {DirectUpload} from 'activestorage'
import NewAnimalForm from './NewAnimalForm'

function AddSightingForm({outingID, sightings, setSightings, setSightingForm}) {
    const [dropdown, setDropdown] = useState('generate')
    const animals = useSelector(state => state.animals)
    const [formData, setFormData] = useState({environment: '', weather_conditions: '', notes: ''})
    const [animForm, setAnimForm] = useState({common_name: '', scientific_name: '', description: ''})
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        //New animal
        if(dropdown === 'generate') {
            let resp = await fetch('/sightings/with-new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...animForm, ...formData, outing_id: outingID})
            })

            if(resp.ok) {
                resp.json().then(data => {
                    dispatch({type: 'animals/add', payload: data.animal})
                    let newSightings = [...sightings, data.sighting]
                    setSightings(newSightings)
                    setSightingForm(false)
                })
            } else {
                resp.json().then(data => {
                    setErrors(data.errors)})
            }
            //Existing animal
        } else {
            if(!formData.image) {
                let resp = await fetch('/sightings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // ...formData,
                        environment: formData.environment,
                        notes: formData.notes,
                        weather_conditions: formData.weather_conditions,
                        animal_id: dropdown,
                        outing_id: outingID,
                        no_image: true
                    })
                })
                .then(resp => resp.json())
                .then(sight => {
                    let newSightings = [...sightings, sight]
                    setSightings(newSightings)
                    setSightingForm(false)
                })
            } else {
                let resp = await fetch('/sightings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // ...formData,
                        environment: formData.environment,
                        notes: formData.notes,
                        weather_conditions: formData.weather_conditions,
                        animal_id: dropdown,
                        outing_id: outingID
                    })
                })

                if(resp.ok) {
                    resp.json().then(sighting => {
                        handleUpload(formData.image, sighting)
                    })
                } else {
                    resp.json().then(data => setErrors(data.errors))
                }
            }
        }
    }

    function handleUpload(file, sighting) {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if(error) {
                setErrors([error])
            } else {
                fetch(`/sightings/${sighting.id}/add_image`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({image: blob.signed_id})
                })
                .then(resp => resp.json())
                .then(sight => {
                    let newSightings = [...sightings, sight]
                    setSightings(newSightings)
                    setSightingForm(false)
                })
            }
        })
    }

    function handleDropChange(e) {
        setDropdown(e.target.value)
    }

    function handleAnimChange(e) {
        setAnimForm({
            ...animForm,
            [e.target.name] : e.target.value
        })
    }

    function handleChange(e) {
        if(e.target.name === 'image') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }
    console.log(formData)
    return (
        <>
            <h5>Add a Sighting</h5>
            <form onSubmit={handleSubmit}>
                <label>Pick a tracked animal or generate new information</label>
                <select onChange={handleDropChange} name='animal'>
                    <option value='generate'>Generate new</option>
                    {animals.map(anim => <option key={anim.id} value={anim.id}>{anim.common_name}</option>)}
                </select>
                {dropdown === 'generate' ? <NewAnimalForm animForm={animForm} handleAnimChange={handleAnimChange}/> : null}
                <label>Upload an image:</label>
                <input type='file' name='image' onChange={handleChange} ></input>
                <label>Environment:</label>
                <input type='text' name='environment' onChange={handleChange} value={formData.environment}></input>
                <label>Weather Conditions:</label>
                <input type='text' name='weather_conditions' onChange={handleChange} value={formData.weather_conditions}></input>
                <label>Notes:</label>
                <input type='text' name='notes' onChange={handleChange} value={formData.notes}></input>
                {errors.length > 0 ? errors.map(error => <li>{error}</li>) : null}
                <input type='submit' />
            </form>
        </>
    )
}

export default AddSightingForm