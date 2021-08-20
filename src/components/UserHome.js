import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import WishList from './WishList'
import OutingsList from './OutingsList'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'
import Invitation from './Invitation'
import Alert from './Alert'
import styled from 'styled-components'

const Head = styled.div`
    text-align: center;
    margin-bottom: 20px;
`

const StyledAlerts = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    text-align: center;
    & button {
            /* margin: 40px; */
            padding: 6px;
            font-size: 18px;
            font-weight: 500;
            background-color: #8C69B8;
            border: none;
            border-radius: 3px;
            color: rgba(186, 235, 161, 92);
            cursor: pointer;
            margin: 5px 0px 5px 0px;
        }
`
const StyledInvites = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    text-align: center;
    & button {
            /* margin: 40px; */
            padding: 6px;
            font-size: 18px;
            font-weight: 500;
            background-color: #8C69B8;
            border: none;
            border-radius: 3px;
            color: rgba(186, 235, 161, 92);
            cursor: pointer;
            margin: 5px 5px 5px 5px;
        }
`


const GridParent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    justify-items: center;
    width: 70%;
    margin: 30px auto 30px auto;
`
const LeftColumn = styled.div`
    grid-area: 1 / 1 / 2 / 2;
`
const RightColumn = styled.div`
    grid-area: 1 / 2 / 2 / 3;
`

const NoNews = styled.p`
    background-color: white;
    border: 2px solid black;
    border-radius: 4px;
    text-align: center;
    width: 120px;
    padding: 5px;
    margin: 5px;
`

function UserHome() {
    const [showInvites, setShowInvites] = useState(false)
    const [showAlerts, setShowAlerts] = useState(false)
    const [invites, setInvites] = useState([])
    const currentUser = useSelector(state => state.currentUser)
    const [alerts, setAlerts] = useState(currentUser.alerts)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`/outing_invites/${currentUser.id}`)
        .then(resp => resp.json())
        .then(invites => setInvites(invites))
    }, [])


    function renderInvites() {
        if(invites.length > 0) {
            return <>{invites.map(invite => <Invitation key={invite.id} invite={invite} acceptInvite={acceptInvite} rejectInvite={rejectInvite}/>)}</>
        } else {
            return <NoNews>You have no invites!</NoNews>
        }
    }

    function renderAlerts() {
        if(alerts.length > 0) {
            return <>{alerts.map(alert => <Alert key={alert.id} alert={alert} alerts={alerts} setAlerts={setAlerts} setShowAlerts={setShowAlerts}/>)}</>
        } else {
            return <NoNews>You have no alerts!</NoNews>
        }
    }


    async function acceptInvite(invite) {
        console.log(invite)
        let resp = await fetch('/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                outing_invite_id: invite.id,
                user_id: currentUser.id,
                outing_id: invite.outing.id
            })
        })

        if(resp.ok){
            resp.json().then(attendance => {
                dispatch({type: 'currentUser/addOuting', payload: attendance.outing})
                let newInvites = invites.filter(inv => inv.id !== invite.id)
                setInvites(newInvites)
            })
        } else {
            resp.json().then(console.log)
        }
    }

    async function rejectInvite(invite) {
        let resp = await fetch(`/outing_invites/${invite.id}`, {method: 'DELETE'})

        if(resp.ok) {
            let newInvites = invites.filter(inv => inv.id !== invite.id)
            setInvites(newInvites)
        } else {
            console.log('something went wrong')
        }
    }

    return (
        <>
            <Head>
                <h1>Your Home Page</h1>
                <img src={`http://localhost:3000${currentUser.avatar}`} alt='user pic'/>
                <p>{currentUser.username}</p>
            </Head>
            <GridParent>
                <StyledAlerts>
                    <button onClick={() => setShowAlerts(!showAlerts)}> {showAlerts ? 'Hide Alerts' : `Show Alerts (${alerts.length})`}</button>
                    {showAlerts ? renderAlerts() : null}
                </StyledAlerts>
                <StyledInvites>
                    <button onClick={() => setShowInvites(!showInvites)}> {showInvites ? 'Hide Invites' : `Show Invites (${invites.length})`}</button>
                    {showInvites ? renderInvites() : null}
                </StyledInvites>
            </GridParent>
            <GridParent>
                <LeftColumn>
                    <WishList user={currentUser} />
                </LeftColumn>
                <RightColumn>
                    <OutingsList user={currentUser} />
                    <FollowersList user={currentUser} followers={currentUser.followers}/>
                    <FollowingList user={currentUser} />
                </RightColumn>
            </GridParent>
        </>
    )
}

export default UserHome