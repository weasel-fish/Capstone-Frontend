import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import UserCard from './UserCard'
import {useSelector, useDispatch} from 'react-redux'
import SightingCard from './SightingCard'
import AddSightingForm from './AddSightingForm'
import EditOutingForm from './EditOutingForm'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`

const StyledPic = styled.div`
    grid-area: 1 / 1 / 3 / 3;
    margin: 50px auto 0px auto;
    text-align: center;

    & h1 {
        padding-bottom: 20px;
    }
`

const StyledInfo = styled.div`
    grid-area: 1 / 3 / 3 / 6;
    margin: auto;
`

const StyledSightings = styled.div`
    grid-area: 3 / 3 / 6 / 5;
    margin: auto;
`
const StyledAttendees = styled.div`
    grid-area: 3 / 1 / 6 / 3;
    margin: 60px auto 0px auto;
    /* padding: px; */
`   
const StyledInviteOthers = styled.div`
`

function Outing() {
    const [outing, setOuting] = useState({})
    const [attendees, setAttendees] = useState([])
    const [openInvites, setOpenInvites] = useState([])
    const [sightings, setSightings] = useState([])

    const [loading, setLoading] = useState(true)
    const [attending, setAttending] = useState(false)
    const [message, setMessage] = useState('')
    const [sightingForm, setSightingForm] = useState(false)
    const [edit, setEdit] = useState(false)
  
    const params = useParams()
    const history = useHistory()
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

    function deleteOuting() {
        fetch(`/outings/${outing.id}`, {method: 'DELETE'})
        .then(() => {
            dispatch({type: 'currentUser/removeOuting', payload: outing.id})
            history.push('/user-home')
        })

    }

    function generateOutingInfo() {
        const inviteOthers = (
            <StyledInviteOthers>
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
            </StyledInviteOthers>
        )

        return (
            <GridContainer>
                <StyledPic>
                    <h1>{outing.name}</h1>
                    <br></br>
                    <img src={`http://localhost:3000${outing.image}`} alt='outing pic'/>
                </StyledPic>
                <StyledInfo>
                    {edit ? <EditOutingForm outing={outing} setOuting={setOuting} setEdit={setEdit}/> :
                    <>
                        <p>Where: {outing.location}</p>
                        <p>When: {outing.date}</p>
                        <p>Description: {outing.description}</p>
                        <p> Notes: {outing.notes}</p>
                    </>}
<button onClick={() => setEdit(!edit)}>{edit ? 'Nevermind' : 'Edit Outing Info'}</button>
                </StyledInfo>
                <StyledAttendees>
                    <h3>Attendees:</h3>
                    {attendees.map(user => <UserCard key={user.id} user={user}/>)}
                    {attending ? inviteOthers : null}
                    {attending ? attendees.length === 1 ? <button onClick={() => deleteOuting()}>Delete Outing</button>: <button onClick={() => leave()}>Leave Outing</button> : null}
                </StyledAttendees>
                <StyledSightings>
                    <h3>Sightings!</h3>
                    {attending ? <button onClick={() => setSightingForm(!sightingForm)}>{sightingForm? 'Nevermind' : 'Add Sighting'}</button> : null}
                    {sightingForm ? <AddSightingForm outingID={outing.id} sightings={sightings} setSightings={setSightings} setSightingForm={setSightingForm}/> : null}
                    {sightings.map(sight => <SightingCard key={sight.id} sighting={sight} sightings={sightings} setSightings={setSightings}/>)}
                </StyledSightings>
            </GridContainer>
        )
    }

    return (
        <>
            {loading ? <p>Loading...</p>: generateOutingInfo()}
        </>
    )
}

export default Outing