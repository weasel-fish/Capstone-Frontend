import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <>
            <h1>BugNet</h1>
            <NavLink to='/login'>Login/Signup</NavLink>
        </>
    )
}

export default NavBar