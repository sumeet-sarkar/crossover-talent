import React from 'react';

import './JobSeekerFilter.css';

const jobSeekerFilter = props => {
        return (
            <div className="job_seeker_filter_box">
                <div className="job_seeker_filter_box_subpart" name="category">
                    Category
                    <button
                        type="button" onClick={props.category} value="Healthcare">
                        Healthcare
                    </button>
                    <button
                        type="button" onClick={props.category} value="Finance">
                        Finance
                    </button>
                    <button
                        type="button" onClick={props.category} value="Software">
                        Software
                    </button>
                    <button
                        type="button" onClick={props.category} value="Internet">
                        Internet
                    </button>
                    <button
                        type="button" onClick={props.category} value="Enterprise">
                        Enterprise
                    </button>
                </div>
                <div className="job_seeker_filter_box_subpart">
                    City
                    <button
                        type="button" onClick={props.city} value="Bengaluru">
                        Bengaluru
                    </button>
                    <button
                        type="button" onClick={props.city} value="Mumbai">
                        Mumbai
                    </button>
                    <button
                        type="button" onClick={props.city} value="Delhi">
                        Delhi
                    </button>
                    <button
                        type="button" onClick={props.city} value="Pune">
                        Pune
                    </button>
                    <button
                        type="button" onClick={props.city} value="Mysuru">
                        Mysuru
                    </button>
                    <button
                        type="button" onClick={props.city} value="Chennai">
                        Chennai
                    </button>
                    <button
                        type="button" onClick={props.city} value="Hyderabad">
                        Hyderabad
                    </button>
                    <button
                        type="button" onClick={props.city} value="Bhubaneswar">
                        Bhubaneswar
                    </button>
                </div>
                <div className="job_seeker_filter_box_subpart">
                    <input 
                        type="text" 
                        size="18" 
                        name="minSalary" 
                        onChange={props.textInput} 
                        value={props.minSalary}
                        placeholder="Enter Minimum Salary"/>
                    <input 
                        type="text" 
                        size="18" 
                        name="maxSalary" 
                        onChange={props.textInput} 
                        value={props.maxSalary}
                        placeholder="Enter Maximum Salary"/>
                    <input 
                        type="text" 
                        size="18" 
                        name="search" 
                        onChange={props.textInput} 
                        value={props.search}
                        placeholder="Search Here"/>
                </div>
                <div>
                    <button
                        type="button" onClick={props.applyFilter}>
                        Apply
                    </button>
                </div>
            </div>
        );
};

export default jobSeekerFilter;