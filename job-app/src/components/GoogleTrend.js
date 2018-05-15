import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DEFAULT_GOOGLE_TREND } from '../data/DefinedData'

class GoogleTrend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
    document.getElementById("trends-widget-1").style.display = "block";
  }

  componentDidUpdate() {
    if(this.props.keyWord !== "loading..." && !this.state.loaded){
      var url = document.getElementById("trends-widget-1").src.replace("loading...", this.props.keyWord)
      document.getElementById("trends-widget-1").src = url
      this.setState({
        loaded: true
      })
    }
  }

  componentWillUnmount() {
    document.getElementById("trends-widget-1").src = DEFAULT_GOOGLE_TREND
    document.getElementById("trends-widget-1").style.display = "none";
  }

  render() {
  	return (
      <div className="GoogleTrend" id="trend">
      </div>
    );
  }
}

export default GoogleTrend;