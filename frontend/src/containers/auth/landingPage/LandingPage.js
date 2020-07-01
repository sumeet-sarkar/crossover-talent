import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';

import LoginForm from '../../../components/loginForm/LoginForm.js';
import SignUpLandingPage from '../../../components/signUp/SignUpLandingPage';
import './LandingPage.css';

class LandingPage extends Component {

    state = {
        email: "", 
        password: "",
        bearerToken: "",
        user: ""
    };

    loginHandler = () => {
        let status = this.credsValidator()
        let bearerToken = ""
        let user = ""
        const headers = {
            'Content-Type': 'application/json'
        }
        const creds = {email: this.state.email,
                    password: this.state.password}
        if (status === true){
            axios.post('http://localhost:8080/login', creds, {headers: headers})
                .then(response => {
                    bearerToken = response.data.token
                    user = response.data.user
                    this.setState({ 
                            bearerToken: bearerToken,
                            user: user
                        })
                })
                .catch(error => {
                    alert(error)
                })
        }
    }

    credsValidator = () => {
        if (this.state.email == null || this.state.email === "" || this.state.password == null || this.state.password === ""){
            alert("empty creds not allowed")
            return false
        }
        let statusEmail = true
        let statusPassword = true
    
        //2 backslashes("\") are present to avoid warning of Unnecessary escape character: \;  no-useless-escape
        let specialChars = "*|,\":<>[]{}`\\';()&$#%";
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

        if(this.state.bearerToken){
            return <Redirect to={{
                pathname: "/employee",
                bearerToken: this.state.bearerToken,
                user: this.state.user
            }} />   
        }

        return (
            <>
                <div className="landing_page_header">
                    <div className="landing_page_header_logo">
                        {/* <img 
                            src={logo} 
                            alt="logo" 
                            width="50px" 
                            height="50px"/> */}
                        <h3>Crossover Talent</h3>
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

export default LandingPage;