import {useState} from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    
    height: 250px;

    & input[type=submit] {
        align-self: flex-start;
        padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        cursor: pointer;
        &:hover {
        background-color: #A42BF5;
        color: white;
    }
    }
`

function EditOutingForm({outing, setOuting, setEdit}) {
    const [formData, setFormData] = useState({name: outing.name, location: outing.location, date: outing.date, description: outing.description, notes: outing.notes})
    const [errors, setErrors] = useState([])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErrors([])

        let resp = await fetch(`/outings/${outing.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formData})
        })

        if(resp.ok) {
            resp.json().then(outing => {
                setEdit(false)
                setOuting(outing)
            })
        } else {
            resp.json().then(data => setErrors(data.errors))
        }
    }

    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                <label>Name: <input type='text' name='name' onChange={handleChange} value={formData.name}></input></label>
                
                <label>Where: <input type='text' name='location' onChange={handleChange} value={formData.location}></input></label>
                
                <label>When: <input type='date' name='date' onChange={handleChange} value={formData.date}></input></label>
                
                <label>Description: <input type='text' name='description' onChange={handleChange} value={formData.description}></input></label>
                
                <label>Notes: <input type='text' name='notes' onChange={handleChange} value={formData.notes}></input></label>
                
                <input type='submit' />
                {errors ? errors.map(error => <li key={error}>{error}</li>):null}
            </StyledForm>
        </>
    )
}

export default EditOutingForm