import '../App.css';
import LoginSignupPage from './LoginSignupPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import SplashPage from './SplashPage'
import UserHome from './UserHome';
import UserPage from './UserPage';
import BugFans from './BugFans'
import SightingStats from './SightingStats'
import TrackedBugs from './TrackedBugs'

function App() {

  const dispatch = useDispatch()
  const animals = useSelector(state => state.animals)
  
  useEffect(() => {
    fetch('/me')
    .then(resp => {
      if(resp.status === 200) {
        resp.json()
        .then(user => {
          dispatch({type: 'currentUser/set', payload: user})
            fetch('/animals')
            .then(resp => resp.json())
            .then(animals => dispatch({type: 'animals/set', payload: animals}))
        })
      }
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
      </Switch>
      
    </div>
  );
}

export default App;
