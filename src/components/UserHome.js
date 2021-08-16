import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import WishList from './WishList'
import OutingsList from './OutingsList'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'
import Invitation from './Invitation'
import Alert from './Alert'

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
            return <p>You have no invites!</p>
        }
    }

    function renderAlerts() {
        if(alerts.length > 0) {
            return <>{alerts.map(alert => <Alert key={alert.id} alert={alert} alerts={alerts} setAlerts={setAlerts} setShowAlerts={setShowAlerts}/>)}</>
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
            {/* <h1>{currentUser.username}'s Home</h1> */}
            <h1>Your Home Page</h1>
            <div>
                <button onClick={() => setShowInvites(!showInvites)}> {showInvites ? 'Hide Invites' : `Show Invites (${invites.length})`}</button>
                {showInvites ? renderInvites() : null}
            </div>
            <div>
                <button onClick={() => setShowAlerts(!showAlerts)}> {showAlerts ? 'Hide Alerts' : `Show Alerts (${alerts.length})`}</button>
                {showAlerts ? renderAlerts() : null}
            </div>
            <WishList user={currentUser} />
            <OutingsList user={currentUser} />
            <FollowersList user={currentUser} followers={currentUser.followers}/>
            <FollowingList user={currentUser} />
        </>
    )
}

export default UserHome