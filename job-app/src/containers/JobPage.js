import React, { Component } from 'react';
// import './JobPage.css';
import { Grid, Segment, Image } from 'semantic-ui-react'
import PageHeader from '../components/Header';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import NetVis from '../components/NetVis';
import PropTypes from 'prop-types'

class JobPage extends Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    jobRelatedJobs: PropTypes.object.isRequired,
    jobPics: PropTypes.object.isRequired,
    onRelatedJobs: PropTypes.func.isRequired,
    onJobPic: PropTypes.func.isRequired
  }

  render() {
    const uuid = this.props.match.params.uuid
    const {jobs, relatedSkills, jobRelatedJobs, jobPics, onRelatedJobs} = this.props
    const job = jobs.filter(job => job.uuid === uuid)[0]
    const skills = relatedSkills[uuid]
    const relatedJobs = jobRelatedJobs[uuid]
    const jobPicUrl = jobPics[job.uuid].regular
    var jobName = "loading..."
    if(job !== undefined){
      jobName = "title" in job ? job.title:job.suggestion
    }
    return (
      <div className="JobPage">
        <PageHeader/>
        <Grid columns={2} stackable>
            <Grid.Column widescreen={11} textAlign='left'>
              <div>
                <h2>{jobName}</h2>
                <GoogleTrend keyWord={jobName}/>
                  <Grid columns={2} stackable>
                    <Grid.Column>
                      <QuanList name="Skill Importance" data={skills} fetchFunc={onRelatedJobs}/>
                    </Grid.Column>
                    <Grid.Column>
                      <QuanList name="Skill Level" data={skills} fetchFunc={onRelatedJobs}/>
                    </Grid.Column>
                  </Grid>    
              </div>
            </Grid.Column>
            <Grid.Column widescreen={5}>
              <Segment><Image src='/img/test.png' /></Segment>
            </Grid.Column>
         </Grid>
        <NetVis data={job} relatedSkills={skills} relatedJobs={relatedJobs}/>
      </div>
    );
  }
}

export default JobPage;