import {useSelector} from 'react-redux'
import BugCard from './BugCard'

function TrackedBugs() {
    const animals = useSelector(state => state.animals)

    return (
        <>
            <h2>All of the Bugs in our System:</h2>
            {animals.map(bug => <BugCard key={bug.id} bug={bug}/>)}
        </>
    )
}

export default TrackedBugs