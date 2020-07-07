import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Route } from 'react-router-dom'

import LandingPage from './containers/auth/landingPage/LandingPage';
import SignUp from './containers/auth/signUp/SignUp';
import JobSeeker from './containers/jobSeeker/JobSeeker';
import JobSeekerApplications from './containers/jobSeeker/JobSeekerApplications'
import Employer from './containers/employer/Employer'

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
                <Route path="/employee/my-applications" exact component={JobSeekerApplications}/>
                <Route path="/employer" exact component={Employer}/>
              </div>
          </BrowserRouter>
        );
    }
}

export default App;