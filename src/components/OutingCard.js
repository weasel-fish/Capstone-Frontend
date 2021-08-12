import {useState} from 'react'
import {useHistory} from 'react-router-dom'

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
                <button onClick={() => handleOutingClick()}>Go to Outing Page</button>
            </>
        )
    }

    return (
        <>
            <p onClick={() => setExpand(!expand)}>{outing.name}</p>
            {expand ? showDetails() : null}
        </>
    )
}

export default OutingCard