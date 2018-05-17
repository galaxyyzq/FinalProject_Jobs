import React, { Component } from 'react';
// import '../Home.css';
import PropTypes from 'prop-types'
import PageHeader from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortSkill from '../components/SortSkill';
import JobResult from '../components/JobResult';
import {NUMBER_JOBS, NUMBER_SKILLS, NUMBER_JOBS_FETCH, DEFAULT_KEY_WORD, SEARCH_FAILURE} from '../data/DefinedData';

class HomePage extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onRelatedSkills: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onJobPic: PropTypes.func.isRequired
  }

  render() {
    const {value, onSearch, jobs, skills, selected, jobPics, user,
      relatedJobs, relatedSkills, skillJobs,
      onRelatedSkills, onSelect, onJobPic, onSelectSwap, onLogin, onJobIndex} = this.props
    var keyWord = value.toLowerCase()
    var resultJobs = jobs.filter((job) => {
        if(keyWord.length === 0 || job.title.toLowerCase().indexOf(keyWord) !== -1){
          return job
        }
      })
    var skillSelectName = ""
    var resultSkills = skills.filter((skill) => {
      // for JobResult to show the selected skill
      if(selected.length !== 0 && skill.uuid === selected[0]) skillSelectName = skill.normalized_skill_name
      if(keyWord.length === 0 || skill.normalized_skill_name.indexOf(keyWord) !== -1){
        delete skill.onet_element_id
        return skill
    }})

    var jobFilter = jobs.filter(job => {
      var jobName = job.normalized_job_title === undefined? job.title:job.normalized_job_title
      // keyword
      if(jobName !== undefined) return jobName.toLowerCase().indexOf(DEFAULT_KEY_WORD) !== -1
      return job
    })
    if(selected.length !== 0){
      var skill = relatedJobs[selected[0]]
      if(skill !== undefined){
        skill = skill.slice(0, NUMBER_SKILLS)
        for(var i = 0; i < skill.length; i++){
          skill[i].uuid = skill[i].job_uuid
          skill[i].title = skill[i].job_title
        }
        jobFilter = skill
      }
    }
    // filter no related jobs
    var skillFilter = skills.filter(skill => {
      if(skillJobs !== SEARCH_FAILURE){
        return skillJobs.indexOf(skill.uuid) !== -1
      }
    })
    return (
      <div className="HomePage">
        <PageHeader user={user} onLogin={onLogin}/>
        <div className="HomeMainPart">
          <div className="MainTitle">
            <p>Here, Explore the jobs in the Jungle!</p>
            </div>
            <SearchBar jobs={resultJobs.slice(0, NUMBER_JOBS)} skills={resultSkills.slice(0, NUMBER_SKILLS)} value={value} onSearch={onSearch}/>
            </div>
        <div className="Guide">
          <div className="Guide-Title">
            <p>If you do not know what to search...</p>
          </div>

        <SortSkill skills={skillFilter}
                    selected={selected}
                    onSelect={onSelect}
                    onSelectSwap={onSelectSwap}/>
        <JobResult jobs={jobFilter.slice(0, this.props.jobIndex)}
                   jobPics={jobPics} onRelatedSkill={onRelatedSkills} onJobPic={onJobPic} couldJobIndex={jobFilter.length - this.props.jobIndex >= 1}
                    relatedSkills={relatedSkills} onJobIndex={onJobIndex} skillSelectName={skillSelectName} />
      </div>
      </div>
    );
  }
}

export default HomePage;
