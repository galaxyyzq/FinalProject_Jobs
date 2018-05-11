import React, { Component } from 'react';
import { Button, Grid, Search, Header, Label } from 'semantic-ui-react'
import _ from 'lodash'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class SearchBar extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.props.value) {
  //     this.setInputValue(nextProps.value)
  //   }
  // }

  // getInputValue = () => {
  //   return this.input.value
  // }

  // setInputValue = (val) => {
  //   this.input.value = val
  // }

  // handleKeyUp = (e) => {
  //   if (e.keyCode === 13) {
  //     this.handleGoClick()
  //   }
  // }

  // handleGoClick = () => {
  //   this.props.onSearch(this.getInputValue())
  // }

  // resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  // handleResultSelect = (e, { result }) => console.log(result.title)

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
              loading={value.length != 0 && results.length===0}
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

  // render() {
  //   return (
  //     <div className="SearchBar" style={{padding: '3em 3em' }}>
  //       <Grid>
  //         <Grid.Column width={16}>
  //           <div className="ui search SearchInput">
  //               <input className="prompt"
  //                      type="text"
  //                      placeholder="search jobs..."
  //                      ref={(input) => this.input = input}
  //                      defaultValue={this.props.value}
  //                      onKeyUp={this.handleKeyUp}/>
  //               <div className="results"></div>
  //               <div className="SearchButton">
  //               <Link to="/">
  //               <Button  color='yellow' onClick={this.handleGoClick}>
  //                 search
  //               </Button>
  //               </Link>
  //               </div>
  //           </div>
  //         </Grid.Column>
  //       </Grid>

  //     </div>
  //   );
  // }
}

export default SearchBar;
