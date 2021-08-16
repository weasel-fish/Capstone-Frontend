import {useState} from 'react'
import EditSightingForm from './EditSightingForm'

function SightingCard({sighting, sightings, setSightings}) {
    const [expand, setExpand] = useState(false)
    const [edit, setEdit] = useState(false)

    function showDetails() {
        return (
            <>
                {edit ? <EditSightingForm sighting={sighting} sightings={sightings} setSightings={setSightings} setEdit={setEdit}/>
                :
                <>
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
            {expand ? showDetails() : null}
        </div>
    )
}

export default SightingCard