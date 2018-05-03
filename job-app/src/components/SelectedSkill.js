import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import { getSkillName } from './AllSkill'

class SelectedSkill extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  handleDeselect = (event) => {
    this.props.onSelect(event.target.id)
  }

  renderSelectedSkill = (uuid, key, name) => (
    <Label className="SkillLabel" key={key} color="blue">
        {name}
        <Icon name='delete' id={uuid} onClick={this.handleDeselect}/>
    </Label>
  )

  render() {
    const {skills, selected} = this.props
    var indents = [];
    for (var i = 0; i < skills.length; i++) {
        if(selected.indexOf(skills[i].uuid) !== -1){
            var name = getSkillName(skills[i])
            indents.push(this.renderSelectedSkill(skills[i].uuid, skills[i].uuid+i, name));
        }
    }
    return (
        <div className="SortSkill">
          <span className="SortSkillTitle">1. Select your interesting skill lable</span>
          <p>{indents.length===0? "Select one skill from below and drag it to set the order...":indents}</p>
        </div>
    );
  }


}

export default SelectedSkill;
