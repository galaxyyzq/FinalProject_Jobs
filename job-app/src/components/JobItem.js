import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types'

class JobItem extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired
  }

  renderSkills = (index, skillName) => (
    <div key={index}>Skill{index}: {skillName}</div>
  )

  render() {
    const {job, onRelatedSkill, relatedSkills} = this.props
    var jobName = "title" in job ? job.title:job.suggestion
    // console.log(job.uuid, job.uuid in relatedSkills)
    var indents = [];
    if(job.uuid in relatedSkills){
      if(relatedSkills[job.uuid] === undefined || relatedSkills[job.uuid].length === 0){
        indents = "no skills to show"
      }
      else {
          for (var i = 0; i < 3; i++) {
          var skillName = relatedSkills[job.uuid][i].skill_name
          indents.push(this.renderSkills(i+1, skillName));
        }
      }
    } else {
      indents = "loading..."
      onRelatedSkill(job.uuid)
    }
    return (
      <div className="JobItem">
        <Segment textAlign='left'>
            <h3>{jobName}</h3>
            <div>{indents}</div>
            <div>job item pic</div>
        </Segment>
        
      </div>
    );
  }
}

export default JobItem;