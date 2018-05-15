import React, { Component } from 'react';
// import './JobPage.css';
import { Grid, Segment, Image } from 'semantic-ui-react'
import PageHeader from '../components/Header';
import JobHistory from '../components/JobHistory';
import PropTypes from 'prop-types'
import SkillHistory from '../components/SkillHistory';

class CloudWordPage extends Component {

 static propTypes = {
    history: PropTypes.array.isRequired,
    jobs: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    jobPics:PropTypes.object.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onJobPic: PropTypes.func.isRequired,
    onHistory: PropTypes.func.isRequired
  }

  render() {
    const {jobs, jobPics, history, user, onLogin, onRelatedJobs, onJobPic, onHistory, onRelatedSkill,relatedJobs,relatedSkills,skills} = this.props
    console.log(this.props)
    return (
      <div className="HistoryPage">
        <PageHeader user={user} onLogin={onLogin}/>
        <p className="yourhistory">Look your browser history!</p>
        <JobHistory   history={history}
                      jobs={jobs}
                      jobPics={jobPics}
                      relatedSkills={relatedSkills}
                      onRelatedJobs={this.handleRelatedJobs}
                      onRelatedSkill={this.handleRelatedSkills}
                      onJobPic={this.handleJobPic}
                      onHistory={this.handleHistory}/>
        <SkillHistory skills={skills}
                      history={history} />
      </div>
    );
  }
}

export default CloudWordPage;
