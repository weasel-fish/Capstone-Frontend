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

    return (
        <>
            <h1>BugNet</h1>
            {currentUser ? <NavLink to='/user-home'>Welcome, {currentUser.username}</NavLink> : null}
            {currentUser ? <button onClick={() => handleLogout()}>Logout</button> : <NavLink to='/login'>Login/Signup</NavLink>}
        </>
    )
}

export default NavBar