import {useSelector} from 'react-redux'
import UserCard from './UserCard'

function FollowingList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username

    return (
        <>
            <h3>{home ? 'You are following: ': `${user.username} is following:`}</h3>
            {user.followees.length > 0 ? user.followees.map(fol => <UserCard key={fol.id} user={fol}/>) : home ? `You aren't following anyone` : `${user.username} isn't following anyone`}
        </>
    )
}

export default FollowingList