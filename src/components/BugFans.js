import {useSelector} from 'react-redux'
import UserCard from "./UserCard"
import styled from 'styled-components'

const BugFansContainer = styled.div`
    text-align: center;
`
const BugFanList = styled.div`
    text-align: center;
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
                    }
                })}
            </BugFanList>
        </BugFansContainer>
    )
}

export default BugFans