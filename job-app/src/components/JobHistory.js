import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import JobItem from './JobItem';
import PropTypes from 'prop-types';

class JobHistory extends Component {

  static propTypes = {
    history: PropTypes.array.isRequired,
    jobs: PropTypes.array.isRequired,
    jobPics: PropTypes.object.isRequired,
    onJobPic: PropTypes.func.isRequired,
    onRelatedSkill: PropTypes.func.isRequired
  }




  renderJobs = (job, jobPicUrl, onRelatedSkill, relatedSkills, onJobPic) => (
    <Grid.Column key={job.uuid}>
      <Link to={"/job/"+job.uuid}>
        <JobItem job={job} jobPicUrl={jobPicUrl} onRelatedSkill={onRelatedSkill} relatedSkills={relatedSkills} onJobPic={onJobPic}/>
      </Link>
    </Grid.Column>
  )

  getJob = (jobs, uuid) => jobs.filter(job=>job.uuid === uuid)[0]

  render() {
    const {jobs, history, jobPics, onRelatedSkill, relatedSkills, onJobPic} = this.props
    var indents = "No job is searched";
    if(history.length){
           indents = []
              for (var i=0;i<history.length;i++)
                {
                    if (history[i].split('/')[0] === 'job')
                      {
                      var uuid = history[i].split('/')[1]
                      var jobPicUrl = uuid in jobPics? jobPics[uuid].small:""
                      var job = this.getJob(jobs, uuid)
                      if(job === undefined) continue
                      indents.push(this.renderJobs(job, jobPicUrl, onRelatedSkill, relatedSkills, onJobPic));
                      }
    }
 }


    return (
      <div className="JobHistory" style={{padding: '5em 5em' }}>
        <Grid container columns={3} textAlign="center">
          {indents}
        </Grid>
      </div>
    );
  }
}

export default JobHistory;
