import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import './Signup.css';

class Signup extends Component {

  render() {
    return (
      <div className="Signup">
          <div className="signup_buttons">
            <NavLink
              className="link_style"
              //hash= "#submit"
              //search= '?quick-submit=true'
              to="/jobseeker"
            >Job seeker</NavLink>
          </div>
          <div className="signup_buttons">
            <NavLink
              className="link_style"
              to="/signup"
            >Employer</NavLink>
          </div>
      </div>
    );
  }
}
  
export default Signup;

/*
import React, { Component } from 'react';
import { Route, NavLink, Link } from 'react-router-dom'
import Header from '../Header/Header.js'
import SignupForm from '../SignupForm/SignupForm.js'

import './Signup.css';

class Signup extends Component {

  render() {
    return (
      <div className="Signup">
        <h2>The most simple and efficient job portal on the internet! </h2>
        <h4>Some random text here that goes along with the headline and make sure to keep it short! In about these many words! Text should be visually good and it should have a good and short read</h4>
        <h2>Tells us about you, are you a </h2>
          <div className="signupbuttons2">
            <NavLink
              className="link_style"
              hash= "#submit"
              search= '?quick-submit=true'
              to="/jobseeker"
            >Job seeker</NavLink>
          </div>
          <div className="signupbuttons2">
            <NavLink
              className="link_style"
              hash= "#submit"
              search= '?quick-submit=true'
              to="/employer"
            >Employee</NavLink>
          </div>
          <Route path="/jobseeker" exact component={Header}/>
          <Route path="/employer" exact component={SignupForm}/>
      </div>
    );
  }
}
  
export default Signup;
*/