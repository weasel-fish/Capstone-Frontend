import {useSelector} from 'react-redux'
import OutingCard from './OutingCard'
import CreateOutingForm from './CreateOutingForm'
import {useState} from 'react'

function OutingsList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username
    const [displayForm, setDisplayForm] = useState(false)
    
    return (
        <>
            <h3>{home ? 'Your Outings: ': `${user.username}'s Outings:`}</h3>
            {user.outings.length > 0 ? user.outings.map(out => <OutingCard key={out.id} outing={out} />) : home ? "You don't have any outings" : `${user.username} doesn't have any outings`}
            {home ? <button onClick={() => setDisplayForm(!displayForm)}>{displayForm ? 'Nevermind' : 'Create a New Outing'}</button> : null}
            {displayForm ? <CreateOutingForm setDisplayForm={setDisplayForm}/> : null}
        </>
    )
}

export default OutingsList