import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

function UserCard({user}) {

    const history = useHistory()
    const currentUser = useSelector(state => state.currentUser)
    const self = currentUser.id === user.id

    function handleUserClick() {
        if(self){
            history.push('/user-home')
        } else {
        history.push(`/x-user-page/${user.id}`)
        }
    }


    return (
        <>
            <li onClick={() => handleUserClick()}>{user.username}</li>
        </>
    )
}

export default UserCard