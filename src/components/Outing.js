import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import UserCard from './UserCard'
import {useSelector} from 'react-redux'

function Outing() {
    const [outing, setOuting] = useState({})
    const [loading, setLoading] = useState(true)
    const [attending, setAttending] = useState(false)
    const [message, setMessage] = useState('')
    const [openInvites, setOpenInvites] = useState([])
    const params = useParams()
    const currentUser = useSelector(state => state.currentUser)
    const users = useSelector(state => state.users)

    useEffect(() => {
        fetch(`/outings/${params.id}`)
        .then(resp => resp.json())
        .then(outing => {
            setOuting(outing)
            setOpenInvites(outing.outing_invites)
            setLoading(false)
            if(outing.users.some(user => user.id === currentUser.id)) {
                setAttending(true)
            }
        })
    }, [])

    async function invite(e) {
        e.preventDefault()
        console.log(e.target.invitee.value)
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

    function generateOutingInfo() {
        const inviteOthers = (
            <>
                <label>Invite others:</label>
                <form onSubmit={invite}>
                    <select onChange={() => setMessage('')} name='invitee' defaultValue='default'>
                        <option disabled value='default'>---</option>
                        {users.map(user => {
                            if(!outing.users.some(attendee => attendee.id === user.id) && !openInvites.some(invite => invite.invitee_id === user.id)) {
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
                <p>{outing.date}</p>
                <p>{outing.location}</p>
                <p>{outing.description}</p>
                <p>{outing.notes}</p>
                <h3>Attendees:</h3>
                {outing.users.map(user => <UserCard key={user.id} user={user}/>)}
                {attending ? inviteOthers : null}
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