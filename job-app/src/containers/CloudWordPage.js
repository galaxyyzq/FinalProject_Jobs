import React, { Component } from 'react';
// import './CloudWordPage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CloudWordVis from '../components/CloudWordVis';

class CloudWordPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="CloudWordPage">
        <CloudWordVis></CloudWordVis>
      </div>
    );
  }
}

export default CloudWordPage;