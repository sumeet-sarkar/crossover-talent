import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import JobSeekerFilter from '../../components/jobSeeker/JobSeekerFilter.js';
import JobSeekerPosts from '../../components/jobSeeker/JobSeekerPosts.js';
import './JobSeeker.css';

class JobSeeker extends Component {

	state = {
		filters: {
			category: [],
			city: [],
			minSalary: [],
			maxSalary: [],
			search: []
		},
		jobs: []
	};

	jobsHandler = (jobsList) => {
		let jobs = [];

		jobsList.forEach(job => {
			let check = true;
			this.props.location.user.applications.forEach(application => {
				if(application === job._id){
					check = false
					return
				}
			});
			if(check)
				jobs.push(job)
		})
		this.setState({ jobs: jobs })
	}

	applyJob = (e, jobId, index) => {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.props.location.bearerToken}`
		}
		const data = {
			'jobId': jobId,
			'userId': this.props.location.user._id
		}

		axios.post('http://localhost:8080/employee/new-application', data, {headers: headers})
			.then(response => {
				const jobs = [
					...this.state.jobs
				]
				jobs.splice(index, 1)
				this.setState({jobs: jobs})
				alert("job has been applied ", response)
			})
			.catch(error => {
				alert(error)
			})
	}

	applyFilter = () => {
		const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${this.props.location.bearerToken}`
		}

		let url = "http://localhost:8080/employee/home?"

		const filters = {
			...this.state.filters
		}

		for(let i in filters){
			if(filters[i].length>0){
				url += i + "=" + filters[i].join() + "&"
			}
		}

		//if there are filters applied, url will end with "&" according to the previous logic
		//if filters arent applied, url will end with "?" as declared
		//in either case, we dont want the last character
		url = url.slice(0,-1)

		console.log("url = ", url)

		axios.get(url, {headers: headers})
			.then(response => {
				this.jobsHandler(response.data.jobs)
			})
			.catch(error => {
				alert(error)
			})
	}

	textInput = (event) => {
		const value = event.target.value
		const name = event.target.name
		const filters = {
			...this.state.filters
		}

		//condition to make it an empty array instead of storing an empty string as 1 element in the array
		if (value === ""){
			filters[name].pop()
		}
		//condition to maintain the array and not convert it to a string
		else if(filters[name].length === 0){
			filters[name].push(value)
		}
		else {
			filters[name][0] = value
		}

		this.setState({ filters:filters })
	}

	buttonInput = (event, name) => {
		const value = event.target.value

		const filters = {
			...this.state.filters
		}

		const index = filters[name].indexOf(value)

		if(index === -1){
			filters[name].push(value)
		}
		else{
			filters[name].splice(index, 1)
		}
		
		if(event.target.classList[0] === "dropdown_selected"){
			event.target.classList.remove("dropdown_selected")
		}
		else {
			event.target.classList.add("dropdown_selected")
		}

		this.setState({ filters: filters })
	}

	componentDidMount = () => {
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.props.location.bearerToken}`
		}
		
		axios.get('http://localhost:8080/employee/home', {headers: headers})
			.then(response => {
				this.jobsHandler(response.data.jobs)
			})
			.catch(error => {
				alert(error)
			})
	}

	myApplicationsHandler = () => {
		this.props.history.push({
			pathname: '/employee/my-applications',
			bearerToken: this.props.location.bearerToken,
			user: this.props.location.user
		})
	}

	render() {

		if( this.props.location.bearerToken === undefined || 
			this.props.location.bearerToken === "" || 
			this.props.location.bearerToken === null)
		{
			return <Redirect to={{
                pathname: "/"
			}} />
		}

		const style = {
			float:"right"
		}

		return (
			<>
				<div className="landing_page_header">
                    <div className="landing_page_header_logo">
                        <h3>Crossover Talent</h3>
						<p style={style} onClick={this.myApplicationsHandler}>My Applications</p>
                    </div>
				</div>
				<JobSeekerFilter 
					category = {event => this.buttonInput(event, "category")}
					city = {event => this.buttonInput(event, "city")}
					textInput = {event => this.textInput(event)}
					applyFilter = {this.applyFilter}
				/>
				<div className="job_seeker_posts_box">
					{this.state.jobs.map((job,index) => {
						return(
						<JobSeekerPosts
							city = {job.city}
							salary = {job.salary}
							company = {job.company}
							title = {job.title}
							category = {job.category}
							applyJob = {event => this.applyJob(event, job._id, index)}
						/>);
					})}
				</div>
			</>
		);
	}
}
  
export default JobSeeker;  