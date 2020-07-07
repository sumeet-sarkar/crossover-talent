import React from 'react';

import './EmployerFilter.css';

const employerFilter = () => {
        return (
            <div className="employer_filter">
                <input className="employer_filter_text" 
                    type="text" 
                    size="18" 
                    name="title" 
                    placeholder="Title"/>
                <input className="employer_filter_text"
                    type="text" 
                    size="18" 
                    name="status" 
                    placeholder="Status"/>
                <input className="employer_filter_text"
                    type="text" 
                    size="18" 
                    name="postedBy" 
                    placeholder="Posted By"/>
            </div>
        );
};

export default employerFilter;