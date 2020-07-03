import React from 'react';

import './JobSeekerApplications.css'

const jobSeekerApplicationsJSX = props => {
    return (
        <div className="job_seeker_applications_box">
            <p>Company {props.company}</p>
            <p>Title {props.title}</p>
            <p>Description {props.description}</p>
            <p>City {props.city}</p>
            <p>Category {props.category}</p>
            <p>Salary {props.salary}</p>
            <p>Currency {props.currency}</p>
            <p>CurrencySymbol {props.currencySymbol}</p>
        </div>
    )
}

export default jobSeekerApplicationsJSX