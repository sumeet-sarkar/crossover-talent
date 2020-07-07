import React, { Component } from 'react';

import EmployerJobForm from '../../components/employer/EmployerJobForm.js'

class EmployerJobFormHandler extends Component{

    state = {
        edit: this.props.edit,
        showForm: this.props.showForm,
        job: {
            title:this.props.title,
            city:this.props.city,
            minSalary:this.props.minSalary,
            maxSalary:this.props.maxSalary,
            description:this.props.description
        }
    }

    showForm = () => {
        this.setState({ showForm: true })
    }

    editForm = () => {
        this.props.editJob(this.state.job)
    }

    inputHandler = (event) => {
        let value = event.target.value

        if(event.target.type === "number"){
            value = parseInt(event.target.value)
        }
        
        const name = event.target.name
        
        let job = {
            ...this.state.job
        }

        job[name] = value
        this.setState({ job:job })
    }

    submitForm = (event) => {
        console.log(this.state)
    }

    actionButton = (event) => {
        if (this.state.edit === true){
            this.editForm()
        }
        else {
            this.submitForm()
        }
    }

    render() {

        let action;

        if(this.state.edit){
            action = "Save Changes"
        }
        else{
            action = "Post"
        }

        return(
            <>
                {this.state.showForm ? null :
                <button onClick={this.showForm}>New Job</button>}

                {this.state.showForm ?
                    <EmployerJobForm
                        title = {this.state.job.title}
                        city = {this.state.job.city}
                        minSalary = {this.state.job.minSalary}
                        maxSalary = {this.state.job.maxSalary}
                        description = {this.state.job.description}
                        action = {action}
                        inputHandler = {event => this.inputHandler(event)}
                        actionButton = {event => this.actionButton(event)}/>
                    : null
                }
            </>
        )
    }
}

export default EmployerJobFormHandler;