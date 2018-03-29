import React, { Component } from 'react';
// import './Home.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import SortSkill from '../SortSkill/SortSkill';
import AllSkill from '../AllSkill/AllSkill';
import JobResult from '../JobResult/JobResult';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <Header></Header>
        <SearchBar></SearchBar>
        <SortSkill></SortSkill>
        <AllSkill></AllSkill>
        <JobResult></JobResult>
      </div>
    );
  }
}

export default HomePage;
