import {useSelector} from 'react-redux'
import {useState} from 'react'
import NewAnimalForm from './NewAnimalForm'

function AddSightingForm({outingID, sightings, setSightings, setSightingForm}) {
    const [dropdown, setDropdown] = useState('generate')
    const animals = useSelector(state => state.animals)
    const [formData, setFormData] = useState({environment: '', weather_conditions: '', notes: ''})
    const [animForm, setAnimForm] = useState({common_name: '', scientific_name: '', description: ''})
    const [errors, setErrors] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        if(dropdown === 'generate') {
            let resp = await fetch('/sightings/with-new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...animForm, ...formData, outing_id: outingID})
            })

            if(resp.ok) {
                resp.json().then(sight => {
                    let newSightings = [...sightings, sight]
                    setSightings(newSightings)
                    setSightingForm(false)
                })
            } else {
                resp.json().then(data => {
                    console.log(data)
                    setErrors(data.errors)})
            }

        } else {
            let resp = await fetch('/sightings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    animal_id: dropdown,
                    outing_id: outingID
                })
            })

            if(resp.ok) {
                resp.json().then(sight => {
                    let newSightings = [...sightings, sight]
                    setSightings(newSightings)
                    setSightingForm(false)
                })
            } else {
                resp.json().then(data => setErrors(data.errors))
            }
        }
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <h5>Add a Sighting</h5>
            <form onSubmit={handleSubmit}>
                <label>Pick a tracked animal or generate new information</label>
                <select onChange={handleDropChange} name='animal'>
                    <option value='generate'>Generate new</option>
                    {animals.map(anim => <option value={anim.id}>{anim.common_name}</option>)}
                </select>
                {dropdown === 'generate' ? <NewAnimalForm animForm={animForm} handleAnimChange={handleAnimChange}/> : null}
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