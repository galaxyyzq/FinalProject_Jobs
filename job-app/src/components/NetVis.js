import React, { Component } from 'react';
// import './JobList.css';
import PropTypes from 'prop-types'

class NetVis extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    relatedJobs: PropTypes.array.isRequired,
    relatedSkills: PropTypes.array.isRequired
  }

  render() {
  	const {data, relatedJobs, relatedSkills} = this.props
  	console.log(data, relatedJobs, relatedSkills)
    return (
      <div className="NetVis">
       	
      </div>
    );
  }
}

export default NetVis;