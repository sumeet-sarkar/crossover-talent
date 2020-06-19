import React, { Component } from 'react';
import './Signup.css';

class Signup extends Component {

    buttons = (value) => {
        return (
                <button>SignUp as {value}</button>
        )
    }

    header = () => {
        return (
            <div className="Signup">
                <div className="signup_buttons">{this.buttons("job seeker")}</div>
                <div className="signup_buttons">{this.buttons("employer")}</div>
            </div>
        );
    };

    render() {
      return (
        this.header()
      );
    }
  }
  
export default Signup;