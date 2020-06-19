import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Route } from 'react-router-dom'

import Header from './Header/Header.js';
import Signup from './Signup/Signup.js';
import SignupForm from './SignupForm/SignupForm.js'
import JobSeeker from './JobSeeker/JobSeeker.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={Header}/>
          <Route path="/" exact component={Signup}/>
          <Route path="/signup" exact component={SignupForm}/>
          <Route path="/jobseeker" exact component={JobSeeker}/>
          <Route path="/employer" exact render={() => <h2>Welcome Employer</h2>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
