import { useState } from "react"
import styled from 'styled-components'

const StyledCard = styled.div`
    background-color: white;
    border: 2px solid black;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    width: 200px;
    padding: 3px;
    margin: 5px 0px 5px 0px;
`

function BugCard({bug}) {
    const [expand, setExpand] = useState(false)

    function showDetails() {
        return (
            <>
                <em>{bug.scientific_name}</em>
                <p>{bug.description}</p>
            </>
        )
    }
    return (
        <StyledCard onClick={() => setExpand(!expand)}>
            <p><b>{bug.common_name}</b></p>
            {expand ? showDetails() : null}
        </StyledCard>
    )
}

export default BugCard