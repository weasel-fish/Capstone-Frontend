import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {DirectUpload} from 'activestorage'
import styled from 'styled-components'

const StyledSignup = styled.div`
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
    
    height: 250px;

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
        &:hover {
        background-color: #A42BF5;
        color: white;
        }
    }
`

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

    async function handleSubmit(e) {
        e.preventDefault()
        if(!formData.avatar) {
            let resp = await fetch('/users', { //DEFAULT AVATAR CONDITION
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    address: formData.address,
                    no_avatar: true
                })
            })
            if(resp.ok){
                resp.json().then(user => {
                    dispatch({type: 'currentUser/set', payload: user})
                    dispatch({type: 'users/add', payload: {id: user.id, username: user.username}})
                    history.push('/user-home')
                })
            }
                
        } else {
            let resp = await fetch('/users', { //CUSTOM AVATAR
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
                resp.json().then(user => {
                    console.log(user)
                    handleUpload(formData.avatar, user)
                })
            } else {
                resp.json().then(user => setErrors(user.errors))
            }
        }
    }

    function handleUpload(file, user) {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if(error) {
                setErrors([error])
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
                    dispatch({type: 'currentUser/set', payload: user})
                    dispatch({type: 'users/add', payload: {id: user.id, username: user.username}})
                    history.push('/user-home')
                })
            }
        })
    }

    return (
        <StyledSignup>
            <h3>Sign Up:</h3>
            <StyledForm onSubmit={handleSubmit}>
                <label>Username: <input type='text' name='username' onChange={handleChange} value={formData.username}></input></label>
                <label>Password: <input type='password' name='password' onChange={handleChange} value={formData.password}></input></label>
                <label>Email: <input type='text' name='address' onChange={handleChange} value={formData.address}></input></label>
                <label>Avatar: <input type='file' name='avatar' onChange={handleChange} ></input></label>
                <input type='submit' value='Create Account'/>
            </StyledForm>
            {errors ? errors.map(error => <li key={error}>{error}</li>) : null}
        </StyledSignup>
    )
}

export default SignupForm