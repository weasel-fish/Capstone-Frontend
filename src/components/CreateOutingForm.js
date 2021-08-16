import {useState} from 'react'
import {useDispatch} from 'react-redux'

function CreateOutingForm({setDisplayForm}) {
    const [formData, setFormData] = useState({name:'', location: '', description: '', notes: ''})
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let resp = await fetch('/outings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formData})
        })

        if(resp.ok){
            resp.json().then(outing => {
                dispatch({type: 'currentUser/addOuting', payload: outing})
                setDisplayForm(false)
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

export default CreateOutingForm