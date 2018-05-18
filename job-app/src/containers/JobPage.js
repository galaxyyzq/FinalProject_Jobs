import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Grid, Segment, Image, Loader } from 'semantic-ui-react'
import PageHeader from '../components/Header';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import PropTypes from 'prop-types'
import Iframe from 'react-iframe';

class JobPage extends Component {

  static propTypes = {
    jobs: PropTypes.array.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    jobPics: PropTypes.object.isRequired,
    onRelatedJobs: PropTypes.func.isRequired,
    onJobPic: PropTypes.func.isRequired
  }

  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.props.onHistory("job/"+this.props.match.params.uuid)
  }

  render() {
    const uuid = this.props.match.params.uuid
    const {jobs, relatedSkills, jobPics, user, onJobPic, onRelatedJobs, onRelatedSkills, onLogin} = this.props
    const job = jobs.filter(job => job.uuid === uuid)[0]
    const skills = relatedSkills[uuid]
    if(skills === undefined) onRelatedSkills(uuid)
    const jobPicUrl = uuid in jobPics? jobPics[uuid].regular:""
    var jobName =""
    var url = ""
    if(job !== undefined){
      if("title" in job) jobName = job.title
      if("suggestion" in job) jobName = job.suggestion
      url = "https://housenever.github.io/JobJungleVis_Test?id="+job.uuid
    }
    var img = (<Loader active inline='centered' />)
    if(jobPicUrl === ""){
      if(job !== undefined) onJobPic(job.uuid, jobName)
    } else{
      img = (<Image src={jobPicUrl}/>)
    }
    return (
      <div className="JobPage">
        <PageHeader user={user} onLogin={onLogin}/>
        <div className="InfoArea">
        <Grid columns={2} stackable>
            <Grid.Column widescreen={11} textAlign='left'>
              <div>
                <div className="PageTitleArea">
                  <p className="PageTitle" >{jobName}</p>
                </div>
                  <div className="QuanListArea">
                  <Grid columns={2} stackable>
                    <Grid.Column>
                      <QuanList name="Skill Importance" data={skills} fetchFunc={onRelatedJobs}/>
                    </Grid.Column>
                    <Grid.Column>
                      <QuanList name="Skill Level" data={skills} fetchFunc={onRelatedJobs}/>
                    </Grid.Column>
                  </Grid>
                  </div>
              </div>
            </Grid.Column>
            <Grid.Column widescreen={5}>
              <Segment>{img}</Segment>
             <p className="Note">*The image is only a reference.</p>
            </Grid.Column>
         </Grid>
         <GoogleTrend keyWord={jobName}/>
         </div>
         <div className="VisArea">
          <p className="VisTitle">Relation between {jobName} and other jobs/skills</p>
          <p>
            <span className="VisLable_Job">Related Jobs</span>
            <span className="VisLable_Skill">Related Skills</span>
          </p>
          <Iframe
          url={url}
          width="1400px"
          height="740px"
          className="embedVis"
          // display="initial"
          position="relative"
          allowFullScreen/>
        </div>

      </div>
    );
  }
}

export default JobPage;
