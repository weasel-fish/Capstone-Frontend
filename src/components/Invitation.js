import styled from "styled-components"
const StyledInvite = styled.div`
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    text-align: center;
    width: 200px;
    padding: 3px;
    margin: 15px 0px 5px 0px;
`

const Button = styled.button`
    align-self: center;
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    cursor: pointer;
    /* margin: 5px 5px 0px 10px; */
    &:hover {
        background-color: #A42BF5;
        color: white;
    }
`

function Invitation({invite, acceptInvite, rejectInvite}) {

    return(
        <StyledInvite>
            <p>{invite.inviter.username} invited you to {invite.outing.name}!</p>
            <Button onClick={() => acceptInvite(invite)}>Accept</Button>
            <br></br>
            <Button onClick={() => rejectInvite(invite)}>Reject</Button>
        </StyledInvite>
    )
}

export default Invitation