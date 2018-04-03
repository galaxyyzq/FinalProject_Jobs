import React, { Component } from 'react';
import { Accordion, Icon, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import SelectedSkill from './SelectedSkill';
import AllSkill from './AllSkill';


class SortSkill extends Component {

  constructor(props) {
    super(props)
  }
    
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
            
    const { activeIndex } = this.state
    
      
    return (
      <div className="SortSkill" style={{padding: '0em 6em' }}>
        
            <Accordion  fluid styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    <Grid container stackable>
                        <Grid.Column width={15} verticalAlign='left'>
                            <SelectedSkill/>
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign='right'>
                            <Icon name='plus'/>
                        </Grid.Column>
                    </Grid>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <AllSkill/>
                </Accordion.Content>
            </Accordion>
      </div>
    );
  }
}

export default SortSkill;


