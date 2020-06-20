import React, { Component } from 'react';
import axios from 'axios';

import LoginForm from '../../../components/loginForm/LoginForm.js';
import SignUpLandingPage from '../../../components/signup/SignupLandingPage';
import './Login.css';
import logo from '../../../images/logo.png';

class Login extends Component {

      state = {
            email: "", 
            password: ""
      };

    loginHandler = () => {
        let status = this.credsValidator()
        const headers = {
            'Content-Type': 'application/json'
        }
        const creds = {email: this.state.email,
                    password: this.state.password}
        if (status === true){
            axios.post('http://localhost:8080/login', creds, {headers: headers})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                }
            )
        }
    }

    credsValidator = () => {
        if (this.state.email == null || this.state.email === "" || this.state.password == null || this.state.password === ""){
            alert("empty creds not allowed")
            return false
        }
        let statusEmail = true
        let statusPassword = true
    
        let specialChars = "*|,\":<>[]{}`\';()&$#%";
        if(this.state.email.length < 4){
            statusEmail = false
        }
        if(this.state.password.length < 2){
            statusPassword = false
        }
        for (let i = 0; i < this.state.email.length; i++) {
            if (specialChars.indexOf(this.state.email.charAt(i)) !== -1) {
                statusEmail = false
            }
        }
        if (statusEmail === false && statusPassword === false){
            alert("Wrong Username and Password!!!");
            return false
        }
        else if (statusEmail === false){
            alert("Wrong Username!!!");
            return false
        }
        else if (statusPassword === false){
            alert("Wrong Password")
        }
        else {
            return true
        }
    }

    inputHandler = (event) => {
        let value = event.target.value
        let name = event.target.name
        this.setState({ [name]: value})
    }

    render() {
        return (
            <>
                <div className="header">
                    <div className="header_logo">
                        <img 
                            src={logo} 
                            alt="logo" 
                            width="50px" 
                            height="50px"/>
                    </div>
                    <LoginForm 
                        changed = {event => this.inputHandler(event)}
                        login = {event => this.loginHandler(event)}/>
                </div>
                <SignUpLandingPage />
            </>
        );
    }
}

export default Login;