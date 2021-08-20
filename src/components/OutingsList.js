import {useSelector} from 'react-redux'
import OutingCard from './OutingCard'
import CreateOutingForm from './CreateOutingForm'
import {useState} from 'react'
import styled from 'styled-components'

const OutingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color:#D2C1F5;
    border: 3px solid black;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
`
const FormButton = styled.button`
    padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        cursor: pointer;
`

function OutingsList({user}) {
    const currentUser = useSelector(state => state.currentUser)
    const home = currentUser.username === user.username
    const [displayForm, setDisplayForm] = useState(false)
    
    return (
        <OutingContainer>
            <h3>{home ? 'Your Outings: ': `${user.username}'s Outings:`}</h3>
            {user.outings.length > 0 ? user.outings.map(out => <OutingCard key={out.id} outing={out} />) : home ? "You don't have any outings" : `${user.username} doesn't have any outings`}
            {home ? <FormButton onClick={() => setDisplayForm(!displayForm)}>{displayForm ? 'Nevermind' : 'Create a New Outing'}</FormButton> : null}
            {displayForm ? <CreateOutingForm setDisplayForm={setDisplayForm}/> : null}
        </OutingContainer>
    )
}

export default OutingsList