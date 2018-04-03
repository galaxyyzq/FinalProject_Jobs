import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
// import { modelInstance } from './data/JobModel';
import HomePage from './HomePage';
import JobPage from './JobPage';
import SkillPage from './SkillPage';
import CloudWordPage from './CloudWordPage';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Job Jungle',
    }
  }

  render() {
    return (
      <div className="App">       
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={HomePage}/>
          <Route path="/job/:id" render={() => <JobPage/>}/>
          <Route path="/skill/:id" render={() => <SkillPage/>}/>
          <Route path="/history" render={() => <CloudWordPage/>}/>
       
      </div>
    );
  }
}

export default App;
