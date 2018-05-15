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

  dragStart = (event) => {
    event.dataTransfer.setData("text", event.target.id)
  }

  drop = (event) => {
      if (event.target.id) {
        this.props.onSelectSwap(event.dataTransfer.getData("text"), event.target.id)
        event.dataTransfer.clearData()
      }
    }

  renderSelectedSkill = (uuid, key, name) => (
    <Label className="SkillLabel" id={uuid} key={key} color="blue" draggable={true} onDrop={this.drop} onDragStart={this.dragStart} onDragOver={(event) => event.preventDefault()}>
        {name}
        <Icon name='delete' id={uuid} onClick={this.handleDeselect}/>
    </Label>
  )

  render() {
    const {skills, selected} = this.props
    var indents = [];
    for(var i = 0; i < selected.length; i++){
      var skill = skills.filter(skill => skill.uuid === selected[i])[0]
      if(skill === undefined) continue
      var name = getSkillName(skill)
      indents.push(this.renderSelectedSkill(skill.uuid, skill.uuid+i, name));
    }
    return (
        <div className="SortSkill">
          <span className="SortSkillTitle">1. SELECT the skill and DRAG to order it</span>
          <div>{indents.length===0? "Select one skill from below and drag it to set the order...":indents}</div>
        </div>
    );
  }


}

export default SelectedSkill;
