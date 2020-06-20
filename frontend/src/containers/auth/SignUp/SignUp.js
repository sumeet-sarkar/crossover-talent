import React, { Component } from 'react';
import axios from 'axios';

import logo from '../../../images/logo.png';

import './SignUp.css';
//import { Route, Link } from 'react-router-dom'

class SignupForm extends Component {

    state = {
        details: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        }
    }

    formInputValidator = () => {
        let status = true
        const details = Object.values(this.state.details);
        if(details.length<4 || details[3].length < 4)
            status = false
        details.map((detail) => {
            if(detail === null || detail === ""){
                status = false
            }
        });
        if (status===false){
            alert("something is wrong with form")
            return status
        }
        return true
    }

    sendForm = () => {
        let status = this.formInputValidator()
        if (status === true){
            const headers = {
                'Content-Type': 'application/json'
            }
            const form = {  first_name: this.state.details.first_name,
                            last_name: this.state.details.last_name,
                            email: this.state.details.email,
                            password: this.state.details.password}
            
            axios.post('http://localhost:8080/signup', form, {headers: headers})
                .then(response => {
                    this.props.history.push("/employer")
                })
                .catch(error => {
                    alert(error)
                }
                )
        }
    }

    inputHandler = (event, attribute) => {
        const details = {
            ...this.state.details
        }
        details[attribute] = event.target.value
        
        this.setState({ details: details})
    }

    render() {
        return(
            <>
            <div className="header">
                <div className="header_logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className = "SignupForm">
            <form onSubmit={this.sendForm}>
                <label>
                    first Name:
                    <input type="text" onChange={event => this.inputHandler(event, "first_name")} />
                </label>
                <label>
                    Last Name:
                    <input type="text" onChange={event => this.inputHandler(event, "last_name")} />
                </label>
                <label>
                    email:
                    <input type="text" onChange={event => this.inputHandler(event, "email")} />
                </label>
                <label>
                    Password:
                    <input type="text" onChange={event => this.inputHandler(event, "password")} />
                </label>
            </form>
            <button
                type="button"
                onClick={this.sendForm}>
                Signup
            </button>
            </div>
            </>
        )
    }
}

export default SignupForm