import {useEffect, useState} from 'react'
import TopBugCard from './TopBugCard'

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

    console.log(topWish)
    console.log(topSight)

    return (
        <>
            <h3>Most Wished for Bugs:</h3>
            {loading ? <p>Loading...</p> : topWish.map(bug => <TopBugCard key={bug.animal.id} bug={bug.animal} val={bug.val} type={'wishes'}/>)}
            <h3>Most Sighted Bugs:</h3>
            {loading ? <p>Loading...</p>: topSight.map(bug => <TopBugCard key={bug.animal.id} bug={bug.animal} val={bug.val} type={bug.val > 1 ? 'sightings' : 'sighting'}/>)}
        </>
    )
}

export default SightingStats