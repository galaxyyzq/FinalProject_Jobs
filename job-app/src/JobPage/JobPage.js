import React, { Component } from 'react';
// import './JobPage.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import TitleDescription from '../TitleDescription/TitleDescription';
import GoogleTrend from '../GoogleTrend/GoogleTrend';
import QuanList from '../QuanList/QuanList';
import NetVis from '../NetVis/NetVis';

class JobPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JobPage">
       	<Header></Header>
        <div>
          <TitleDescription></TitleDescription>
          <GoogleTrend></GoogleTrend>
        </div>
        <div>
          <QuanList></QuanList>
          <QuanList></QuanList>
          <div>This is JobPic</div>
        </div>
        <NetVis></NetVis>
      </div>
    );
  }
}

export default JobPage;