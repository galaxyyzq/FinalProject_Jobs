import React, { Component } from 'react';
import { Button, Header, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { loginWithGoogle } from '../javascript/models/auth'
// import { firebaseAuth } from '../javascript/firebase'
// import {DEFAULT_FIREBASE_AUTH_KEY, DEFAULT_APP_TOKEN_KEY} from '../data/DefinedData'


class PageHeader extends Component {

  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         user: null
  //     };
  //     this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  // }

  // handleGoogleLogin() {
  //     loginWithGoogle()
  //         .catch(function (error) {
  //             alert(error);
  //             localStorage.removeItem(DEFAULT_FIREBASE_AUTH_KEY);
  //         });
  //     localStorage.setItem(DEFAULT_FIREBASE_AUTH_KEY, "1");
  // }

  // componentWillMount() {
  //     /**
  //      * We have appToken relevant for our backend API
  //      */
  //     if (localStorage.getItem(DEFAULT_APP_TOKEN_KEY)) {
  //         console.log(localStorage.getItem(DEFAULT_APP_TOKEN_KEY))
  //         // this.props.history.push("/app/home");
  //         return;
  //     }

  //     firebaseAuth().onAuthStateChanged(user => {
  //       if (user) {
  //           console.log("User signed in: ", JSON.stringify(user));
  //           console.log(user.displayName)
  //           localStorage.removeItem(DEFAULT_FIREBASE_AUTH_KEY);

  //           // here you could authenticate with you web server to get the
  //           // application specific token so that you do not have to
  //           // authenticate with firebase every time a user logs in
  //           localStorage.setItem(DEFAULT_APP_TOKEN_KEY, user.name);

  //           // store the token
  //           // this.props.history.push("/app/home")
  //       }
  //     });
  // }


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
