import { useState } from "react"

function TopBugCard({bug, val, type}) {
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
        <>
            <p onClick={() => setExpand(!expand)}>{bug.common_name}</p>
            {expand ? showDetails() : null}
            <p>{val} {type}</p>
        </>
    )
}

export default TopBugCard