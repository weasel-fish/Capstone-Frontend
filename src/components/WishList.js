import {useSelector} from 'react-redux'

function WishList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username
    
    return (
        <>
            <h3>{home ? 'Your Wishlist: ': `${user.username}'s Wishlist:`}</h3>
        </>
    )
}

export default WishList