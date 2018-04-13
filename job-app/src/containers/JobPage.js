import React, { Component } from 'react';
// import './JobPage.css';
import { Link } from 'react-router-dom';
import {
  Button, Container, Grid, Header, Icon, Item, Label, Menu, Segment, Image, Table,
} from 'semantic-ui-react'
import PageHeader from '../components/Header';
import TitleDescription from '../components/TitleDescription';
import GoogleTrend from '../components/GoogleTrend';
import QuanList from '../components/QuanList';
import NetVis from '../components/NetVis';


class JobPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="JobPage">
            <PageHeader></PageHeader>
                  <Grid columns={2} stackable>
                      <Grid.Column widescreen={11} verticalAlign='left'>
                            <div>
                              <TitleDescription></TitleDescription>
                              <GoogleTrend></GoogleTrend>
                                        <Grid columns={2} stackable>
                                          <Grid.Column>
                                            <QuanList></QuanList>
                                          </Grid.Column>
                                          <Grid.Column>
                                            <QuanList></QuanList>
                                          </Grid.Column>
                                        </Grid>    
                            </div>
                      </Grid.Column>
                      <Grid.Column widescreen={5}>
                           <Segment><Image src='../test.png' /></Segment>
                      </Grid.Column>
                   </Grid>


                <NetVis></NetVis>
      </div>
    );
  }
}

export default JobPage;