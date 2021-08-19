import {useState} from 'react'

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
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type='text' name='name' onChange={handleChange} value={formData.name}></input>
                <label>Where:</label>
                <input type='text' name='location' onChange={handleChange} value={formData.location}></input>
                <label>When:</label>
                <input type='date' name='date' onChange={handleChange} value={formData.date}></input>
                <label>Description:</label>
                <input type='text' name='description' onChange={handleChange} value={formData.description}></input>
                <label>Notes:</label>
                <input type='text' name='notes' onChange={handleChange} value={formData.notes}></input>
                <input type='submit' />
                {errors ? errors.map(error => <li key={error}>{error}</li>):null}
            </form>
        </>
    )
}

export default EditOutingForm