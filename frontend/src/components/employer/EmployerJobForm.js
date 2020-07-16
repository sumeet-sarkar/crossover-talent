import React from 'react';

const employerJobForm = props => {
    return(
        <div className = "signup_form">
            <form>
                <label>
                    Title:
                    <input 
                        type="text" 
                        size="18"
                        name="title"
                        onChange={props.inputHandler}
                        placeholder={props.title}
                        value={props.title}
                    />
                </label>
                <label>
                    City:
                    <input 
                        type="text" 
                        size="18"
                        name="city"
                        onChange={props.inputHandler}
                        placeholder={props.city}
                        value={props.city}
                    />
                </label>
                <label>
                    Min Salary:
                    <input 
                        type="number" 
                        size="18"
                        name="minSalary"
                        onChange={props.inputHandler}
                        placeholder={props.minSalary}
                        value={props.minSalary}
                    />
                </label>
                <label>
                    Max Salary:
                    <input 
                        type="number" 
                        size="18"
                        name="maxSalary"
                        onChange={props.inputHandler}
                        placeholder={props.maxSalary}
                        value={props.maxSalary}
                    />
                </label>
                <label>
                    Description:
                    <input 
                        type="text" 
                        size="18"
                        name="description"
                        onChange={props.inputHandler}
                        placeholder={props.description}
                        value={props.description}
                    />
                </label>
            </form>
            <button
                type="button"
                onClick={props.actionButton}>
                {props.action}
            </button>
        </div>
    )
}

export default employerJobForm;