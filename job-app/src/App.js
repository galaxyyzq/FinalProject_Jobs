import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/JobModel';
import HomePage from './HomePage/HomePage';
import JobPage from './JobPage/JobPage';
import SkillPage from './SkillPage/SkillPage';
import CloudWordPage from './CloudWordPage/CloudWordPage';


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
          <h1 className="App-title">{this.state.title}</h1>
          
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
