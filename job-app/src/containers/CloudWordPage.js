import React, { Component } from 'react';
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
    onRelatedSkills: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onJobPic: PropTypes.func.isRequired,
    onHistory: PropTypes.func.isRequired
  }

  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0)
  }

  render() {
    const {history, skills, jobs, relatedSkills, user, onRelatedSkills, jobPics, onRelatedJobs, onJobPic, onHistory, onLogin} = this.props
    return (
      <div className="HistoryPage">
        <PageHeader user={user} onLogin={onLogin}/>
        <p className="yourhistory">Look your browser history!</p>
        <p className="HistoryTitle">Jobs:</p>
        <JobHistory   history={history}
                      jobs={jobs}
                      jobPics={jobPics}
                      relatedSkills={relatedSkills}
                      onRelatedJobs={onRelatedJobs}
                      onRelatedSkill={onRelatedSkills}
                      onJobPic={onJobPic}
                      onHistory={onHistory}/>
        <p className="HistoryTitle">Skills:</p>
        <SkillHistory skills={skills}
                      history={history} />
      </div>
    );
  }
}

export default CloudWordPage;
