import {useSelector} from 'react-redux'
import {useState} from 'react'
import NewWishForm from './NewWishForm'
import Wish from './Wish'
import styled from 'styled-components'

const WishContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #D2C1F5;
    border: 3px solid black;
    border-radius: 8px;
    padding: 10px;
    /* width: 100%; */
`

const FormButton = styled.button`
    padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        margin-top: 20px;
`

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
        <WishContainer>
            <h3>{home ? 'Your Wishlist: ': `${user.username}'s Wishlist:`}</h3>
            {wishes.length > 0 ? wishes.map(wish => <Wish key={wish.id} wish={wish} home={home}/>) : <li>Wishlist Empty</li>}
            {home ? 
            <>
                <FormButton onClick={() => setDisplayForm(!displayForm)}>{displayForm ? 'Cancel' : 'Add a Bug to your Wishlist'}</FormButton>
                {displayForm ? <NewWishForm setDisplayForm={setDisplayForm}/> : null} 
            </>
            : null }
        </WishContainer>
    )
}

export default WishList