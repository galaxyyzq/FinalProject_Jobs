import React, { Component } from 'react';
// import './Home.css';
import { Link } from 'react-router-dom';
import PageHeader from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortSkill from '../components/SortSkill';
import AllSkill from '../components/AllSkill';
import JobResult from '../components/JobResult';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <PageHeader></PageHeader>
        <SearchBar></SearchBar>
        <SortSkill></SortSkill>
        <JobResult></JobResult>
        <div>
          <Link to="/job">
            <button>Temp: job</button>
          </Link>
        </div>
        <div>
          <Link to="/skill">
            <button>Temp: skill</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
