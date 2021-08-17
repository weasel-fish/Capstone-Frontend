import {useSelector} from 'react-redux'
import {useState} from 'react'
import NewWishForm from './NewWishForm'
import Wish from './Wish'

function WishList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username
    const [displayForm, setDisplayForm] = useState(false)
    
    let wishes = []

    if(home){
        wishes = currentUser.wishes
    } else {
        wishes = user.wishes
    }
    return (
        <>
            <h3>{home ? 'Your Wishlist: ': `${user.username}'s Wishlist:`}</h3>
            {wishes.length > 0 ? wishes.map(wish => <Wish key={wish.id} wish={wish} home={home}/>) : <li>Wishlist Empty</li>}
            {home ? 
            <>
                <button onClick={() => setDisplayForm(!displayForm)}>{displayForm ? 'Cancel' : 'Add a Bug to your Wishlist'}</button>
                {displayForm ? <NewWishForm setDisplayForm={setDisplayForm}/> : null} 
            </>
            : null }
        </>
    )
}

export default WishList