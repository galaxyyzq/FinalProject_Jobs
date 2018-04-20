import React, { Component } from 'react';
// import './Home.css';
import PropTypes from 'prop-types'
import PageHeader from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortSkill from '../components/SortSkill';
import JobResult from '../components/JobResult';
import {NUMBER_JOBS, NUMBER_SKILLS} from '../data/DefinedData';

class HomePage extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render() {
    const {value, onSearch, jobs, skills, selected, 
      onRelatedSkill, relatedSkills, onSelect} = this.props
    var jobFilter = jobs.filter(job => {
      var jobName = job.normalized_job_title
      if(value === "") return job
      return jobName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    })
    var skillFilter = skills.filter(skill => {
      var skillName = skill.normalized_skill_name
      if(value === "") return skill
      return skillName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    })
    return (
      <div className="HomePage">
        <PageHeader/>
        <SearchBar value={value} onSearch={onSearch}/>
        <SortSkill skills={skillFilter.length>0? skillFilter.slice(0, NUMBER_SKILLS):skillFilter} 
                    selected={selected} 
                    onSelect={onSelect}/>
        <JobResult jobs={jobFilter.length >0? jobFilter.slice(0, NUMBER_JOBS):jobFilter} 
                    onRelatedSkill={onRelatedSkill}
                    relatedSkills={relatedSkills}/>
      </div>
    );
  }
}

export default HomePage;
