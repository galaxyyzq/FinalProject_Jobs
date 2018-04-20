import React, { Component } from 'react';
import {
  Grid, Header
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import JobItem from './JobItem';
import PropTypes from 'prop-types'

class JobResult extends Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired
  }

  renderJobs = (job, onRelatedSkill, relatedSkills) => (
    <Grid.Column key={job.uuid}>
      <Link to={"/job/"+job.uuid}>
        <JobItem job={job} onRelatedSkill={onRelatedSkill} relatedSkills={relatedSkills}/>
      </Link>
    </Grid.Column>
  )

  render() {
    const {jobs, onRelatedSkill, relatedSkills} = this.props
    var indents = "loading...";
    if(jobs.length){
      indents = []
      for (var i = 0; i < jobs.length; i++) {
        indents.push(this.renderJobs(jobs[i], onRelatedSkill, relatedSkills));
      }
    }

    return (
      <div className="JobResult" style={{padding: '5em 5em' }}>
        <Header as='h3' textAlign='left'>Recommanded Jobs</Header>
        <Grid container columns={3}>
          {indents}
        </Grid>

      </div>
    );
  }
}

export default JobResult;