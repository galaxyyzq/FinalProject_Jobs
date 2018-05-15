import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom'
import {init as firebaseInit} from './javascript/firebase'

export default class Root extends Component {
  constructor(props) {
    super(props)
    firebaseInit()
    document.getElementById("trends-widget-1").style.display = "none";
  }

  render() {
    return (
      <BrowserRouter>
        <App />
    </BrowserRouter>
    )
  }
}

ReactDOM.render((
    <Root/>
), document.getElementById('root'));