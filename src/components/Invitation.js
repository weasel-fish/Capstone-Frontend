
function Invitation({invite, acceptInvite, rejectInvite}) {

    return(
        <li>
            <p>{invite.inviter.username} invited you to {invite.outing.name}!</p>
            <button onClick={() => acceptInvite(invite)}>Accept</button>
            <button onClick={() => rejectInvite(invite)}>Reject</button>
        </li>
    )
}

export default Invitation