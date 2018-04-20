import React, { Component } from 'react';
// import './SelectedSkills.css';
import {Label, Grid } from 'semantic-ui-react';
// import Skill from './Skill';
import PropTypes from 'prop-types'

class AllSkill extends Component {

  static propTypes = {
    skills: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  handleSelect = () => {
    this.props.onSelect(this.state.skill.uuid)
  }

  renderSkill = (uuid, name, selected) => (
    <Label key={uuid} color={selected? 'blue':'grey'} onSelect={this.handleSelect}>
      {name}
    </Label> 
  )

  render() {
    const {skills, selected, onSelect} = this.props
    var indents = [];
    for (var i = 0; i < skills.length; i++) {
      var name = "name" in skills[i]? skills[i].name : skills[i].suggestion 
      indents.push(this.renderSkill(skills[i].uuid, name, selected.indexOf(skills[i].uuid) != -1));
    }
    return (
      <div className="AllSkill">
        <Grid container stackable verticalAlign='middle'>
       	  {indents}
        </Grid>
      </div>
    );
  }
}

export default AllSkill;