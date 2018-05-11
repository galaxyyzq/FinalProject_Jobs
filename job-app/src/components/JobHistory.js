import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import JobItem from './JobItem';
import PropTypes from 'prop-types'

class JobHistory extends Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    jobPics: PropTypes.object.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onJobPic: PropTypes.func.isRequired
  }

 

  render() {
    const {jobs, jobPics, onRelatedSkill, relatedSkills, onJobPic} = this.props
    var indents = "loading...";


    return (
      <div className="JobHistory" style={{padding: '5em 5em' }}>
        <Grid container columns={3}>
          {indents}
        </Grid>

      </div>
    );
  }
}

export default JobHistory;