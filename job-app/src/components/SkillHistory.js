import React, { Component } from 'react';
import { Grid, Label,Segment } from 'semantic-ui-react'
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
        <Segment textAlign='left'>
            <Link to={"/skill/"+uuid} key={uuid} >
                   {name}
             </Link>
        </Segment>
      </Grid.Row>
    </Grid.Column>
  )

  render() {
      const {history, skills} = this.props
      var indents = "No skill is searched";
      if(history.length){
           indents = []
              for (var i=0;i<history.length;i++)
                {
                    if (history[i].split('/')[0] == 'skill')
                      {
                      var uuid = history[i].split('/')[1]
                      var skill = skills.filter(job => job.uuid === uuid)[0]
                      var skillName = skill.name
                      if(skill !== undefined){
                          if("name" in skill) skillName = skill.name
                          if("skill_name" in skill)  skillName = skill.skill_name
                      }
                      console.log(skill)
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