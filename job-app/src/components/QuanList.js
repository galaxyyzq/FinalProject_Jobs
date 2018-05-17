import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NUMBER_QUANLIST } from '../data/DefinedData'
import { Grid, Progress} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class QuanList extends Component {
 
  static propTypes = {
    name: PropTypes.string.isRequired,
    // data: PropTypes.array.isRequired,
    fetchFunc: PropTypes.func.isRequired
  }

  renderItem = (url, uuid, name, value) => (
    <Link to={"/"+url+"/"+uuid} key={uuid}>
      <Grid columns={2} stackable>
        <Grid.Column widescreen={7}>
          <p className="QuanListName">{name}</p>
        </Grid.Column>
        <Grid.Column widescreen={8}>
          <Progress progress='value' color='teal' value={value.toFixed(2)} size='medium' active/>
        </Grid.Column>
      </Grid>
    </Link>
  )

  render() {
    const {name, data, fetchFunc} = this.props
    var indents = []
    for(var i = 0; i < NUMBER_QUANLIST; i++){
      if(data === undefined){
        indents = (<p className="loading">loading</p>)
        break
      }
      var url = "",
          uuid = "",
          currentName = "",
          value = 0
      // console.log(data[i])
      switch(name){
        case "Skill Importance":
          url = "skill"
          uuid = data[i].skill_uuid
          currentName = data[i].skill_name
          value = (data[i].importance/10)*100
          break;

        case "Skill Level":
          url = "skill"
          uuid = data[i].skill_uuid
          currentName = data[i].skill_name
          value = (data[i].level/10)*100
          break;

        case "Related Jobs Importance":
          url = "job"
          uuid = data[i].job_uuid
          currentName = data[i].job_title
          value = (data[i].importance/10)*100
          break;

        case "Related Jobs Level":
          url = "job"
          uuid = data[i].job_uuid
          currentName = data[i].job_title
          value = (data[i].level/10)*100
          break;

        default:
          break;
      }
      indents.push(this.renderItem(url, uuid, currentName, value))
      fetchFunc(uuid)
    }

    return (
      <div className="QuanList">
       	<h4 className="QuanListTitle">{name}</h4>
        <hr/>
        {indents}
      </div>
    );
  }
}

export default QuanList;
