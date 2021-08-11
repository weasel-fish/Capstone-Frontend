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

    function handleSubmit(e) { //NEED TO HANDLE ERRORS
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(user => {
            if(user.ok){
                dispatch({type: 'currentUser/set', payload: user})
                console.log('hello')
                history.push('/home')
            } else {
                setError(user.error)
                setFormData({username: '', password: ''})
            }
            // dispatch(setCurrentUser(user)) DOES NOT WORK YET
        })
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