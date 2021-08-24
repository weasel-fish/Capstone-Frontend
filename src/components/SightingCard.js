import {useState} from 'react'
import EditSightingForm from './EditSightingForm'
import styled from 'styled-components'

const StyledCard = styled.div`
    background-color: white;
    border: 2px solid black;
    border-radius: 4px;
    text-align: center;
    width: 200px;
    padding: 5px;
    margin: 5px;
`

const Name = styled.h5`
    cursor: pointer;
`

function SightingCard({sighting, sightings, setSightings, attending}) {
    const [expand, setExpand] = useState(false)
    const [expandFurther, setExpandFurther] = useState(false)
    const [edit, setEdit] = useState(false)

    function showDetails() {
        return (
            <>
                {edit ? <EditSightingForm sighting={sighting} sightings={sightings} setSightings={setSightings} setEdit={setEdit}/>
                :
                <>  
                    <img src={`http://localhost:3000${sighting.image}`} alt='bug pic'/>
                    <br></br>
                    <button onClick={() => setExpandFurther(!expandFurther)}> {expandFurther ? 'Hide Details' : 'Show Details'} </button>
                    {expandFurther ? <>
                        <p><em>{sighting.animal.scientific_name}</em></p>
                        <p>{sighting.animal.description}</p>
                    </> : null}
                    <p>Environment: {sighting.environment}</p>
                    <p>Weather Conditions: {sighting.weather_conditions}</p>
                    <p>Notes: {sighting.notes}</p>
                    {attending ? <button onClick={() => setEdit(!edit)}>Edit Sighting</button> : null}
                </>}
            </>
        )
    }

    return (
        <StyledCard >
            <Name onClick={() => setExpand(!expand)}>{sighting.animal.common_name}</Name>
            {/* .common_name */}
            {expand ? showDetails() : null}
        </StyledCard>
    )
}

export default SightingCard