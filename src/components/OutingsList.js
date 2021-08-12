import {useSelector} from 'react-redux'

function OutingsList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username
    
    return (
        <>
            <h3>{home ? 'Your Outings: ': `${user.username}'s Outings:`}</h3>
        </>
    )
}

export default OutingsList