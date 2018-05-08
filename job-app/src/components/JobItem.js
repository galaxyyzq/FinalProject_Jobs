import React, { Component } from 'react';
import { Grid,Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types'


class JobItem extends Component {  

  static propTypes = {
    job: PropTypes.object.isRequired,
    jobPicUrl: PropTypes.string.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired, 
    onJobPic: PropTypes.func.isRequired
  }

  renderSkills = (index, skillName) => (
    <div key={index}>Skill{index}: {skillName}</div>
  )

  render() {
    const {job, jobPicUrl, onRelatedSkill, relatedSkills, onJobPic} = this.props
    var jobName = "title" in job ? job.title:job.suggestion
    // console.log(job.uuid, job.uuid in relatedSkills)
    var indents = [];
    var img = "loading..."
    if(jobPicUrl === ""){
      if(job !== undefined) onJobPic(job.uuid, jobName)
    } else{
      img = (<img className="JobPic" src={jobPicUrl}/>)
    }
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
            <Grid>
            <Grid.Row>
            <Grid.Column width={10}> 
                <h3>{jobName}</h3>
                <div>{indents}</div>
            </Grid.Column>
            <Grid.Column width={6}>  
                {img}
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </Segment>
        
      </div>
    );
  }
}

export default JobItem;