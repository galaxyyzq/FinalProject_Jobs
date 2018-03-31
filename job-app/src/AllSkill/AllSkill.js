import React, { Component } from 'react';
// import './SelectedSkills.css';
import { Link } from 'react-router-dom';
import Skill from '../Skill/Skill';

class AllSkill extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="AllSkill">
       	<Skill/>
      </div>
    );
  }
}

export default AllSkill;