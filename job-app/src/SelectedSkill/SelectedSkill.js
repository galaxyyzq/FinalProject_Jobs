import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SelectedSkill extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
            <Label image>
                modeling
                <Icon name='delete' />
            </Label>
            <Label image>
                coding
                <Icon name='delete' />
            </Label>
            <Label image>
                UX design
                <Icon name='delete' />
            </Label>
        </div>
    );
  }
    

}

export default SelectedSkill;