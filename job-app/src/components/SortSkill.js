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
    const { skills, selected, onSelect, onSelectSwap} = this.props
    // console.log(skills)
    const { activeIndex } = this.state
    return (
      <div className="SortSkill" style={{padding: '0em 6em' }}>
        <Accordion fluid>
          <Grid container stackable>
            <Grid.Column width={16} textAlign='center'>
                <SelectedSkill skills={skills} selected={selected} onSelect={onSelect} onSelectSwap={onSelectSwap}/>
            </Grid.Column>
          </Grid>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name={activeIndex === 0? 'minus':'plus'}/>Skills to be selected
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
