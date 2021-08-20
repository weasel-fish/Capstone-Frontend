import '../App.css';
import LoginSignupPage from './LoginSignupPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import SplashPage from './SplashPage'
import UserHome from './UserHome';
import UserPage from './UserPage';
import BugFans from './BugFans'
import SightingStats from './SightingStats'
import TrackedBugs from './TrackedBugs'
import Outing from './Outing'
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(186, 235, 161, 92);
    /* color: rgba(158, 77, 156, 62) */
  }
`

function App() {

  const dispatch = useDispatch()
  // const animals = useSelector(state => state.animals)
  // const users = useSelector(state => state.users)
  
  useEffect(() => {
    console.log('Fetched frontload')
    fetch('/me')
    .then(resp => {
      if(resp.status === 200) {
        resp.json()
        .then(user => {
          dispatch({type: 'currentUser/set', payload: user})
        })
      }
      fetch('/frontload')
        .then(resp => resp.json())
        .then(data => {
          dispatch({type: 'users/set', payload: data.users})
          dispatch({type: 'animals/set', payload: data.animals})
        })
    })
  }, [dispatch])
  // useEffect(() => {
  //   fetch('/me')
  //   .then(resp => {
  //     if(resp.status === 200) {
  //       resp.json()
  //       .then(user => {
  //         dispatch({type: 'currentUser/set', payload: user})
  //       })
  //     }
  //   })
    

  // }, [dispatch])

  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <Switch>
         <Route exact path='/'>
          <SplashPage />
        </Route>
        <Route exact path='/login'>
          <LoginSignupPage />
        </Route>
        <Route exact path='/user-home'>
          <UserHome />
        </Route>
        <Route exact path='/bug-fans'>
          <BugFans />
        </Route>
        <Route exact path='/sighting-stats'>
          <SightingStats />
        </Route>
        <Route exact path='/tracked-bugs'>
          <TrackedBugs />
        </Route>
        <Redirect from={`/x-user-page/:id`} to={`/user-page/:id`} />
        <Route exact path='/user-page/:id'>
          <UserPage />
        </Route>
        <Redirect from={`/x-outing-page/:id`} to={`/outing-page/:id`} />
        <Route exact path='/outing-page/:id'>
          <Outing />
        </Route>

      </Switch>
      
    </div>
  );
}

export default App;
