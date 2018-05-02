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
    <Label className="SkillLabel" id={uuid} key={key} color="blue" onClick={this.handleDeselect}>
        {name}
        <Icon name='delete' />
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
          <p>{indents.length===0? "Click to see all skills":indents}</p>
        </div>
    );
  }


}

export default SelectedSkill;
