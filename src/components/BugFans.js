import {useSelector} from 'react-redux'
import UserCard from "./UserCard"
import styled from 'styled-components'

const BugFansContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 20px auto 20px auto;

`
const BugFanList = styled.div`
    /* text-align: center; */
    display: flex;
    margin: auto;
    flex-wrap: wrap;
    width: 70%;
    justify-content: space-evenly;
    /* align-items: center; */
    height: 75%;
`

function BugFans() {
    const users = useSelector(state => state.users)
    const currentUser = useSelector(state => state.currentUser)

    return (
        <BugFansContainer>
            <h1>Bug Fans Like You!</h1>
            <BugFanList>
                {users.map(user => {
                    if(user.username !== currentUser.username) {
                        return <UserCard key={user.id} user={user} />
                    } else {
                        return null
                    }
                })}
            </BugFanList>
        </BugFansContainer>
    )
}

export default BugFans