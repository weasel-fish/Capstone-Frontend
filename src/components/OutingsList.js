import {useSelector} from 'react-redux'
import OutingCard from './OutingCard'

function OutingsList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username
    
    return (
        <>
            <h3>{home ? 'Your Outings: ': `${user.username}'s Outings:`}</h3>
            {user.outings.length > 0 ? user.outings.map(out => <OutingCard key={out.id} outing={out} />) : home ? "You don't have any outings" : `${user.username} doesn't have any outings`}
        </>
    )
}

export default OutingsList