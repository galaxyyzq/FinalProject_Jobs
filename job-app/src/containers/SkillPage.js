import React, { Component } from 'react';
// import './SkillPage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import TitleDescription from '../components/TitleDescription';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import NetVis from '../components/NetVis';

class SkillPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="SkillPage">
       	<Header></Header>
        <div>
          <TitleDescription></TitleDescription>
          <GoogleTrend></GoogleTrend>
        </div>
        <div>
          <QuanList></QuanList>
          <QuanList></QuanList>
          <div>This is SkillPic</div>
        </div>
        <NetVis></NetVis>
      </div>
    );
  }
}

export default SkillPage;