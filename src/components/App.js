import '../App.css';
import LoginSignupPage from './LoginSignupPage'
import { Switch, Route } from 'react-router-dom'
import NavBar from './NavBar';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux'

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


  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <p>Home</p>
        </Route>
        <Route exact path='/login'>
          <LoginSignupPage />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
