import React from 'react';

import './JobSeekerPosts.css';

const jobSeekerPosts = props => {
        return (
            <div className="job_seeker_posts_box_post">
                <p>City {props.city}</p>
                <p>salary {props.salary}</p>
                <p>company {props.company}</p>
                <p>title {props.title}</p>
                <p>category {props.category}</p>
                <button
                    type="button" onClick={props.applyJob}>
                    Apply
                </button>
            </div>
        );
};

export default jobSeekerPosts;