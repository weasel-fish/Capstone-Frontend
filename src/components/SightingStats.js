import {useEffect, useState} from 'react'
import TopBugCard from './TopBugCard'
import styled from 'styled-components'

const GridParent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    justify-items: center;
    width: 70%;
    margin: 30px auto 30px auto;
`
const LeftColumn = styled.div`
    grid-area: 1 / 1 / 2 / 2;
`
const RightColumn = styled.div`
    grid-area: 1 / 2 / 2 / 3;
`
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
        <GridParent>
            <LeftColumn>
                <h2>Most Wished for Bugs:</h2>
                <br></br>
                {loading ? <p>Loading...</p> : topWish.map(bug => <TopBugCard key={bug.animal.id} bug={bug.animal} val={bug.val} type={'wishes'}/>)}
            </LeftColumn>
            <RightColumn>
                <h2>Most Sighted Bugs:</h2>
                <br></br>
                {loading ? <p>Loading...</p>: topSight.map(bug => <TopBugCard key={bug.animal.id} bug={bug.animal} val={bug.val} type={bug.val > 1 ? 'sightings' : 'sighting'}/>)}
            </RightColumn>
        </GridParent>
    )
}

export default SightingStats