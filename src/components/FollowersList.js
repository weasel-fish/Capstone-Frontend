import {useSelector} from 'react-redux'
import UserCard from './UserCard'
import styled from 'styled-components'

const FollowersContainer = styled.div`
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

function FollowersList({user, followers}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username

    return (
        <FollowersContainer>
            <h3>{home ? 'Your followers: ': `${user.username}'s followers:`}</h3>
            {followers.length > 0 ? followers.map(fol => <UserCard key={fol.id} user={fol}/>) : home ? `You don't have any followers` : `${user.username} doesn't have any followers`}
        </FollowersContainer>
    )
}

export default FollowersList