import React, { Component } from 'react';
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import JobItem from '../JobItem/JobItem';

class JobResult extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JobResult" style={{padding: '5em 5em' }}>
        <Header as='h3' textAlign='left'>Recommanded Jobs</Header>
        
    <Grid container columns={3}>
      <Grid.Column>
       	<JobItem></JobItem>
      </Grid.Column>
      <Grid.Column>
       	<JobItem></JobItem>
      </Grid.Column>
      <Grid.Column>
       	<JobItem></JobItem>
      </Grid.Column>
      <Grid.Column>
       	<JobItem></JobItem>
      </Grid.Column>
      <Grid.Column>
       	<JobItem></JobItem>
      </Grid.Column>
      <Grid.Column>
       	<JobItem></JobItem>
      </Grid.Column>
    </Grid>

      </div>
    );
  }
}

export default JobResult;