import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {DirectUpload} from 'activestorage'

function SignupForm() {

    const [formData, setFormData] = useState(
        {
            username: '', 
            password: '', 
            address: '', 
            avatar: ''
        })
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    let history = useHistory()
    
    function handleChange(e) {

        if(e.target.name === 'avatar') {
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

    async function handleSubmit(e) {
        e.preventDefault()

        let resp = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                address: formData.address
            })
        })

        if(resp.ok) {
            resp.json().then(user => handleUpload(formData.avatar, user)
            )
        } else {
            resp.json().then(user => setErrors(user.errors))
        }
    }

    function handleUpload(file, user) {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if(error) {
                console.log(error)
            } else {
                fetch(`/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({avatar: blob.signed_id})
                })
                .then(resp => resp.json())
                .then(user => {
                    setErrors([])
                    dispatch({type: 'currentUser/set', payload: user})
                    history.push('/user-home')
                })
            }
        })
    }

    return (
        <>
            <h3>Sign Up:</h3>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type='text' name='username' onChange={handleChange} value={formData.username}></input>
                <label>Password:</label>
                <input type='password' name='password' onChange={handleChange} value={formData.password}></input>
                <label>Email:</label>
                <input type='text' name='address' onChange={handleChange} value={formData.address}></input>
                <label>Avatar (image url):</label>
                <input type='file' name='avatar' onChange={handleChange} ></input>
                <input type='submit' value='Create Account'/>
            </form>
            {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
        </>
    )
}

export default SignupForm