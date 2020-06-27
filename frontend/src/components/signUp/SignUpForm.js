import React from 'react';

import './SignUpForm.css';

const signUpForm = props => {
        return (
            <div className = "signup_form">
                <form >
                    <label>
                        First Name:
                        <input 
                            type="text" 
                            size="18"
                            name="first_name"
                            onChange={props.changed} />
                    </label>
                    <label>
                        Last Name:
                        <input 
                            type="text" 
                            size="18"
                            name="last_name"
                            onChange={props.changed} />

                    </label>
                    <label>
                        Email:
                        <input 
                            type="text" 
                            size="18"
                            name="email"
                            onChange={props.changed} />

                    </label>
                    <label>
                        Password:
                        <input 
                            type="text" 
                            size="18"
                            name="password"
                            onChange={props.changed} />

                    </label>
                </form>
                <button
                    type="button"
                    onClick={props.signUp}>
                    Signup
                </button>
            </div>
        );
};

export default signUpForm;