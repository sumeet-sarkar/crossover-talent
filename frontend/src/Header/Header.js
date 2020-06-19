import React, { Component } from 'react';
import logo from './logo.png'
import axios from 'axios'
import './Header.css';

class Header extends Component {

      state = {
        creds: [
          { email: "", password: ""}
        ]
      };

    loginHandler = () => {
        let status = this.credsValidator()
        const headers = {
            'Content-Type': 'application/json'
        }
        const creds = {email: this.state.creds.username,
                    password: this.state.creds.password}
        if (status === true){
            console.log("correct creds")
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
        if (this.state.creds.username == null || this.state.creds.password == null){
            alert("empty creds not allowed")
            return false
        }
        let statusUsername = true
        let statusPassword = true
    
        let specialChars = "*|,\":<>[]{}`\';()&$#%";
        if(this.state.creds.username.length < 4){
            statusUsername = false
        }
        if(this.state.creds.password.length < 2){
            statusPassword = false
        }
        for (let i = 0; i < this.state.creds.username.length; i++) {
            if (specialChars.indexOf(this.state.creds.username.charAt(i)) !== -1) {
                statusUsername = false
            }
        }
        if (statusUsername === false && statusPassword === false){
            alert("Wrong Username and Password!!!");
            return false
        }
        else if (statusUsername === false){
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

    inputHandler = (event, attribute) => {
        const cred = {
            ...this.state.creds
        }
        if(attribute==="username"){
            cred.username = event.target.value;
        }
        else if(attribute==="password"){
            cred.password = event.target.value;
        }
        this.setState({ creds: cred})
    }

    render() {
        return (
            <div className="header">
                <div className="header_logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="login_container">
                    <div className="login_username">
                        <p>Email or phone</p>
                        <input type="text" size="18" onChange={event => this.inputHandler(event, "username")}/>
                    </div>
                    <div className="login_password">
                        <p>Password</p>
                        <input type="text" size="18" onChange={event => this.inputHandler(event, "password")}/>
                    </div>
                    <button
                        type="button"
                        onClick={this.loginHandler}>
                        Login
                    </button>
                    <div className="forgotten_password">
                        <p>Forgotten Pasword?</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;