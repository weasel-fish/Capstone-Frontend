import {useState} from 'react'
import styled from 'styled-components'

const Button = styled.button`
    align-self: center;
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
    margin: 5px 5px 50px 5px;
    &:hover {
        background-color: #A42BF5;
        color: white;
    }
`

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
                <img src={`http://localhost:3000${sighting.image}`} alt='bug pic'/>
                <label>Environment:</label>
                <input type='text' name='environment' onChange={handleChange} value={formData.environment}></input>
                <label>Weather Conditions:</label>
                <input type='text' name='weather_conditions' onChange={handleChange} value={formData.weather_conditions}></input>
                <label>Notes:</label>
                <input type='text' name='notes' onChange={handleChange} value={formData.notes}></input>
                <Button as='input' type='submit' />
            </form>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
            <Button onClick={() => handleDelete()}>Delete</Button>
        </>
    )
}

export default EditSightingForm