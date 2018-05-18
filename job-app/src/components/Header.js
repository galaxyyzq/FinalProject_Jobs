import React, { Component } from 'react';
import { Button, Header, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PageHeader extends Component {


  render() {
    var login = (<Button color='google plus' onClick={this.props.onLogin}>
                  <Icon name='google plus' /> Google Plus
                </Button>)
    if(this.props.user){
      login = (<Button color='google plus' active={false}>
                  <Icon name='google plus' />{this.props.user.displayName}
                </Button>)
    }
    return (

          <div className="Header">
                <Link to="/">
                  <Header floated='left'>
                    <Image src="https://yipeitu.github.io/FinalProject_Jobs/job-app/public/img/logo.svg" style={{width: 150+'px'}}/>
                  </Header>
                </Link>

                <Header floated='right'>
                  {login}
                  <Link to="/history">
                    <Button size='small' basic color='teal'>History</Button>
                  </Link>
                </Header>
          </div>

    );
  }
}

export default PageHeader;
