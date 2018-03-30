import React, { Component } from 'react';
// import './SearchBar.css';
import { Link } from 'react-router-dom';

class SearchBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="SearchBar">
       	<div className="ui search">
          <input className="prompt" type="text" placeholder="search jobs..."/>
          <div className="results"></div>
        </div>
      </div>
    );
  }
}

export default SearchBar;