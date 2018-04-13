import React, { Component } from 'react';
// import './JobPage.css';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import PageHeader from '../components/Header';
import TitleDescription from '../components/TitleDescription';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import NetVis from '../components/NetVis';


class JobPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JobPage">
       	<PageHeader></PageHeader>
            <div>
              <TitleDescription></TitleDescription>
              <GoogleTrend></GoogleTrend>
            </div>
            <div>
              <QuanList></QuanList>
              <QuanList></QuanList>
              <Image src='../test.png' />
              <img src='../test.png' />
            </div>
            <NetVis></NetVis>
      </div>
    );
  }
}

export default JobPage;