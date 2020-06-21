import React from 'react';
import { NavLink } from 'react-router-dom';

import employeeIcon from '../../images/employee.png';
import employerIcon from '../../images/employer.png';

import './SignupLandingPage.css';

const signupLandingPage = props => {
        return (
            <div className="Signup">
                <h2>The most simple and efficient job portal on the internet</h2>
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
                        to="/jobseeker">
                            Job seeker
                    </NavLink>
                    <img src={employeeIcon} alt="find jobs" width={iconsSize.width} height={iconsSize.height}/>
                </div>
                <div className="signup_buttons">
                    <img src={employerIcon} alt="start hiring" width={iconsSize.width} height={iconsSize.height}/>
                    <NavLink
                        className="link_style"
                        to="/signup">
                            Employer
                    </NavLink>
                </div>
            </div>
        );
};

const iconsSize = {
    height: "55px",
    width: "55px",
};

export default signupLandingPage;