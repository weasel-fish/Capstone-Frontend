import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import UserCard from './UserCard'
import {useSelector, useDispatch} from 'react-redux'
import SightingCard from './SightingCard'
import AddSightingForm from './AddSightingForm'

function Outing() {
    const [outing, setOuting] = useState({})
    const [attendees, setAttendees] = useState([])
    const [openInvites, setOpenInvites] = useState([])
    const [sightings, setSightings] = useState([])

    const [loading, setLoading] = useState(true)
    const [attending, setAttending] = useState(false)
    const [message, setMessage] = useState('')
    const [sightingForm, setSightingForm] = useState(false)
  
    const params = useParams()
    const currentUser = useSelector(state => state.currentUser)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`/outings/${params.id}`)
        .then(resp => resp.json())
        .then(outing => {
            setOuting(outing)
            setAttendees(outing.users)
            setOpenInvites(outing.outing_invites)
            setSightings(outing.sightings)
            setLoading(false)
            if(outing.users.some(user => user.id === currentUser.id)) {
                setAttending(true)
            }
        })
    }, [])

    async function invite(e) {
        e.preventDefault()

        let resp = await fetch('/outing_invites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inviter_id: currentUser.id,
                invitee_id: e.target.invitee.value,
                outing_id: outing.id
            })
        })
        if(resp.ok){
            resp.json().then((data) => {
                setMessage('Invite sent!')
                let newOpenInvites = [...openInvites, data]
                setOpenInvites(newOpenInvites)
            })
        } else {
            resp.json().then((data) => setMessage(data.error))
        }
    }

    async function leave() {
        let resp = await fetch(`/leave/${currentUser.id}/${outing.id}`, {method: 'DELETE'})

        if (resp.ok) {
            setAttending(false)
            dispatch({type: 'currentUser/removeOuting', payload: outing.id})
            let newAttendees = attendees.filter(user => user.id !== currentUser.id)
            setAttendees(newAttendees)
        }
    }

    function generateOutingInfo() {
        const inviteOthers = (
            <>
                <label>Invite others:</label>
                <form onSubmit={invite}>
                    <select onChange={() => setMessage('')} name='invitee' defaultValue='default'>
                        <option disabled value='default'>---</option>
                        {users.map(user => {
                            if(!attendees.some(attendee => attendee.id === user.id) && !openInvites.some(invite => invite.invitee_id === user.id)) {
                                return <option key={user.id} value={user.id}>{user.username}</option>
                            }
                        })}
                    </select>
                    <input type='submit' value='Send Invite'/>
                </form>
                {message ? <p>{message}</p> : null}
            </>
        )

        return (
            <>
                <h2>{outing.name}</h2>
                <p>Where: {outing.location}</p>
                <p>When: {outing.date}</p>
                <p>Description: {outing.description}</p>
                <p> Notes: {outing.notes}</p>
                <h3>Attendees:</h3>
                {attendees.map(user => <UserCard key={user.id} user={user}/>)}
                {attending ? inviteOthers : null}
                {attending ? <button onClick={() => leave()}>Leave Outing</button> : null}
                <h3>Sightings!</h3>
                {attending ? <button onClick={() => setSightingForm(!sightingForm)}>Add Sighting</button> : null}
                {sightingForm ? <AddSightingForm outingID={outing.id} sightings={sightings} setSightings={setSightings} setSightingForm={setSightingForm}/> : null}
                {sightings.map(sight => <SightingCard key={sight.id} sighting={sight} sightings={sightings} setSightings={setSightings}/>)}
            </>
        )
    }

    return (
        <>
            {loading ? <p>Loading...</p>: generateOutingInfo()}
        </>
    )
}

export default Outing