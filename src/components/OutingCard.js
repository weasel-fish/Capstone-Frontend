import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const StyledCard = styled.div`
    background-color: white;
    border: 2px solid black;
    cursor: pointer;
    text-align: center;
    width: 200px;
    padding: 3px;
    margin: 5px 0px 5px 0px;
`
const Button = styled.button`
    padding: 6px;
        font-size: 18px;
        font-weight: 500;
        background-color: #8C69B8;
        border: none;
        border-radius: 3px;
        color: rgba(186, 235, 161, 92);
        cursor: pointer;
`

function OutingCard({outing}) {
    const [expand, setExpand] = useState(false)
    const history = useHistory()

    function handleOutingClick() {
        history.push(`/x-outing-page/${outing.id}`)
    }

    function showDetails() {
        return (
            <>
                <p>{outing.location}</p>
                <p>{outing.date}</p>
                <p>{outing.description}</p>
                <p>{outing.notes}</p>
                <Button onClick={() => handleOutingClick()}>Go to Outing Page</Button>
            </>
        )
    }

    return (
        <StyledCard onClick={() => setExpand(!expand)}>
            <p>{outing.name}</p>
            {expand ? showDetails() : null}
        </StyledCard>
    )
}

export default OutingCard