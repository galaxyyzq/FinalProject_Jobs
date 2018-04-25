import React, { Component } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PageHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'Job Jungle',
    }
  }

  render() {
    return (

          <div className="Header">
                <Link to="/">
                  <Header floated='left'>
                    <img src="img/logo.svg" style={{width: 150+'px'}}></img>
                  </Header>
                </Link>
                <Header floated='right'>
                    <Link to="/history">
                      <Button size='small' basic color='teal'>History</Button>
                    </Link>
                </Header>
          </div>

    );
  }
}

export default PageHeader;
