import React, { Component } from 'react';
import axios from 'axios';

import './SignUp.css';
import SignUpForm from '../../../components/signUp/SignUpForm.js'

class SignUp extends Component {

    state = {
        details: {
            first_name: "abc",
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

    inputHandler = (event) => {
        let value = event.target.value
        let name = event.target.name
        this.setState({ [name]: value})
        
        const details = {
            ...this.state.details
        }
        details[name] = value
        this.setState({ details: details})
    }

    render() {
        console.log(this.state.details)
        return(
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
                </div>
                <SignUpForm
                    changed = {event => this.inputHandler(event)}
                    signUp = {event => this.sendForm(event)} />
            </>

        )
    }
}

export default SignUp