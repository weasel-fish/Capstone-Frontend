import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import UserCard from './UserCard'
import {useSelector, useDispatch} from 'react-redux'
import SightingCard from './SightingCard'
import AddSightingForm from './AddSightingForm'
import EditOutingForm from './EditOutingForm'
import styled from 'styled-components'


const Img = styled.img`
    border: 3px solid black;
    border-radius: 40px;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    margin-bottom: 60px;
`

const StyledPic = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    margin: 50px auto 0px auto;
    text-align: center;
    max-height: fit-content;

    & h1 {
        padding-bottom: 20px;
    }
`

const StyledInfo = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    margin: auto auto 20px 50px;
    /* margin: auto; */
    border: 3px solid black;
    border-radius: 8px;
    background-color: white;
    padding: 30px;
    max-height: fit-content;
    width: fit-content;
`

const Button = styled.button`
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
    margin: 5px 0px 5px 5px;
    &:hover {
        background-color: #A42BF5;
        color: white;
        }
`

const StyledSightings = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid black;
    border-radius: 8px;
    background-color: white;
    width: 300px;
    margin: 60px auto auto 50px;
    padding-bottom: 20px;
`

const StyledAttendees = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    margin: 60px auto 0px auto;
    border: 3px solid black;
    border-radius: 8px;
    background-color: white;
    height: max-content;
    padding: 8px;
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
            document.title = `BugNet - ${outing.name}`
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
                <label>Invite others:
                <form onSubmit={invite}>
                    <select onChange={() => setMessage('')} name='invitee' defaultValue='default'>
                        <option disabled value='default'>---</option>
                        {users.map(user => {
                            if(!attendees.some(attendee => attendee.id === user.id) && !openInvites.some(invite => invite.invitee_id === user.id)) {
                                return <option key={user.id} value={user.id}>{user.username}</option>
                            }
                        })}
                    </select>
                    <Button as='input' type='submit' value='Send Invite'/>
                </form>
                </label>
                {message ? <p>{message}</p> : null}
            </StyledInviteOthers>
        )

        return (
            <>
            <GridContainer>
                <StyledPic>
                    <h1>{outing.name}</h1>
                    <br></br>
                    <Img src={`http://localhost:3000${outing.image}`} alt='outing pic'/>
                </StyledPic>
                <StyledInfo>
                    {edit ? <EditOutingForm outing={outing} setOuting={setOuting} setEdit={setEdit}/> :
                    <>
                        <p>Where: {outing.location}</p>
                        <p>When: {outing.date}</p>
                        <p>Description: {outing.description}</p>
                        <p> Notes: {outing.notes}</p>
                    </>}
                    {attending ? <Button onClick={() => setEdit(!edit)}>{edit ? 'Nevermind' : 'Edit Outing Info'}</Button> : null}
                </StyledInfo>
            </GridContainer>
            <GridContainer>
                <StyledAttendees>
                    <h3>Attendees:</h3>
                    {attendees.map(user => <UserCard key={user.id} user={user}/>)}
                    {attending ? inviteOthers : null}
                    {attending ? attendees.length === 1 ? <Button onClick={() => deleteOuting()}>Delete Outing</Button>: <Button onClick={() => leave()}>Leave Outing</Button> : null}
                </StyledAttendees>
                <StyledSightings>
                    <h3>Sightings:</h3>
                    {attending ? <Button onClick={() => setSightingForm(!sightingForm)}>{sightingForm? 'Nevermind' : 'Add Sighting'}</Button> : null}
                    {sightingForm ? <AddSightingForm outingID={outing.id} sightings={sightings} setSightings={setSightings} setSightingForm={setSightingForm}/> : null}
                    {sightings.map(sight => <SightingCard attending={attending} key={sight.id} sighting={sight} sightings={sightings} setSightings={setSightings}/>)}
                </StyledSightings>
            </GridContainer>
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