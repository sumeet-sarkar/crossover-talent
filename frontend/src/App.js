import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Route } from 'react-router-dom'

import Login from './containers/auth/login/Login';
import SignUp from './containers/auth/SignUp/SignUp';
import JobSeeker from './containers/JobSeeker/JobSeeker';
import SignupLandingPage from './components/Signup/SignupLandingPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Login}/>
          <Route path="/" exact component={SignupLandingPage}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/jobseeker" exact component={JobSeeker}/>
          <Route path="/employer" exact render={() => <h2>Welcome Employer</h2>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
