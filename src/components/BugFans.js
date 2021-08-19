import {useSelector} from 'react-redux'
import UserCard from "./UserCard"

function BugFans() {
    const users = useSelector(state => state.users)
    const currentUser = useSelector(state => state.currentUser)

    return (
        <>
            <h1>Bug Fans Like You!</h1>
            {users.map(user => {
                if(user.username !== currentUser.username) {
                    return <UserCard key={user.id} user={user} />
                }
            })}
        </>
    )
}

export default BugFans