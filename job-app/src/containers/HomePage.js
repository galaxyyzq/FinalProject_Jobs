import React, { Component } from 'react';
// import '../Home.css';
import PropTypes from 'prop-types'
import PageHeader from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortSkill from '../components/SortSkill';
import JobResult from '../components/JobResult';
import {NUMBER_JOBS, NUMBER_SKILLS, DEFAULT_KEY_WORD, SEARCH_FAILURE} from '../data/DefinedData';

class HomePage extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onJobPic: PropTypes.func.isRequired
  }

  render() {
    const {value, onSearch, jobs, skills, selected, jobPics, relatedJobs, relatedSkills, skillJobs,
      onRelatedSkill, onSelect, onJobPic, onSelectSwap} = this.props
    var keyWord = value.toLowerCase()
    var resultJobs = jobs.filter((job) => {
        if(keyWord.length === 0 || job.title.toLowerCase().indexOf(keyWord) !== -1){
          return job
        }
      })
    var resultSkills = skills.filter((skill) => {
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
          // delete skill[i].job_uuid;
          skill[i].title = skill[i].job_title
          // delete skill[i].job_title
        }
        jobFilter = skill
      }
    }
    // var skillFilter = skills.filter(skill => {
    //   var skillName = skill.normalized_skill_name === undefined? skill.skill_name:skill.normalized_skill_name
    //   if(value === "" || skillName === undefined) return skill
    //   return skillName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    // })
    // filter no related jobs
    var skillFilter = skills.filter(skill => {
      if(skillJobs !== SEARCH_FAILURE){
        return skill.uuid in skillJobs
      }
      return skill
    })
    return (
      <div className="HomePage">
        <PageHeader/>
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

        <SortSkill skills={skillFilter.length>0? skillFilter.slice(0, NUMBER_SKILLS):skillFilter}
                    selected={selected}
                    onSelect={onSelect}
                    onSelectSwap={onSelectSwap}/>
        <JobResult jobs={jobFilter.length >0? jobFilter.slice(0, NUMBER_JOBS):jobFilter}
                   jobPics={jobPics} onRelatedSkill={onRelatedSkill} onJobPic={onJobPic}
                    relatedSkills={relatedSkills}/>
      </div>
      </div>
    );
  }
}

export default HomePage;
