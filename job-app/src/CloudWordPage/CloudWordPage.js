import React, { Component } from 'react';
// import './CloudWordPage.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import TitleDescription from '../TitleDescription/TitleDescription';
import CloudWordVis from '../CloudWordVis/CloudWordVis';

class CloudWordPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="CloudWordPage">
       	<TitleDescription></TitleDescription>
        <CloudWordVis></CloudWordVis>
      </div>
    );
  }
}

export default CloudWordPage;