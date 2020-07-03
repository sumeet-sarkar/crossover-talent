import React, { Component } from 'react';
import axios from 'axios';

import JobSeekerApplicationsJSX from '../../components/jobSeeker/JobSeekerApplications' 

class JobSeekerApplications extends Component {
    state = {
        applications: []
    }

    componentDidMount = () => {
        const headers = {
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.location.bearerToken}`
        }

        let url = "http://localhost:8080/employee/my-applications?myApplications="

        url = url + this.props.location.user.applications.map(application => {return(application)}) + ","
        url = url.slice(0,-1)

        axios.get(url, {headers: headers})
            .then(response => {
                return response.data
            })
            .then(result => {
                let applications = []
                result.forEach(res => {
                    applications.push(res)
                })
                this.setState({applications:applications})
            })
            .catch(error => {
                alert(error)
            })
    }
    
    render(){
        return (
            <>
                {this.state.applications.map((application) => {
                    return (
                        <JobSeekerApplicationsJSX
                            company = {application.company}
                            title = {application.title}
                            description = {application.description}
                            city = {application.city}
                            category = {application.category}
                            salary = {application.salary}
                            currency = {application.currency}
                            currencySymbol = {application.currencySymbol}/>
                    )
                })}
            </>
        )
    }
}

export default JobSeekerApplications