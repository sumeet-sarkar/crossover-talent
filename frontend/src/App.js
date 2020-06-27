import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Route } from 'react-router-dom'

import LandingPage from './containers/auth/landingPage/LandingPage';
import SignUp from './containers/auth/signUp/SignUp';
import JobSeeker from './containers/jobSeeker/JobSeeker';

class App extends Component {

    state = {
        bearerToken: ""
    };

    bearerTokenHandler = (event) => {
        const value = event.target.value
        this.setState({ bearerToken: value })
    }

    render() {
        return (
          <BrowserRouter>
              <div className="App">
                <Route path="/" exact component={LandingPage}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/employee" exact component={JobSeeker}/>
                <Route path="/employer" exact render={() => <h2>Welcome Employer</h2>}/>
              </div>
          </BrowserRouter>
        );
    }
}

export default App;