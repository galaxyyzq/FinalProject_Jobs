import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class SearchBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="SearchBar" style={{padding: '3em 3em' }}>
        <Grid>
                <Grid.Column width={10}>
                    <div className="ui search">
                        <input className="prompt" type="text" placeholder="search jobs..."/>
                        <div className="results"></div>
                    </div>
                </Grid.Column>
        
                <Grid.Column width={3}>
                    <Button primary as='a' size='small' >
                        search
                    </Button>
                </Grid.Column>
        </Grid>
 
      </div>
    );
  }
}

export default SearchBar;