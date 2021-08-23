import {useState} from 'react'
import {useHistory} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {DirectUpload} from 'activestorage'

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
        <>
            <form onSubmit={handleEmailUpdate}>
                <label>Change Your Email: <input type='text' name='address' onChange={(e) => setEmail(e.target.value)} value={email}></input></label>
                <input type='submit' value='Save'/>
            </form>
            <form onSubmit={handleAvatarUpdate}>
                <label>Upload New Avatar: <input type='file' name='avatar' onChange={(e) => setNewAvatar(e.target.files[0])} ></input></label>
                <input type='submit' value='Upload'/>
            </form>
            <button onClick={() => handleDelete()}>Delete Account</button>
            <button onClick={() => handleCancel()}>Cancel</button>
        </>
    )
}

export default EditUserForm