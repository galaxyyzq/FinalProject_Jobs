import React, { Component } from 'react';
import { Icon, Label, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Skill extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Skill">
        <Grid container stackable verticalAlign='middle'>
            <Label color='blue'>
                modeling
            </Label>
            <Label color='blue'>
                coding
            </Label>
            <Label color='blue'>
                UX design
            </Label>
            <Label>
                other skill 1
            </Label>
            <Label>
                other skill 2
            </Label>
            <Label>
                other skill 3
            </Label>
            <Label>
                other skill 4
            </Label>
            <Label>
                other skill 5
            </Label>
            <Label>
                other skill 6
            </Label>
        </Grid>
      </div>
    );
  }
}

export default Skill;