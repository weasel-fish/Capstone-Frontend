import {useSelector} from 'react-redux'
import WishList from './WishList'
import OutingsList from './OutingsList'
import FollowingList from './FollowingList'
import FollowersList from './FollowersList'

function UserHome() {

    const currentUser = useSelector(state => state.currentUser)

    return (
        <>
            <h1>{currentUser.username}'s Home</h1>
            <WishList user={currentUser} />
            <OutingsList user={currentUser} />
            <FollowersList user={currentUser} />
            <FollowingList user={currentUser} />
        </>
    )
}

export default UserHome