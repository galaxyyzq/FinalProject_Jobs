import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from '../data/JobModel';
import HomePage from './HomePage';
import JobPage from './JobPage';
import SkillPage from './SkillPage';
import CloudWordPage from './CloudWordPage';
import {getDB, getUserDB, addUserDB, firebaseAuth} from '../javascript/firebase'
import { loginWithGoogle } from '../javascript/models/auth'
import {STATUS_INITAL, STATUS_LOADING, STATUS_LOADED, 
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, FETCH_DONE, 
  DEFAULT_FIREBASE_AUTH_KEY, DEFAULT_APP_TOKEN_KEY} from '../data/DefinedData'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // status: STATUS_INITAL,
      keyWord: "",
      errorMessage: "",
      jobs: [],
      skills: [],
      skillJobs: [],
      selected: [],
      relatedSkills: {},
      relatedJobs: {},
      jobRelatedJobs: {},
      skillRelatedSkills: {},
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
        console.log(localStorage.getItem(DEFAULT_APP_TOKEN_KEY))
        var uid = localStorage.getItem(DEFAULT_APP_TOKEN_KEY)
        getUserDB(uid).then(data=>{
          var user = JSON.parse(data.val().user)
          this.setState({
            user: user
          })
        })
        return;
    }

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
          console.log("User signed in: ", JSON.stringify(user));
          localStorage.removeItem(DEFAULT_FIREBASE_AUTH_KEY);

          // here you could authenticate with you web server to get the
          // application specific token so that you do not have to
          // authenticate with firebase every time a user logs in
          localStorage.setItem(DEFAULT_APP_TOKEN_KEY, user.uid);
          this.setState({
            user: user
          })
          addUserDB(user.uid, user.displayName, JSON.stringify(user))
          // store the token
          // this.props.history.push("/app/home")
      }
    });
  }

  componentDidMount() {
    // console.log(getDB())
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
    // get jobs
    // modelInstance.searchJob(defaultKeyWord).then(data => {
    //   data.pop()
    //   this.setState({
    //     status: STATUS_LOADED,
    //     jobs: data
    //   })
    // }).catch(msg => {
    //   this.setState({
    //     status: STATUS_LOADING
    //   })
    // })
    // // get skills
    // modelInstance.searchSkill(defaultKeyWord).then(data => {
    //   data.pop()
    //   this.setState({
    //     status: STATUS_LOADED,
    //     skills: data
    //   })
    //   // prevent the relatedJobs not exists
    //   // data.map(skill => this.handleRelatedJobs(skill.uuid))
    // }).catch(msg => {
    //   this.setState({
    //     status: STATUS_LOADING
    //   })
    // })
  }

  // handleDismissClick = e => {
  //   this.props.resetErrorMessage()
  //   e.preventDefault()
  // }

  handleSearch = keyWord => {
    this.setState({
      // status: SEARCH_REQUEST,
      keyWord: keyWord
    })
    // console.log(addTest(keyWord))
    // search job
    // if(keyWord.length > 0){
      // modelInstance.searchJob(keyWord).then(data => {
      //   if(data !== FETCH_DONE && data !== SEARCH_FAILURE){

      //     this.setState(prevState => ({
      //       status: SEARCH_SUCCESS,
      //       jobs: [...prevState.jobs, ...data]
      //     }))
      //   }
      // }).catch(msg => {
      //   this.setState({
      //     status: SEARCH_FAILURE
      //   })
      // })

      // search skill
      // modelInstance.searchSkill(keyWord).then(data => {
      //   // console.log(data)
      //   if(data !== FETCH_DONE && data !== SEARCH_FAILURE){
      //     this.setState(prevState => ({
      //       status: SEARCH_SUCCESS,
      //       skills: [...prevState.skills, ...data],
      //       selected: []
      //     }))
      //   }
      //   // prevent the relatedJobs not exists
      //   data.map(skill => this.handleRelatedJobs(skill.uuid))
      // }).catch(msg => {
      //   this.setState({
      //     status: SEARCH_FAILURE
      //   })
      // })
    // }
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
            // status: STATUS_LOADED,
            relatedSkills: {
                ...prevState.relatedSkills,
                [uuid]: data.skills
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          // status: STATUS_LOADED,
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
            // status: STATUS_LOADED,
            jobRelatedJobs: {
                ...prevState.jobRelatedJobs,
                [uuid]: data.related_job_titles
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          // status: STATUS_LOADED,
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
      if(data !== FETCH_DONE && !( uuid in this.state.relatedJobs)){
        this.setState(prevState => ({
            // status: STATUS_LOADED,
            relatedJobs: {
                ...prevState.relatedJobs,
                [uuid]: data.jobs
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          // status: STATUS_LOADED,
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
            // status: STATUS_LOADED,
            skillRelatedSkills: {
                ...prevState.skillRelatedSkills,
                [uuid]: data.skills
            }
        }))
      }
    }).catch(msg => {
      this.setState(prevState => ({
          // status: STATUS_LOADED,
          skillRelatedSkills: {
              ...prevState.skillRelatedSkills,
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
       // this.setState({
       //      status: STATUS_LOADED,
       // })
      })
  }

  handleHistory = (uuid) => {
    if(this.state.history.indexOf(uuid) === -1){
      this.setState(prevState => ({
        history: [...prevState.history, uuid]
      }))
    }
  }

  handleGoogleLogin() {
    loginWithGoogle().then(data=>{
          console.log(data)
        })
        .catch(function (error) {
            alert(error);
            localStorage.removeItem(DEFAULT_FIREBASE_AUTH_KEY);
        });
    localStorage.setItem(DEFAULT_FIREBASE_AUTH_KEY, "1");
  }

  handleUser = (user) => {
    localStorage.setItem("")
    this.setState({
      user: user
    })
  }
  // renderErrorMessage() {
  //   const { errorMessage } = this.state
  //   if (!errorMessage) {
  //     return null
  //   }

  //   return (
  //     <p style={{ backgroundColor: '#e99', padding: 10 }}>
  //       <b>{errorMessage}</b>
  //       {' '}
  //       <button onClick={this.handleDismissClick}>
  //         Dismiss
  //       </button>
  //     </p>
  //   )
  // }

  render() {
    const {keyWord, jobs, skills, selected, relatedSkills, relatedJobs, skillJobs, 
      jobRelatedJobs, skillRelatedSkills, jobPics, user} = this.state
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
                                    onRelatedSkill={this.handleRelatedSkills}
                                    onSelect={this.handleSelectSkill}
                                    onJobPic={this.handleJobPic}
                                    onSelectSwap={this.handleSelectSwap}
                                    onLogin={this.handleGoogleLogin}
                                    />} />
          <Route path="/job/:uuid" 
            render={(props) => <JobPage {...props} 
                                  jobs={jobs} 
                                  relatedSkills={relatedSkills} 
                                  jobRelatedJobs={jobRelatedJobs}
                                  jobPics={jobPics}
                                  user={user}
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
                                  skillRelatedSkills={skillRelatedSkills}
                                  user={user}
                                  onRelatedSkills={this.handleRelatedSkills} 
                                  onJobId={this.handlJobId}
                                  onHistory={this.handleHistory}
                                  onLogin={this.handleGoogleLogin}
                                  />}/>
          <Route path="/history" render={() => <CloudWordPage/>}/>
       
      </div>
    );
  }
}

export default App
