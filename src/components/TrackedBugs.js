import {useSelector} from 'react-redux'
import BugCard from './BugCard'
import styled from 'styled-components'

const TrackedBugContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 20px auto 20px auto;
`
const TrackedBugList = styled.div`
    text-align: center;
    margin: auto;
`

function TrackedBugs() {
    const animals = useSelector(state => state.animals)

    return (
        <TrackedBugContainer>
            <h2>All of the Bugs in our System:</h2>
            <TrackedBugList>
                {animals.map(bug => <BugCard key={bug.id} bug={bug}/>)}
            </TrackedBugList>
        </TrackedBugContainer>
    )
}

export default TrackedBugs