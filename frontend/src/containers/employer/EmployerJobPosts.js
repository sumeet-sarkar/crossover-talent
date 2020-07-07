import React, { Component } from 'react'
import { withRouter } from "react-router";
import axios from 'axios';

import EmployerJobPost from '../../components/employer/EmployerJobPost.js'
import EmployerJobFormHandler from './EmployerJobForm.js'
import './EmployerJobPosts.css'

class EmployerJobPosts extends Component {

    state = {
        modal: {
            show: false,
            index: ""
        },
        
        jobs: [
            {
                title: "Floor Manager",
                company: "Facebook",
                city: "Bengaluru",
                minSalary: 40000,
                maxSalary: 50000,
                status: "Open",
                description: "description1"
            },
            {
                title: "Floor Manager2",
                company: "Facebook2",
                city: "Bengaluru2",
                minSalary: 400002,
                maxSalary: 500002,
                status: "Open2",
                description: "description2"
            }
        ]
        
       //jobs: []
    }

    viewJobPost = (e, index) => {
        const modal = {
            ...this.state.modal
        }

        modal.show = true;
        modal.index = index;

        this.setState({ modal: modal })
    }

    editJobPost = (event,index) => {
        const jobs = [
            ...this.state.jobs
        ]

        jobs[index] = event

        this.setState({ jobs:jobs })
    }

    deleteJobPost = (e, index) => {
        const jobs = [
            ...this.state.jobs
        ]

        const headers = {
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.bearerToken}`
        }

        const data = {
            "jobId": jobs[index]._id,
            "userId": this.props.userId
        }

        axios.put('http://localhost:8080/employer/delete-job', data, {headers})
            .then(response => {
                alert("Job Deleted Successfully")
                jobs.splice(index, 1)
                this.setState({ jobs:jobs })
            })
            .catch(error => {
                alert(error)
            })
    }

    viewJobApplications = (e, index) => {
        // for the child components to not trigger the action on parent
        // in this case, clicking on a job post should direct to applications
        // but clicking on view/edit/delete buttons should perform respective actions rather than redirecting to another page
        if(!e.target.id.match(/JobPost/))
            this.props.history.push(`/employer/jobId/${index}`)
    }

    changeStatus = (e,index) => {
        const jobs = [
            ...this.state.jobs
        ]

        const status = jobs[index].status
        if(status === "open")
            jobs[index].status = "close"
        else if (status === "close")
            jobs[index].status = "draft"
        else if (status === "draft")
            jobs[index].status = "open"

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.bearerToken}`
        }

        const data = {
            "jobId": jobs[index]._id,
            "userId": this.props.userId,
            "status": jobs[index].status
        }

        axios.put('http://localhost:8080/employer/change-job-status', data, {headers})
            .then(response => {
                alert("Status Changed Successfully")
                this.setState({ jobs:jobs })
            })
            .catch(error => {
                alert(error)
            })
    }

    componentDidMount = () => {
        /*const headers = {
			'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.bearerToken}`
		}

        axios.get('http://localhost:8080/employer/home', {headers: headers})
            .then(response => {
                let jobs = []
                jobs = response.data.jobs
                this.setState({ jobs:jobs})
            })
            .catch(error => {
                alert(error)
            })
            */
    }

    render() {

        return(
            <div className="employer_job_posts">
                {this.state.jobs.map((job,index) => {
                    return(
                        <>
                            <EmployerJobPost
                                title = {job.title}
                                city = {job.city}
                                minSalary = {job.minSalary}
                                maxSalary = {job.maxSalary}
                                status = {job.status}
                                viewJobApplications = {event => this.viewJobApplications(event, index)}
                                viewJobPost = {event => this.viewJobPost(event, index)}
                                changeStatus = {event => this.changeStatus(event, index)}
                                deleteJobPost = {event => this.deleteJobPost(event, index)}/>
                                {this.state.modal.show && this.state.modal.index === index ?
                                    <EmployerJobFormHandler 
                                        edit = {true}
                                        title = {job.title}
                                        city = {job.city}
                                        minSalary = {job.minSalary}
                                        maxSalary = {job.maxSalary}
                                        description = {job.description}
                                        status = {job.status}
                                        showForm = {true}
                                        editJob = {event => this.editJobPost(event,index)}
                                        />: null}
                        </>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(EmployerJobPosts)