import {useDispatch} from 'react-redux'
import BugCard from './BugCard'

function Wish({wish}) {
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
            <button onClick={() => handleClick()}>Remove from Wishlist</button>
        </>
    )
}

export default Wish