import logo from '../logo.svg';
import '../App.css';
import LoginSignupPage from './LoginSignupPage'
import { Switch, Route } from 'react-router-dom'
import NavBar from './NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/login'>
          <LoginSignupPage />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
