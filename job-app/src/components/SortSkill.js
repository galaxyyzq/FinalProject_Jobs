import React, { Component } from 'react';
import { Accordion, Icon, Grid } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import SelectedSkill from './SelectedSkill';
import AllSkill from './AllSkill';
import PropTypes from 'prop-types'

class SortSkill extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }
  
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }


  render() {
    const { skills, selected, onSelect} = this.props
    console.log(skills)
    const { activeIndex } = this.state
    
      
    return (
      <div className="SortSkill" style={{padding: '0em 6em' }}>
        <Accordion fluid styled>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Grid container stackable>
              <Grid.Column width={15} textAlign='left'>
                  <SelectedSkill skills={skills} selected={selected} onSelect={onSelect}/>
              </Grid.Column>
              <Grid.Column width={1} textAlign='right'>
                  <Icon name='plus'/>
              </Grid.Column>
            </Grid>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <AllSkill skills={skills} selected={selected} onSelect={onSelect}/>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default SortSkill;


