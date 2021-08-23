import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {DirectUpload} from 'activestorage'
import NewAnimalForm from './NewAnimalForm'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 8px;
    width: 90%;
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    /* align-items: stretch; */
    justify-content: space-around;
    flex-wrap: wrap;
    width: 90%;
    /* height: 00px; */

    & input[type=select] {
    }

    & input[type=submit] {
        align-self: center;
        padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        cursor: pointer;
        margin: 5px 0px 5px 0px;
    }
`

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
            if(!formData.image) {
                let resp = await fetch('/sightings/with-new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...animForm,
                        // ...formData,
                        environment: formData.environment,
                        notes: formData.notes,
                        weather_conditions: formData.weather_conditions,
                        outing_id: outingID,
                        no_image: true
                    })
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
            } else {
                let resp = await fetch('/sightings/with-new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...animForm,
                        // ...formData,
                        environment: formData.environment,
                        notes: formData.notes,
                        weather_conditions: formData.weather_conditions,
                        outing_id: outingID
                    })
                })

                if(resp.ok) {
                    resp.json().then(data => {
                        dispatch({type: 'animals/add', payload: data.animal})
                        handleUpload(formData.image, data.sighting)
                    })
                } else {
                    resp.json().then(data => setErrors(data.errors))
                }

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

                if(resp.ok) {
                    resp.json()
                    .then(sight => {
                        let newSightings = [...sightings, sight]
                        setSightings(newSightings)
                        setSightingForm(false)
                    })
                } else {
                    resp.json().then(data => setErrors(data.errors))
                }

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
    return (
        <Container>
            <h5>Add a Sighting</h5>
            <StyledForm onSubmit={handleSubmit}>
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
                {errors.length > 0 ? errors.map(error => <li key={error}>{error}</li>) : null}
                <input type='submit' />
            </StyledForm>
        </Container>
    )
}

export default AddSightingForm