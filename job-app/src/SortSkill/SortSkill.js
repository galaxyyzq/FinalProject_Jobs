import React, { Component } from 'react';
// import './SortSkill.css';
import { Link } from 'react-router-dom';
import SelectedSkill from '../SelectedSkill/SelectedSkill';

class SortSkill extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="SortSkill">
       	<SelectedSkill></SelectedSkill>
        <SelectedSkill></SelectedSkill>
      </div>
    );
  }
}

export default SortSkill;