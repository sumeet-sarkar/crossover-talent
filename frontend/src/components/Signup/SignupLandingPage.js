import React from 'react';
import { NavLink } from 'react-router-dom'

import './Signup.css';

const signupLandingPage = props => {
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
};

export default signupLandingPage;