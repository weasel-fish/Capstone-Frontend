import { NavLink, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

function NavBar() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleLogout(){
        fetch('logout', {method: 'DELETE'})
        .then(() => {
            history.push('/')
            dispatch({type: 'currentUser/set', payload: ''})
        })
    }

    function loggedInNavLinks() {
        return (
            <>
                <NavLink to='/user-home'>Welcome, {currentUser.username}</NavLink>
                <NavLink to='/bug-fans'>Bug Fans</NavLink>
                <NavLink to='/sighting-state'>Sighting Stats</NavLink>
                <NavLink to='/tracked-bugs'>Tracked Bugs</NavLink>
                <button onClick={() => handleLogout()}>Logout</button>
            </>
        )
    }

    return (
        <>
            <h1>BugNet</h1>
            {currentUser ? loggedInNavLinks() : <NavLink to='/login'>Login/Signup</NavLink>}
        </>
    )
}

export default NavBar