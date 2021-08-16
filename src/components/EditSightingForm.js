import {useState} from 'react'


function EditSightingForm({sighting, sightings, setSightings, setEdit}) {
    const [formData, setFormData] = useState({environment: sighting.environment, weather_conditions: sighting.weather_conditions, notes: sighting.notes})
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        let resp = await fetch(`/sightings/${sighting.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formData})
        })

        if(resp.ok){
            resp.json().then(sight => {
                console.log(sightings)
                let newSightings = sightings.map(elem => {
                    if (elem.id === sight.id) {
                        return sight
                    } else {
                        return elem
                    }
                })
                setSightings(newSightings)
                setEdit(false)
            })
        }
    }

    function handleDelete() {
        fetch(`/sightings/${sighting.id}`, {method: 'DELETE'})
        .then(() => {
            let newSightings = sightings.filter(sight => sight.id !== sighting.id)
            setSightings(newSightings)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Environment:</label>
                <input type='text' name='environment' onChange={handleChange} value={formData.environment}></input>
                <label>Weather Conditions:</label>
                <input type='text' name='weather_conditions' onChange={handleChange} value={formData.weather_conditions}></input>
                <label>Notes:</label>
                <input type='text' name='notes' onChange={handleChange} value={formData.notes}></input>
                <input type='submit' />
            </form>
            <button onClick={() => setEdit(false)}>Cancel</button>
            <button onClick={() => handleDelete()}>Delete</button>
        </>
    )
}

export default EditSightingForm