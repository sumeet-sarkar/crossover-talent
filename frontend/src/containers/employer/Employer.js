import React, { Component } from 'react'

import EmployerFilter from './EmployerFilter.js'
import EmployerJobPosts from './EmployerJobPosts.js'
import EmployerJobFormHandler from './EmployerJobForm.js'

import './Employer.css'

class Employer extends Component{
    render() {
        return(
            <>
                <div className="landing_page_header">
                    <div className="landing_page_header_logo">
                        <h3>Crossover Talent</h3>
                    </div>
                </div>

                <EmployerFilter/>

                <div className="employer_job_form">
                    <EmployerJobFormHandler/>
                </div>

                <EmployerJobPosts
                    userId = {this.props.location.user._id}
                    bearerToken = {this.props.location.bearerToken}
                />
            </>
        )
    }
}

export default Employer