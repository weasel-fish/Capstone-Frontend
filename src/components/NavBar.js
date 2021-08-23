import { NavLink, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'

const NavContainer = styled.div`
    display: flex;
    height: 60px;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #8C69B8;
`
const Logo = styled(NavLink)`
    color: rgba(186, 235, 161, 92);
    margin: 40px;
    margin-right: 50px;
    text-decoration: none;
    font-size: 35px;
    font-weight: 600;
`

const NavButton = styled(NavLink)`
    display: block;
    font-size: 18px;
    height: 25px;
    background-color: rgba(186, 235, 161, 92);
    color: #A42BF5;
    /* border: 2px solid black; */
    border-radius: 4px;
    text-decoration: none;
    margin: 20px;
    padding: 5px 8px 2px 8px;
    min-width: max-content;

    &:hover {
        background-color: #A42BF5;
        color: white;
    }
`
const LogIn = styled(NavButton)`
    margin-left: auto;

`

const Welcome = styled.p`
    font-size: 24px;
    margin-left: auto;
    color: rgba(186, 235, 161, 92);
    min-width: max-content;
`

const LogOut = styled.button`
    display: block;
    font-size: 18px;
    height: 33px;
    background-color: rgba(186, 235, 161, 92);
    color: #A42BF5;
    border-radius: 4px;
    text-decoration: none;
    margin: 10px;
    padding: 5px 8px 2px 8px;
    margin-left: auto;
    margin-right: 30px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #A42BF5;
        color: white;
    }

`

function NavBar() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleLogout(){
        fetch('/logout', {method: 'DELETE'})
        .then(() => {
            history.push('/')
            dispatch({type: 'currentUser/set', payload: ''})
        })
    }

    function loggedInNavLinks() {
        return (
            <>
                <NavButton to='/user-home'>Home</NavButton>
                <NavButton to='/bug-fans'>Bug Fans</NavButton>
                <NavButton to='/sighting-stats'>Sighting Stats</NavButton>
                <NavButton to='/tracked-bugs'>Tracked Bugs</NavButton>
                <Welcome>Welcome, {currentUser.username}</Welcome>
                <LogOut onClick={() => handleLogout()}>Logout</LogOut>
                {/* <LogInOut as='button' onClick={() => handleLogout()}>Logout</LogInOut> */}
            </>
        )
    }

    return (
        <NavContainer>
            <Logo to='/'>BugNet</Logo>
            {currentUser ? loggedInNavLinks() : <LogIn to='/login'>Login/Signup</LogIn>}
        </NavContainer>
    )
}

export default NavBar