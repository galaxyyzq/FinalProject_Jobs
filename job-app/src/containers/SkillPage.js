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
    const {skills, relatedJobs, skillRelatedSkills, user, onRelatedSkills, onLogin} = this.props
    const skill = skills.filter(job => job.uuid === uuid)[0]
    const jobs = relatedJobs[uuid]
    const relatedSkills = skillRelatedSkills[uuid]
    var skillName = "loading..."
    var description = ""
    if(skill !== undefined){
      if("name" in skill) skillName = skill.name
      if("skill_name" in skill) skillName = skill.skill_name
      if("suggestion" in skill) skillName = skill.suggestion
      description = skill.description
    }
    return (
      <div className="SkillPage">
       	<PageHeader user={user} onLogin={onLogin}/>
        <Grid columns={2} stackable>
            <Grid.Column widescreen={11} textAlign='left'>
              <div>
                <h2>SKILL: {skillName}</h2>
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
            </Grid.Column>
         </Grid>
        <NetVis data={skill} relatedSkills={relatedSkills} relatedJobs={jobs} />
      </div>
    );
  }
}

export default SkillPage;