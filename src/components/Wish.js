import {useDispatch} from 'react-redux'
import BugCard from './BugCard'

function Wish({wish, home}) {
    const dispatch = useDispatch()

    async function handleClick(){
        let resp = await fetch(`/wish_list_animals/${wish.id}`, {method: 'DELETE'})

        if (resp.ok) {
            dispatch({type: 'currentUser/removeWish', payload: wish.id})
        } else {
            console.log('something went wrong')
        }
    }
    return (
        <>
            <BugCard bug={wish.animal}/>
            {home ? <button onClick={() => handleClick()}>Remove from Wishlist</button> : null}
        </>
    )
}

export default Wish