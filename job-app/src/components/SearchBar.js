import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class SearchBar extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  getInputValue = () => {
    return this.input.value
  }

  setInputValue = (val) => {
    this.input.value = val
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  handleGoClick = () => {
    this.props.onSearch(this.getInputValue())
  }

  render() {
    return (
      <div className="SearchBar" style={{padding: '3em 3em' }}>
        <Grid>
          <Grid.Column width={10}>
            <div className="ui search">
                <input className="prompt"
                       type="text" 
                       placeholder="search jobs..."
                       ref={(input) => this.input = input}
                       defaultValue={this.props.value}
                       onKeyUp={this.handleKeyUp}/>
                <div className="results"></div>
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
              <Link to="/">
                <Button size='small' onClick={this.handleGoClick}>
                  search
                </Button>
              </Link>
          </Grid.Column>
        </Grid>
 
      </div>
    );
  }
}

export default SearchBar;
