import {useSelector} from 'react-redux'
import UserCard from './UserCard'
import styled from 'styled-components'

const FolloweesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #D2C1F5;
    border: 3px solid black;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
`

function FollowingList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username

    return (
        <FolloweesContainer>
            <h3>{home ? 'You are following: ': `${user.username} is following:`}</h3>
            {user.followees.length > 0 ? user.followees.map(fol => <UserCard key={fol.id} user={fol}/>) : home ? `You aren't following anyone` : `${user.username} isn't following anyone`}
        </FolloweesContainer>
    )
}

export default FollowingList