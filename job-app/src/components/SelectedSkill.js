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

  handleDeselect = () => {
    this.props.onSelect(this.state.skill.uuid)
  }

  renderSelectedSkill = (uuid, name) => (
    <Label image key={uuid} onSelect={this.handleDeselect}>
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
            indents.push(this.renderSelectedSkill(skills[i].uuid+i, name));
        }
    }
    return (
        <div className="SortSkill">
            {indents.length===0? "please select at least one skill you're interested from below...to be continued...":indents}
        </div>
    );
  }
    

}

export default SelectedSkill;