import React, { Component } from 'react';
// import './SelectedSkills.css';
import {Label, Grid } from 'semantic-ui-react';
// import Skill from './Skill';
import PropTypes from 'prop-types'

export const getSkillName = (skill) => {
  // skills
  if("name" in skill){
    return skill.name
  }
  // search
  if("suggestion" in skill){
    return skill.suggestion
  }
  // skill_id
  if("skill_name" in skill){
    return skill.skill_name
  }
}

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
    // console.log(skills)
    var indents = "loading...";
    if(skills.length){
      indents = []
      for (var i = 0; i < skills.length; i++) {
        var name = getSkillName(skills[i])
        indents.push(this.renderSkill(skills[i].uuid+i, name, selected.indexOf(skills[i].uuid) !== -1));
      }
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