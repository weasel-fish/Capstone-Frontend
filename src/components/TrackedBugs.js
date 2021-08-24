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
    /* text-align: center; */
    display: flex;
    margin: auto;
    flex-wrap: wrap;
    width: 70%;
    justify-content: space-between;
    align-items: center;
    height: 75%;
`

function TrackedBugs() {
    const animals = useSelector(state => state.animals)
    const animalList = animals.sort((a, b) => a.common_name.localeCompare(b.common_name))

    return (
        <TrackedBugContainer>
            <h2>All of the Bugs in our System:</h2>
            <TrackedBugList>
                {animalList.map(bug => <BugCard key={bug.id} bug={bug}/>)}
            </TrackedBugList>
        </TrackedBugContainer>
    )
}

export default TrackedBugs