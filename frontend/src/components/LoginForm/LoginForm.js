import React from 'react';

import './LoginForm.css';


const loginForm = props => {
        return (
            <div className="login_container">
                <div className="login_username">
                    <p>Email or phone</p>
                    <input type="text" size="18" name="email" onChange={props.changed} value={props.email}/>
                </div>
                <div className="login_password">
                    <p>Password</p>
                    <input type="text" size="18" name="password" onChange={props.changed} value={props.password}/>
                </div>
                <button
                    type="button" onClick={props.login}>
                    Login
                </button>
                <div className="forgotten_password">
                    <p>Forgotten Pasword?</p>
                </div>
            </div>
        );
};

export default loginForm;