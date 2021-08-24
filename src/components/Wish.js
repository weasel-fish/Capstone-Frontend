import {useDispatch} from 'react-redux'
import BugCard from './BugCard'
import styled from 'styled-components'

const StyledRemove = styled.button`
    padding: 6px;
    font-size: 18px;
    font-weight: 500;
    background-color: #8C69B8;
    border: none;
    border-radius: 3px;
    color: rgba(186, 235, 161, 92);
    margin: 5px 0px 5px 0px;
    cursor: pointer;
    &:hover {
        background-color: #A42BF5;
        color: white;
        }
`

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
            {home ? <StyledRemove onClick={() => handleClick()}>Remove from Wishlist</StyledRemove> : null}
        </>
    )
}

export default Wish