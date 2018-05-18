import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class SkillHistory extends Component {


  static propTypes = {
    history: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
  }

  renderSkills = (name,uuid) => (
    <Grid.Column key={uuid}>
      <Grid.Row>
        <Segment className="SkillLabel" textAlign='center'>
            <Link to={"/skill/"+uuid} key={uuid} >
                   {name}
             </Link>
        </Segment>
      </Grid.Row>
    </Grid.Column>
  )

  getSkill = (skills, uuid) => skills.filter(job => job.uuid === uuid)[0]

  render() {
      const {history, skills} = this.props
      var indents = "No skill is searched";
      if(history.length){
           indents = []
              for (var i=0;i<history.length;i++)
                {
                    if (history[i].split('/')[0] === 'skill')
                      {
                      var uuid = history[i].split('/')[1]
                      var skill = this.getSkill(skills, uuid)
                      var skillName = skill.name
                      if(skill !== undefined){
                          if("name" in skill) skillName = skill.name
                          if("skill_name" in skill)  skillName = skill.skill_name
                      }
                      indents.push(this.renderSkills(skillName,uuid));
                      }

    }
 }

    return (
      <div className="SkillHistory" style={{padding: '5em 5em' }}>
            <Grid container columns={3} >
              {indents}
            </Grid>
      </div>
    );
  }



}

export default SkillHistory;
