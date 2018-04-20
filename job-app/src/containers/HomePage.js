import React, { Component } from 'react';
// import './Home.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import PageHeader from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortSkill from '../components/SortSkill';
import AllSkill from '../components/AllSkill';
import JobResult from '../components/JobResult';
import {NUMBER_JOBS} from '../data/DefinedData';

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
    return (
      <div className="HomePage">
        <PageHeader/>
        <SearchBar value={value} onSearch={onSearch}/>
        <SortSkill skills={skills} selected={selected} onSelect={onSelect}/>
        <JobResult jobs={jobs.length >0? jobs.slice(0, NUMBER_JOBS):jobs} 
                    onRelatedSkill={onRelatedSkill}
                    relatedSkills={relatedSkills}/>
      </div>
    );
  }
}

export default HomePage;
