import React, { Component } from 'react';
import {
  Button, Container, Grid, Header, Icon, Item, Label, Progress, Segment, Image, Table,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class QuanItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="QuanItem" >
                          <Grid columns={2} stackable>
                      <Grid.Column widescreen={4}>
                        <p>skill name</p>
                      </Grid.Column>
                      <Grid.Column widescreen={8}>
                        <Progress progress='value' color='teal' value={100} size='small'/>
                      </Grid.Column>
                   </Grid>
      </div>
    );
  }
}

export default QuanItem;