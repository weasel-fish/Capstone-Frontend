import { NavLink } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

function NavBar() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    function handleLogout(){
        fetch('logout', {method: 'DELETE'})
        .then(dispatch({type: 'currentUser/set', payload: ''}))
    }

    return (
        <>
            <h1>BugNet</h1>
            {currentUser ? `Welcome, ${currentUser.username}` : null}
            {currentUser ? <button onClick={() => handleLogout()}>Logout</button> : <NavLink to='/login'>Login/Signup</NavLink>}
        </>
    )
}

export default NavBar