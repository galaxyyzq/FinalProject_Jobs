import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from '../data/JobModel';
import HomePage from './HomePage';
import JobPage from './JobPage';
import SkillPage from './SkillPage';
import CloudWordPage from './CloudWordPage';
import {STATUS_INITAL, STATUS_LOADING, STATUS_LOADED, 
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, FETCH_DONE} from '../data/DefinedData'


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
      relatedJobs: {},
      jobRelatedJobs: {},
      skillRelatedSkills: {}
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
      if(data !== FETCH_DONE && data !== SEARCH_FAILURE){

        this.setState(prevState => ({
          status: SEARCH_SUCCESS,
          jobs: [...prevState.jobs, ...data]
        }))
      }
      // this.setState({
      //   status: SEARCH_SUCCESS,
      //   keyWord: "",
      //   jobs: data
      // })
    }).catch(msg => {
      this.setState({
        status: SEARCH_FAILURE
      })
    })
    // search skill
    modelInstance.searchSkill(keyWord).then(data => {
      // console.log(data)
      if(data !== FETCH_DONE && data !== SEARCH_FAILURE){
        this.setState(prevState => ({
          status: SEARCH_SUCCESS,
          skills: [...prevState.skills, ...data]
        }))
      }
      // this.setState({
      //   status: SEARCH_SUCCESS,
      //   keyWord: "",
      //   skills: data
      // })
    }).catch(msg => {
      this.setState({
        status: SEARCH_FAILURE
      })
    })
  }

  handlJobId = uuid => {
    this.handleJobRelatedJobs(uuid)
    modelInstance.getJobId(uuid).then(data => {
      // console.log(uuid, data)
      if(data !== FETCH_DONE && this.state.jobs.filter(job => job.uuid === uuid).length === 0){
          this.setState(prevState => ({
              status: STATUS_LOADED,
              jobs: [...prevState.jobs, data]
          }))

        }
      }).catch(msg => {
        this.setState({
            status: STATUS_LOADED,
        })
      })
  }

  handleRelatedSkills = uuid => {
    this.handlJobId(uuid)
    modelInstance.searchJobRelatedSkills(uuid).then(data => {
      // console.log(uuid, data)
      if(data !== FETCH_DONE && !( uuid in this.state.relatedSkills)){
        this.setState(prevState => ({
            status: STATUS_LOADED,
            relatedSkills: {
                ...prevState.relatedSkills,
                [uuid]: data.skills
            }
        }))
      }
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

  handleJobRelatedJobs = uuid => {
    modelInstance.searchJobRelatedJobs(uuid).then(data => {
      // console.log(uuid, data)
      if(data !== FETCH_DONE && !( uuid in this.state.jobRelatedJobs)){
        this.setState(prevState => ({
            status: STATUS_LOADED,
            jobRelatedJobs: {
                ...prevState.jobRelatedJobs,
                [uuid]: data.related_job_titles
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          status: STATUS_LOADED,
          jobRelatedJobs: {
              ...prevState.jobRelatedJobs,
              [uuid]: []
          }
      }))
    })
  }

  handlSkillId = uuid => {
    this.handleSkillRelatedSkills(uuid)
    modelInstance.getSkillId(uuid).then(data => {
      // console.log(uuid, data)
      if(data !== FETCH_DONE && this.state.skills.filter(skill => skill.uuid === uuid).length === 0){
        this.setState(prevState => ({
            status: STATUS_LOADED,
            skills: [...prevState.skills, data]
        }))
      }
      }).catch(msg => {
        this.setState({
            status: STATUS_LOADED,
        })
      })
  }

  handleRelatedJobs = uuid => {
    this.handlSkillId(uuid)
    modelInstance.searchSkillRelatedJobs(uuid).then(data => {
      // console.log(uuid, data)
      if(data !== FETCH_DONE && !( uuid in this.state.relatedJobs)){
        this.setState(prevState => ({
            status: STATUS_LOADED,
            relatedJobs: {
                ...prevState.relatedJobs,
                [uuid]: data.jobs
            }
        }))
      }
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

  handleSkillRelatedSkills = uuid => {
    modelInstance.searchSkillRelatedSkills(uuid).then(data => {
      // console.log(uuid, data)
      if(data !== FETCH_DONE && !( uuid in this.state.skillRelatedSkills)){
        this.setState(prevState => ({
            status: STATUS_LOADED,
            skillRelatedSkills: {
                ...prevState.skillRelatedSkills,
                [uuid]: data.skills
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          status: STATUS_LOADED,
          skillRelatedSkills: {
              ...prevState.skillRelatedSkills,
              [uuid]: []
          }
      }))
    })
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
    const {keyWord, jobs, skills, selected, relatedSkills, relatedJobs, jobRelatedJobs, skillRelatedSkills} = this.state
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
                                  jobRelatedJobs={jobRelatedJobs}
                                  onRelatedJobs={this.handleRelatedJobs}
                                  onSkillId={this.handlSkillId} 
                                  />}/>
          <Route path="/skill/:uuid" 
            render={(props) => <SkillPage {...props} 
                                  skills={skills} 
                                  relatedJobs={relatedJobs}
                                  skillRelatedSkills={skillRelatedSkills}
                                  onRelatedSkills={this.handleRelatedSkills} 
                                  onJobId={this.handlJobId}
                                  />}/>
          <Route path="/history" render={() => <CloudWordPage/>}/>
       
      </div>
    );
  }
}

export default App
