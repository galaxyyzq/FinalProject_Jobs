import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import logo from '../logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import { modelInstance } from '../data/JobModel';
import HomePage from './HomePage';
import JobPage from './JobPage';
import SkillPage from './SkillPage';
import CloudWordPage from './CloudWordPage';
import {STATUS_INITAL, STATUS_LOADING, STATUS_LOADED, 
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE} from '../data/DefinedData'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: STATUS_INITAL,
      keyWord: "",
      errorMessage: "",
      jobs: [],
      skills: [],
      selected: [],
      relatedSkills: {},
      relatedJobs: {}
    }
  }

  componentDidMount() {
    // get jobs
    modelInstance.getJobs().then(data => {
      data.pop()
      this.setState({
        status: STATUS_LOADED,
        jobs: data
      })
    }).catch(msg => {
      this.setState({
        status: STATUS_LOADING
      })
    })
    // get skills
    modelInstance.getSkills().then(data => {
      data.pop()
      this.setState({
        status: STATUS_LOADED,
        skills: data
      })
    }).catch(msg => {
      this.setState({
        status: STATUS_LOADING
      })
    })
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleSearch = keyWord => {
    this.setState({
      status: SEARCH_REQUEST,
      keyWord: keyWord
    })
    // search job
    modelInstance.searchJob(keyWord).then(data => {
      this.setState({
        status: SEARCH_SUCCESS,
        keyWord: "",
        jobs: data
      })
    }).catch(msg => {
      this.setState({
        status: SEARCH_FAILURE
      })
    })
    // search skill
    modelInstance.searchSkill(keyWord).then(data => {
      console.log(data)
      this.setState({
        status: SEARCH_SUCCESS,
        keyWord: "",
        skills: data
      })
    }).catch(msg => {
      this.setState({
        status: SEARCH_FAILURE
      })
    })
  }

  handlJobId = uuid => {
    const job = this.state.jobs.filter(job => job.uuid === uuid)
    if(job.length === 0){
      modelInstance.getJobId(uuid).then(data => {
          this.setState(prevState => ({
              status: STATUS_LOADED,
              jobs: [...prevState.jobs, data]
          }))
        }).catch(msg => {
          this.setState({
              status: STATUS_LOADED,
          })
        })
    }
  }

  handleRelatedSkills = uuid => {
    this.handlJobId(uuid)
    if(!( uuid in this.state.relatedSkills)){
      modelInstance.searchJobRelatedSkills(uuid).then(data => {
        console.log(uuid, data)
        this.setState(prevState => ({
            status: STATUS_LOADED,
            relatedSkills: {
                ...prevState.relatedSkills,
                [uuid]: data.skills
            }
        }))
      }).catch(msg => {
        this.setState(prevState => ({
            status: STATUS_LOADED,
            relatedSkills: {
                ...prevState.relatedSkills,
                [uuid]: []
            }
        }))
      })
    }
  }

  handlSkillId = uuid => {
    const skill = this.state.skills.filter(skill => skill.uuid === uuid)
    if(skill.length === 0){
      modelInstance.getSkillId(uuid).then(data => {
          this.setState(prevState => ({
              status: STATUS_LOADED,
              skills: [...prevState.skills, data]
          }))
        }).catch(msg => {
          this.setState({
              status: STATUS_LOADED,
          })
        })
    }
  }

  handleRelatedJobs = uuid => {
    this.handlSkillId(uuid)
    if(!( uuid in this.state.relatedJobs)){
      modelInstance.searchSkillRelatedJobs(uuid).then(data => {
        console.log(uuid, data)
        this.setState(prevState => ({
            status: STATUS_LOADED,
            relatedJobs: {
                ...prevState.relatedJobs,
                [uuid]: data.jobs
            }
        }))
      }).catch(msg => {
        this.setState(prevState => ({
            status: STATUS_LOADED,
            relatedJobs: {
                ...prevState.relatedJobs,
                [uuid]: []
            }
        }))
      })
    }
  }

  handleSelectSkill = uuid => {
    console.log(uuid)
  }

  renderErrorMessage() {
    const { errorMessage } = this.state
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <button onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
  }

  render() {
    const {keyWord, jobs, skills, selected, relatedSkills, relatedJobs} = this.state
    return (
      <div className="App">
          <Route exact path="/"
            render={(...props) => <HomePage {...props}
                                    jobs={jobs} 
                                    skills={skills} 
                                    selected={selected}
                                    value={keyWord} 
                                    onSearch={this.handleSearch} 
                                    onRelatedSkill={this.handleRelatedSkills}
                                    relatedSkills={relatedSkills}
                                    onSelect={this.handleSelectSkill} 
                                    />} />
          <Route path="/job/:uuid" 
            render={(props) => <JobPage {...props} 
                                  jobs={jobs} 
                                  relatedSkills={relatedSkills} 
                                  onRelatedJobs={this.handleRelatedJobs}
                                  onSkillId={this.handlSkillId} 
                                  />}/>
          <Route path="/skill/:uuid" 
            render={(props) => <SkillPage {...props} 
                                  skills={skills} 
                                  relatedJobs={relatedJobs} 
                                  onRelatedSkills={this.handleRelatedSkills} 
                                  onJobId={this.handlJobId}
                                  />}/>
          <Route path="/history" render={() => <CloudWordPage/>}/>
       
      </div>
    );
  }
}

export default App
