import {useSelector} from 'react-redux'
import UserCard from './UserCard'

function FollowersList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username

    return (
        <>
            <h3>{home ? 'You are being followed by: ': `${user.username} is being followed by:`}</h3>
            {user.followers.length > 0 ? user.followers.map(fol => <UserCard key={fol.id} user={fol}/>) : home ? `You don't have any followers` : `${user.username} doesn't have any followers`}
        </>
    )
}

export default FollowersList