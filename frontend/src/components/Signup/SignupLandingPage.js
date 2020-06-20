import React from 'react';
import { NavLink } from 'react-router-dom'

import './SignupLandingPage.css';

const signupLandingPage = props => {
        return (
            <div className="Signup">
                <h2>The most simple and eficient job on the internet</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <h2>
                    Sign up as
                </h2>
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