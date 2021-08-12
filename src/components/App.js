import '../App.css';
import LoginSignupPage from './LoginSignupPage'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import SplashPage from './SplashPage'
import UserHome from './UserHome';
import UserPage from './UserPage';

function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch('/me')
    .then(resp => {
      if(resp.status === 200) {
        resp.json()
        .then(user => dispatch({type: 'currentUser/set', payload: user}))
      }
    })
    

  }, [dispatch])

  console.log('Re-Rendered!')

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
        <Redirect from={`/x-user-page/:id`} to={`/user-page/:id`} />
        <Route exact path='/user-page/:id'>
          <UserPage />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
