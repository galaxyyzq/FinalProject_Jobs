import React, { Component } from 'react';
import {  Grid, Search, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class SearchBar extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  handleSearchChange = (e, { value }) => {
    this.props.onSearch(value)

    setTimeout(() => {
      if (this.props.value.length < 1) return this.props.onSearch("")
    }, 300)
  }

  render() {
    const { jobs, skills, value } = this.props
    var results = []
    if(value.length>0){
      results = [...jobs, ...skills]
      for(var i = 0; i < results.length; i++){
        results[i].title = "name" in results[i]? results[i].name:results[i].title
        results[i].type = "name" in results[i]? "skill":"job"
        results[i].key = results[i].uuid+i
      }
    }
    return (
      <div className="SearchBar" style={{padding: '3em 3em' }}>
        <Grid>
          <Grid.Column width={16}>
            <Search
              size="huge"
              loading={value.length !== 0 && results.length===0}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={results}
              value={value}
              resultRenderer={
                ({ type, title, uuid }) =>
                  <Link to={"/"+type+"/"+uuid}>
                  <Label color={type==="job"? "green":"blue"} content={title} />
                  </Link>
                }
            />
          </Grid.Column>
        </Grid>

      </div>
    );
  }
}

export default SearchBar;
