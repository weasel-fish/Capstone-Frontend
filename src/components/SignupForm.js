import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let resp = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(resp.ok) {
            resp.json().then(user => {
                setErrors([])
                dispatch({type: 'currentUser/set', payload: user})
                history.push('/user-home')
            })
        } else {
            resp.json().then(user => setErrors(user.errors))
        }
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
                <input type='text' name='avatar' onChange={handleChange} value={formData.avatar}></input>
                <input type='submit' value='Create Account'/>
            </form>
            {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
        </>
    )
}

export default SignupForm