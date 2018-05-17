import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import JobItem from './JobItem';
import PropTypes from 'prop-types'
import {SEARCH_FAILURE} from '../data/DefinedData'

class JobResult extends Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    jobPics: PropTypes.object.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onJobPic: PropTypes.func.isRequired
  }

  renderJobs = (job, jobPicUrl, onRelatedSkill, relatedSkills, onJobPic) => (
    <Grid.Column key={job.uuid}>
      <Link to={"/job/"+job.uuid}>
        <JobItem job={job} jobPicUrl={jobPicUrl} onRelatedSkill={onRelatedSkill} relatedSkills={relatedSkills} onJobPic={onJobPic}/>
      </Link>
    </Grid.Column>
  )

  render() {
    const {jobs, jobPics, onRelatedSkill, relatedSkills, onJobPic} = this.props
    var indents = "loading...";
    if(jobs.length){
      indents = []
      for (var i = 0; i < jobs.length; i++) {
        if(jobs[i] === SEARCH_FAILURE) continue
        var jobPicUrl = jobs[i].uuid in jobPics? jobPics[jobs[i].uuid].small:""
        indents.push(this.renderJobs(jobs[i], jobPicUrl, onRelatedSkill, relatedSkills, onJobPic));
      }
    }

    return (
      <div className="JobResult" style={{padding: '5em 5em' }}>
        <p className="SortSkillTitle">2. We Recommand Jobs to you</p>
        <Grid container columns={3}>
          {indents}
        </Grid>
      </div>
    );
  }
}

export default JobResult;
