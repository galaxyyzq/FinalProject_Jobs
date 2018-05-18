import React, { Component } from 'react';
// import './SkillPage.css';
import PageHeader from '../components/Header';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

class SkillPage extends Component {

  static propTypes = {
    skills: PropTypes.array.isRequired,
    relatedJobs: PropTypes.object.isRequired,
    onRelatedSkills: PropTypes.func.isRequired
  }

  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0)
  }
  
  componentWillMount() {
    this.props.onHistory("skill/"+this.props.match.params.uuid)
  }

  render() {
    const uuid = this.props.match.params.uuid
    const {skills, relatedJobs, user, onRelatedJobs, onRelatedSkills, onLogin} = this.props
    const skill = skills.filter(job => job.uuid === uuid)[0]
    const jobs = relatedJobs[uuid]
    if(jobs === undefined) onRelatedJobs(uuid)
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
              <div className="PageTitleArea">
                <span className="PageTitle" >{skillName}</span>
                <p className="description"><b>Skill description</b>: {description}</p>
              </div>


                <GoogleTrend keyWord={skillName}/>
                <div className="QuanListArea">
                  <Grid columns={2} stackable>
                    <Grid.Column>
                      <QuanList name="Related Jobs Importance" data={jobs} fetchFunc={onRelatedSkills}/>
                    </Grid.Column>
                    <Grid.Column>
                      <QuanList name="Related Jobs Level" data={jobs} fetchFunc={onRelatedSkills}/>
                    </Grid.Column>
                  </Grid>
                  </div>
              </div>
            </Grid.Column>
            <Grid.Column widescreen={5}>
            </Grid.Column>
         </Grid>
      </div>
    );
  }
}

export default SkillPage;
