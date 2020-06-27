import React from 'react';

import './LoginForm.css';


const loginForm = props => {
        return (
            <div className="login_form_container">
                <div className="login_form_username">
                    <input 
                        type="text" 
                        size="18" 
                        name="email" 
                        onChange={props.changed} 
                        value={props.email}
                        placeholder="Enter your email id"/>
                </div>
                <div className="login_form_password">
                    <input 
                        type="text" 
                        size="18" 
                        name="password" 
                        onChange={props.changed} 
                        value={props.password}
                        placeholder="Enter your password"/>
                </div>
                <button
                    type="button" onClick={props.login}>
                    Log In
                </button>
                <div className="login_form_forgotten_password">
                    <p>Forgotten Pasword?</p>
                </div>
            </div>
        );
};

export default loginForm;