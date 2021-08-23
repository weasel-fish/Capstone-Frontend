import {useState} from 'react'
import {useHistory} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {DirectUpload} from 'activestorage'
import styled from 'styled-components'


const Button = styled.button`
    align-self: center;
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
    margin: 5px 0px 50px 0px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    border: 2px solid black;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    height: 450px;
    margin: 40px auto;
    background-color: white;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 30px auto 30px auto;
    padding: 5px;
    
    height: 40px;

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
        margin: 15px 0px 0px 0px;
    }
`

function EditUserForm() {

    const currentUser = useSelector(state => state.currentUser)
    const [email, setEmail] = useState(currentUser.address)
    const [errors, setErrors] = useState([])
    const [newAvatar, setNewAvatar] = useState({})
    const history = useHistory()
    const dispatch = useDispatch()

    function handleEmailUpdate(e) {
        e.preventDefault()

        fetch(`users/${currentUser.id}/update_email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({address: email})
        })
        .then(resp => resp.json())
        .then(user => {
            dispatch({type: 'currentUser/set', payload: user})
            history.push('/user-home')
        })
    }

    function handleAvatarUpdate(e) {
        e.preventDefault()
        handleUpload(newAvatar, currentUser)
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
                    history.push('/user-home')
                })
            }
        })
    }

    function handleCancel() {
        history.push('/user-home')
    }

    function handleDelete() {
        fetch(`/users/${currentUser.id}`, {method: 'DELETE'})
        .then(() => {
            history.push('/')
            dispatch({type: 'currentUser/set', payload: ''})
            dispatch({type: 'users/remove', payload: currentUser.id})
        })
    }

    
    return (
        <Container>
            <StyledForm onSubmit={handleEmailUpdate}>
                <label>Change Your Email: <input type='text' name='address' onChange={(e) => setEmail(e.target.value)} value={email}></input></label>
                <input type='submit' value='Save'/>
            </StyledForm>
            <StyledForm onSubmit={handleAvatarUpdate}>
                <label>Upload New Avatar: <input type='file' name='avatar' onChange={(e) => setNewAvatar(e.target.files[0])} ></input></label>
                <input type='submit' value='Upload'/>
            </StyledForm>
            <Button onClick={() => handleDelete()}>Delete Account</Button>
            <Button onClick={() => handleCancel()}>Cancel Changes</Button>
        </Container>
    )
}

export default EditUserForm