import React from 'react';


import './JobSeekerFilter.css';

const jobSeekerFilter = props => {
        return (
            <div className="job_seeker_filter_box">
                <div className="job_seeker_filter_box_subpart" name="category">
                    Category
                    <button
                        type="button" onClick={props.category} value="home">
                        Home
                    </button>
                    <button
                        type="button" onClick={props.category} value="shoes">
                        Shoes
                    </button>
                    <button
                        type="button" onClick={props.category} value="clothing">
                        Clothing
                    </button>
                    <button
                        type="button" onClick={props.category} value="computers">
                        Computers
                    </button>
                    <button
                        type="button" onClick={props.category} value="toys">
                        Toys
                    </button>
                </div>
                <div className="job_seeker_filter_box_subpart">
                    City
                    <button
                        type="button" onClick={props.city} value="karleeview">
                        Karleeview
                    </button>
                    <button
                        type="button" onClick={props.city} value="jabarihaven">
                        jabarihaven
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