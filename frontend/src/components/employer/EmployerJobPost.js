import React from 'react';

import './EmployerJobPost.css'

const employerJobPost = props => {
    return(
        <div className = "employer_job_post_box" onClick={props.viewJobApplications}>
            <p>Title {props.title}</p>
            <p>City {props.city}</p>
            <p>Min Salary {props.minSalary}</p>
            <p>Max Salary {props.maxSalary}</p>
            <p>Status {props.status}</p>
            <button onClick={props.viewJobPost} id="viewJobPost">View</button>
            <button onClick={props.changeStatus} id="changeStatusJobPost">Status</button>
            <button onClick={props.deleteJobPost} id="deleteJobPost">Delete</button>
        </div>
    )
}

export default employerJobPost;