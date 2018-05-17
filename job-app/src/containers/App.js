import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from '../data/JobModel';
import HomePage from './HomePage';
import JobPage from './JobPage';
import SkillPage from './SkillPage';
import CloudWordPage from './CloudWordPage';
import {getDB, getUserDB, addUserDB, updateUserDB, firebaseAuth} from '../javascript/firebase'
import { loginWithGoogle } from '../javascript/models/auth'
import {STATUS_INITAL, STATUS_LOADING, STATUS_LOADED, 
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, FETCH_DONE, 
  DEFAULT_FIREBASE_AUTH_KEY, DEFAULT_APP_TOKEN_KEY} from '../data/DefinedData'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyWord: "",
      errorMessage: "",
      jobs: [],
      skills: [],
      skillJobs: [],
      selected: [],
      relatedSkills: {},
      relatedJobs: {},
      jobPics: {},
      history: [],
      user: null
    }
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this)
  }

  componentWillMount() {
    /**
     * We have appToken relevant for our backend API
     */
    if (localStorage.getItem(DEFAULT_APP_TOKEN_KEY)) {
        // console.log(localStorage.getItem(DEFAULT_APP_TOKEN_KEY))
        var uid = localStorage.getItem(DEFAULT_APP_TOKEN_KEY)
        getUserDB(uid).then(data=>{
          if(data.val()){
            console.log(data.val())
            var history = JSON.parse(data.val().history)
            this.setState({
              user: JSON.parse(data.val().user),
              history: history
            })
            // fetch history data
            history.map(url =>{
              var [type, uuid] = url.split("/")
              if(type === "job") this.handlJobId(uuid)
              else this.handlSkillId(uuid)
            })
          }
        })
        return;
    }

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
          // console.log("User signed in: ", JSON.stringify(user));
          localStorage.removeItem(DEFAULT_FIREBASE_AUTH_KEY);

          localStorage.setItem(DEFAULT_APP_TOKEN_KEY, user.uid);
          this.setState({
            user: user
          })
          addUserDB(user.uid, user.displayName, JSON.stringify(user))
      }
    });
  }

  componentDidMount() {
    modelInstance.getJobs().then(data => {
      this.setState({
        jobs: data
      })
    }).catch(msg => {
      console.log("fetch failed")
    })
    // get skills
    modelInstance.getSkills().then(data => {
      this.setState({
        skills: data
      })
    }).catch(msg => {
      console.log("fetch failed")
    })
    // get skill jobs
    modelInstance.getSkillJobs().then(data => {
      this.setState({
        skillJobs: data
      })
    }).catch(msg => {
      console.log("fetch failed")
    })
  }

  handleSearch = keyWord => {
    this.setState({
      keyWord: keyWord
    })
  }

  handlJobId = uuid => {
    modelInstance.getJobId(uuid).then(data => {
      if(data !== FETCH_DONE && this.state.jobs.filter(job => job.uuid === uuid).length === 0){
          this.setState(prevState => ({
              // status: STATUS_LOADED,
              jobs: [...prevState.jobs, data]
          }))

        }
      }).catch(msg => {
        console.log("fetch failed")
      })
  }

  handleRelatedSkills = uuid => {
    this.handlJobId(uuid)
    modelInstance.searchJobRelatedSkills(uuid).then(data => {
      if(data !== FETCH_DONE && !( uuid in this.state.relatedSkills)){
        this.setState(prevState => ({
            relatedSkills: {
                ...prevState.relatedSkills,
                [uuid]: data.skills
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          relatedSkills: {
              ...prevState.relatedSkills,
              [uuid]: []
          }
      }))
    })
  }

  handlSkillId = uuid => {
    modelInstance.getSkillId(uuid).then(data => {
      if(data !== FETCH_DONE && this.state.skills.filter(skill => skill.uuid === uuid).length === 0){
        this.setState(prevState => ({
            // status: STATUS_LOADED,
            skills: [...prevState.skills, data]
        }))
      }
      }).catch(msg => {
        console.log("fetch failed")
      })
  }

  handleRelatedJobs = uuid => {
    this.handlSkillId(uuid)
    modelInstance.searchSkillRelatedJobs(uuid).then(data => {
      if(data !== FETCH_DONE && !( uuid in this.state.relatedJobs)){
        this.setState(prevState => ({
            relatedJobs: {
                ...prevState.relatedJobs,
                [uuid]: data.jobs
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          relatedJobs: {
              ...prevState.relatedJobs,
              [uuid]: []
          }
      }))
    })
  }

  handleSelectSkill = uuid => {
    this.handleRelatedJobs(uuid)
    if(this.state.selected.indexOf(uuid) !== -1){
      var array = [...this.state.selected]
      var index = array.indexOf(uuid)
      array.splice(index, 1);
      this.setState({selected: array});
    } else {
      this.setState(prevState => ({
          selected: [
              ...prevState.selected,
              uuid
          ]
      }))
    }
  }

  handleSelectSwap = (uuid1, uuid2) => {
    var index1 = this.state.selected.indexOf(uuid1)
    var index2 = this.state.selected.indexOf(uuid2)
    var array = [...this.state.selected]
    array[index1] = uuid2
    array[index2] = uuid1
    this.setState({selected: array});
  }

  handleJobPic = (uuid, jobname) => {
    modelInstance.getPicJob(jobname).then(data => {
      if(data !== FETCH_DONE && !( uuid in this.state.jobPics) && data.results[0] !== undefined){
         this.setState(prevState => ({
             // status: STATUS_LOADED,
             jobPics: {...prevState.jobPics, [uuid]: {"regular": data.results[0].urls.regular, "small": data.results[0].urls.small}}
         }))

       }
      }).catch(msg => {
        console.log("fetch failed")
      })
  }

  handleHistory = (uuid) => {
    if(this.state.history.indexOf(uuid) === -1){
      this.setState(prevState => ({
        history: [...prevState.history, uuid]
      }))
      if(this.state.user){
        updateUserDB(this.state.user.uid, this.state.user.displayName,
          JSON.stringify(this.state.user), JSON.stringify(this.state.history))
      }
    }
  }

  handleGoogleLogin() {
    loginWithGoogle().catch(function (error) {
            alert(error);
            localStorage.removeItem(DEFAULT_FIREBASE_AUTH_KEY);
        });
    localStorage.setItem(DEFAULT_FIREBASE_AUTH_KEY, "1");
  }

  render() {
    const {keyWord, jobs, skills, selected, relatedSkills, relatedJobs, skillJobs,
          jobPics, user, history} = this.state
    return (
      <div className="App">
          <Route exact path="/"
            render={(...props) => <HomePage {...props}
                                    jobs={jobs} 
                                    skills={skills} 
                                    selected={selected}
                                    value={keyWord}
                                    jobPics={jobPics}
                                    relatedSkills={relatedSkills}
                                    relatedJobs={relatedJobs}
                                    skillJobs={skillJobs}
                                    user={user}
                                    onSearch={this.handleSearch} 
                                    onRelatedSkills={this.handleRelatedSkills}
                                    onSelect={this.handleSelectSkill}
                                    onJobPic={this.handleJobPic}
                                    onSelectSwap={this.handleSelectSwap}
                                    onLogin={this.handleGoogleLogin}
                                    />} />
          <Route path="/job/:uuid" 
            render={(props) => <JobPage {...props} 
                                  jobs={jobs} 
                                  relatedSkills={relatedSkills}
                                  jobPics={jobPics}
                                  user={user}
                                  onRelatedSkills={this.handleRelatedSkills} 
                                  onRelatedJobs={this.handleRelatedJobs}
                                  onSkillId={this.handlSkillId} 
                                  onJobPic={this.handleJobPic}
                                  onHistory={this.handleHistory}
                                  onLogin={this.handleGoogleLogin}
                                  />}/>
          <Route path="/skill/:uuid" 
            render={(props) => <SkillPage {...props} 
                                  skills={skills} 
                                  relatedJobs={relatedJobs}
                                  user={user}
                                  onRelatedSkills={this.handleRelatedSkills}
                                  onRelatedJobs={this.handleRelatedJobs} 
                                  onJobId={this.handlJobId}
                                  onHistory={this.handleHistory}
                                  onLogin={this.handleGoogleLogin}
                                  />}/>
          <Route path="/history" 
            render={(props) => <CloudWordPage {...props}
                                  history={history} 
                                  skills={skills} 
                                  jobs={jobs} 
                                  relatedSkills={relatedSkills}
                                  user={user}
                                  onRelatedSkills={this.handleRelatedSkills}
                                  jobPics={jobPics}
                                  onRelatedJobs={this.handleRelatedJobs}
                                  onSkillId={this.handlSkillId} 
                                  onJobPic={this.handleJobPic}
                                  onHistory={this.handleHistory}
                                  onLogin={this.handleGoogleLogin}
                                  />}/>
                
       
      </div>
    );
  }
}

export default App
