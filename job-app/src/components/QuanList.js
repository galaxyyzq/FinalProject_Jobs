import React, { Component } from 'react';
// import './JobList.css';
import { Link } from 'react-router-dom';
import QuanItem from './QuanItem';

class QuanList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="QuanList">
       	<QuanItem></QuanItem>
        <QuanItem></QuanItem>
        <QuanItem></QuanItem>
       	<QuanItem></QuanItem>
        <QuanItem></QuanItem>
        <QuanItem></QuanItem>
        <QuanItem></QuanItem>
        <QuanItem></QuanItem>
      </div>
    );
  }
}

export default QuanList;