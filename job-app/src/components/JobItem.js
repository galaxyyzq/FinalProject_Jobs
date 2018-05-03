import React, { Component } from 'react';
import { Grid,Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types'


class JobItem extends Component {
    
    
    
  constructor() {
		super();
		this.state = {
			jobpicurl: "",
			loadingState: true
		};
	}

    
    
  componentDidMount(){
      const {job} = this.props
      var jobName = "title" in job ? job.title:job.suggestion
      var url="https://api.unsplash.com/search/photos/?page=1&per_page=5&query="+jobName+"&client_id=283a9e473f003aa495705329ca89b88cd2d81f4d4304836c9c1037a0fde8c174";
      fetch(url).then(res => res.json())
		.then(data =>{
          console.log(data)
          this.setState({ jobpicurl: data.results[0].urls.small, loadingState: false });
          console.log(this.state.jobpicurl)
      })
          .catch(err => {
				console.log('Error happened during fetching.', err);
			});
  }
    
    
    

  static propTypes = {
    job: PropTypes.object.isRequired,
    onRelatedSkill: PropTypes.func.isRequired,
    relatedSkills: PropTypes.object.isRequired
  }

  renderSkills = (index, skillName) => (
    <div key={index}>Skill{index}: {skillName}</div>
  )

  render() {
    const {job, onRelatedSkill, relatedSkills} = this.props
    var jobName = "title" in job ? job.title:job.suggestion
    
    // console.log(job.uuid, job.uuid in relatedSkills)
    var indents = [];
    if(job.uuid in relatedSkills){
      if(relatedSkills[job.uuid] === undefined || relatedSkills[job.uuid].length === 0){
        indents = "no skills to show"
      }
      else {
          for (var i = 0; i < 3; i++) {
          var skillName = relatedSkills[job.uuid][i].skill_name
          indents.push(this.renderSkills(i+1, skillName));
        }
      }
    } else {
      indents = "loading..."
      onRelatedSkill(job.uuid)
    }
      console.log(this.state.jobpicurl)
    return (
      <div className="JobItem">

        <Segment textAlign='left'>
            <Grid>
            <Grid.Row>
            <Grid.Column width={10}> 
                <h3>{jobName}</h3>
                <div>{indents}</div>
            </Grid.Column>
            <Grid.Column width={6}>  
                <img className="JobPic" src={this.state.jobpicurl}/> 
            </Grid.Column>
            </Grid.Row>
            </Grid>
        </Segment>
        
      </div>
    );
  }
}

export default JobItem;