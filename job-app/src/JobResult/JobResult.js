import React, { Component } from 'react';
// import './JobList.css';
import { Link } from 'react-router-dom';
import JobItem from '../JobItem/JobItem';

class JobResult extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JobResult">
       	<JobItem></JobItem>
        <JobItem></JobItem>
      </div>
    );
  }
}

export default JobResult;