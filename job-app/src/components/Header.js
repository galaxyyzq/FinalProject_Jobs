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
            <Segment clearing>
                <h1>{this.state.title}</h1>
                <Link to="/">
                  <Header as='h2' floated='left'>
                    LOGO: Go back
                  </Header>
                </Link>
                <Header floated='right'>
                    <Link to="/history">
                      <Button size='small'>History</Button>
                    </Link>
                </Header>
            </Segment>
          </div>

    );
  }
}

export default PageHeader;