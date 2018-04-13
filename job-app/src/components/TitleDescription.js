import React, { Component } from 'react';
// import './JobList.css';
import { Link } from 'react-router-dom';

class TitleDescription extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="TitleDescription">
        <h2>Job Title</h2>
        <p>This is a job description.This is a job description.This is a job description.This is a job description.This is a job description.This is a job description.This is a job description.This is a job description.</p>
      </div>
    );
  }
}

export default TitleDescription;