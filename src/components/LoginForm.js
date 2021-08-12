import {useState} from 'react'
import {useDispatch} from 'react-redux'
// import setCurrentUser from '../slices/currentUserSlice'
import {useHistory} from 'react-router-dom'

function LoginForm() {

    const [formData, setFormData] = useState({username: '', password: ''})
    const [error, setError] = useState('')

    let dispatch = useDispatch()
    let history = useHistory()

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) { //NEED TO HANDLE ERRORS
        e.preventDefault()

        let resp = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(resp.ok){
            setError('')
            resp.json().then(user => {
                dispatch({type: 'currentUser/set', payload: user})
                history.push('/user-home')
            })
        } else {
            resp.json().then(user => {
                setError(user.error)
                setFormData({username: '', password: ''})
            })
        }
    }

    return (
        <>
            <h3>Log In:</h3>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input onChange={handleChange} type='text' name='username' value={formData.username}></input>
                <label>Password:</label>
                <input onChange={handleChange} type='password' name='password'value={formData.password}></input>
                <input type='submit' value='Log In'/>
            </form>
            {error ? <p>{error}</p> : null}
        </>
    )
}

export default LoginForm