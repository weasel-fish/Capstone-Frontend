import {useState} from 'react'
import {useDispatch} from 'react-redux'
// import setCurrentUser from '../slices/currentUserSlice'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px auto 0px auto;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-around;
    
    height: 150px;

    & input[type=submit] {
        align-self: center;
        padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        cursor: pointer;
        margin: 5px 0px 5px 0px;
    }
`

const Error = styled.p`
    color: red;
    font-weight: 700;
`

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
        <StyledLogin>
            <h3>Log In:</h3>
            <StyledForm onSubmit={handleSubmit}>
                <label>Username: <input onChange={handleChange} type='text' name='username' value={formData.username}></input></label>
                <label>Password: <input onChange={handleChange} type='password' name='password'value={formData.password}></input></label>
                <input type='submit' value='Log In'/>
            </StyledForm>
            {error ? <Error>{error}</Error> : null}
        </StyledLogin>
    )
}

export default LoginForm