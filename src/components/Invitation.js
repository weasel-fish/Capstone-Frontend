import styled
 from "styled-components"
const StyledInvite = styled.div`
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    text-align: center;
    width: 200px;
    padding: 3px;
    margin: 15px 0px 5px 0px;
`

function Invitation({invite, acceptInvite, rejectInvite}) {

    return(
        <StyledInvite>
            <p>{invite.inviter.username} invited you to {invite.outing.name}!</p>
            <button onClick={() => acceptInvite(invite)}>Accept</button>
            <button onClick={() => rejectInvite(invite)}>Reject</button>
        </StyledInvite>
    )
}

export default Invitation