import {useEffect, useState} from 'react'
import BugCard from './BugCard'

function SightingStats() {
    const [loading, setLoading] = useState(true)
    const [topSight, setTopSight] = useState([])
    const [topWish, setTopWish] = useState([])

    useEffect(() => {
        fetch('/stats')
        .then(resp => resp.json())
        .then(data => {
            setTopWish(data.wishes)
            setTopSight(data.sightings)
            setLoading(false)
        })
    }, [])

    return (
        <>
            <h3>Most Wished for Bugs:</h3>
            {loading ? <p>Loading...</p> : topWish.map(bug => <BugCard key={bug.id} bug={bug}/>)}
            <h3>Most Sighted Bugs:</h3>
            {loading ? <p>Loading...</p>: topSight.map(bug => <BugCard key={bug.id} bug={bug}/>)}
        </>
    )
}

export default SightingStats