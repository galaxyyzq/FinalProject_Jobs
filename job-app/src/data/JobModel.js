import {NUMBER_JOBS, NUMBER_SKILLS, 
	API_JOBS, API_JOB_SEARCH, API_SKILL_SEARCH, 
	SEARCH_FAILURE, API_JOB_RELATED_SKILLS, API_SKILLS, 
  API_SKILLS_RELATED_JOBS, API_JOB_ID, API_SKILL_ID, FETCH_DONE} from './DefinedData'

// const this.promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('async'), 1000);
//   });

const JobModel = function () {
  let fetchCurrent = []

  this.getJobId = (uuid) => {
    return search(API_JOB_ID + uuid)
  }

  this.getJobs = () => {
  	return search(API_JOBS + NUMBER_JOBS)
  }

  this.searchJob = (keyWord) => {
  	return search(API_JOB_SEARCH+keyWord)
  }

  this.searchJobRelatedSkills = (uuid) => {
  	return search(API_JOB_RELATED_SKILLS.replace("%s", uuid))
  }

  this.getSkillId = (uuid) => {
    return search(API_SKILL_ID + uuid)
  }

  this.getSkills = () => {
  	return search(API_SKILLS + NUMBER_SKILLS)
  }

  this.searchSkill = (keyWord) => {
  	return search(API_SKILL_SEARCH + keyWord)
  }

  this.searchSkillRelatedJobs = (uuid) => {
    return search(API_SKILLS_RELATED_JOBS.replace("%s", uuid))
  }

  // API Helper methods
  const search = (url) => {
    if(fetchCurrent.indexOf(url) !== -1){
      return new Promise(function(resolve, reject)
      {
        resolve(FETCH_DONE);
      });
    } else {
      fetchCurrent.push(url)
      // console.log(url)
      return fetch(url, { 'headers': {'Accept': 'application/json'}})
        .then(processResponse)
        .catch(handleError)
    }
  }

  const processResponse = (response) => {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = (error) => {
  	if (error.status === 404) {
  	  console.error('404')
  	  return SEARCH_FAILURE
  	}
    // if (error.json) {
    //   error.json().then(error => {
    //     console.error('Error:', error.message || error)
    //   })
    // } 
    else {
      console.error('API Error:', error.message || error)
      return SEARCH_FAILURE
    }
  }
};

export const modelInstance = new JobModel();