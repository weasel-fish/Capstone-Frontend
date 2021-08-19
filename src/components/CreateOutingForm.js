import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {DirectUpload} from 'activestorage'

function CreateOutingForm({setDisplayForm}) {
    const [formData, setFormData] = useState({name:'', location: '', description: '', notes: ''})
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    
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


        // setFormData({
        //     ...formData,
        //     [e.target.name]: e.target.value
        // })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if(!formData.image) {
            let resp = await fetch('/outings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // ...formData,
                    name: formData.name,
                    location: formData.location,
                    date: formData.date,
                    description: formData.description,
                    notes: formData.notes,
                    no_image: true
                })
            })
    
            if(resp.ok){
                resp.json().then(outing => {
                    dispatch({type: 'currentUser/addOuting', payload: outing})
                    setDisplayForm(false)
                })
            } else {
                resp.json().then(data => setErrors(data.errors))
            }
        } else {
            let resp = await fetch('/outings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // ...formData,
                    name: formData.name,
                    location: formData.location,
                    date: formData.date,
                    description: formData.description,
                    notes: formData.notes
                })
            })

            if(resp.ok) {
                resp.json().then(outing => {
                    handleUpload(formData.image, outing)
                })
            } else {
                resp.json().then(outing => setErrors(outing.errors))
            }
        }

        // let resp = await fetch('/outings', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({...formData})
        // })

        // if(resp.ok){
        //     resp.json().then(outing => {
        //         dispatch({type: 'currentUser/addOuting', payload: outing})
        //         setDisplayForm(false)
        //     })
        // } else {
        //     resp.json().then(data => setErrors(data.errors))
        // }
    }

    function handleUpload(file, outing) {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if(error) {
                setErrors([error])
            } else {
                fetch(`/outings/${outing.id}/add_image`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({image: blob.signed_id})
                })
                .then(resp => resp.json())
                .then(outing => {
                    dispatch({type: 'currentUser/addOuting', payload: outing})
                    setDisplayForm(false)
                })
            }
        })
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
                <label>Image:</label>
                <input type='file' name='image' onChange={handleChange} ></input>
                <input type='submit' />
                {errors ? errors.map(error => <li key={error}>{error}</li>):null}
            </form>
        </>
    )
}

export default CreateOutingForm