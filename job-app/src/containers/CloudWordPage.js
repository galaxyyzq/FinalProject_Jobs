import React, { Component } from 'react';
// import './JobPage.css';
import { Grid, Segment, Image } from 'semantic-ui-react'
import PageHeader from '../components/Header';
import JobHistory from '../components/JobHistory';
import SkillHistory from '../components/SkillHistory';

class CloudWordPage extends Component {

  render() {

    return (
      <div className="HistoryPage">
        <PageHeader/>
        <p className="yourhistory">This is your search history.</p>
        <JobHistory/>
        <SkillHistory/>
      </div>
    );
  }
}

export default CloudWordPage;