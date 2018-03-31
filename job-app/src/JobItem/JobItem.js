import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class JobItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JobItem">
        
        <Segment textAlign='left'>
            <p>Job Name</p>
            <p>Skill1 Skill2 Skill3</p>
            <p>job item pic</p>
        </Segment>
        
      </div>
    );
  }
}

export default JobItem;