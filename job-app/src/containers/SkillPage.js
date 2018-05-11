import React, { Component } from 'react';
// import './SkillPage.css';
import PageHeader from '../components/Header';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import NetVis from '../components/NetVis';
import PropTypes from 'prop-types'
import { Grid, Segment, Image } from 'semantic-ui-react'

class SkillPage extends Component {

  static propTypes = {
    skills: PropTypes.array.isRequired,
    relatedJobs: PropTypes.object.isRequired,
    skillRelatedSkills: PropTypes.object.isRequired,
    onRelatedSkills: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.onHistory("skill/"+this.props.match.params.uuid)
  }

  render() {
    const uuid = this.props.match.params.uuid
    const {skills, relatedJobs, skillRelatedSkills, onRelatedSkills} = this.props
    const skill = skills.filter(job => job.uuid === uuid)[0]
    const jobs = relatedJobs[uuid]
    const relatedSkills = skillRelatedSkills[uuid]
    var skillName = "loading..."
    var description = ""
    if(skill !== undefined){
      skillName = "skill_name" in skill ? skill.skill_name:skill.suggestion
      description = skill.description
    }
    return (
      <div className="SkillPage">
       	<PageHeader/>
        <Grid columns={2} stackable>
            <Grid.Column widescreen={11} textAlign='left'>
              <div>
                <h2>{skillName}</h2>
                <p>{description}</p>
                <GoogleTrend keyWord={skillName}/>
                  <Grid columns={2} stackable>
                    <Grid.Column>
                      <QuanList name="Related Jobs Importance" data={jobs} fetchFunc={onRelatedSkills}/>
                    </Grid.Column>
                    <Grid.Column>
                      <QuanList name="Related Jobs Level" data={jobs} fetchFunc={onRelatedSkills}/>
                    </Grid.Column>
                  </Grid>    
              </div>
            </Grid.Column>
            <Grid.Column widescreen={5}>
              <Segment><Image src=""/></Segment>
            </Grid.Column>
         </Grid>
        <NetVis data={skill} relatedSkills={relatedSkills} relatedJobs={jobs} />
      </div>
    );
  }
}

export default SkillPage;