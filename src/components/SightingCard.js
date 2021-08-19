import {useState} from 'react'
import EditSightingForm from './EditSightingForm'

function SightingCard({sighting, sightings, setSightings}) {
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
                    <button onClick={() => setExpandFurther(!expandFurther)}> {expandFurther ? 'Hide Details' : 'Show Details'} </button>
                    {expandFurther ? <>
                        <p><em>{sighting.animal.scientific_name}</em></p>
                        <p>{sighting.animal.description}</p>
                    </> : null}
                    <p>Environment: {sighting.environment}</p>
                    <p>Weather Conditions: {sighting.weather_conditions}</p>
                    <p>Notes: {sighting.notes}</p>
                    <button onClick={() => setEdit(!edit)}>Edit Sighting</button>
                </>}
            </>
        )
    }

    return (
        <div>
            <h5 onClick={() => setExpand(!expand)}>{sighting.animal.common_name}</h5>
            {/* .common_name */}
            {expand ? showDetails() : null}
        </div>
    )
}

export default SightingCard