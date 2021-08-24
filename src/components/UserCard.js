import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import styled from 'styled-components'

const StyledCard = styled.div`
    background-color: white;
    border: 2px solid black;
    border-radius: 4px;
    text-align: center;
    width: 130px;
    /* min-width: max-content; */
    padding: 5px;
    margin: 5px;
    cursor: pointer;
`

function UserCard({user}) {

    const history = useHistory()
    const currentUser = useSelector(state => state.currentUser)
    const self = currentUser.id === user.id

    function handleUserClick() {
        if(self){
            history.push('/user-home')
        } else {
        history.push(`/x-user-page/${user.id}`)
        }
    }


    return (
        <StyledCard>
            {/* <img src={`http://localhost:3000${user.avatar}`} /> */}
            <div onClick={() => handleUserClick()}>{user.username}</div>
        </StyledCard>
    )
}

export default UserCard