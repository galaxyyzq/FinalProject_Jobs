import React, { Component } from 'react';
import { DEFAULT_GOOGLE_TREND } from '../data/DefinedData'

class GoogleTrend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  // componentWillMount() {
  //   document.getElementsByClassName("GoogleTrend")
  //   document.getElementById("trends-widget-1")
  // }

  componentDidUpdate() {
    if(this.props.keyWord !== "loading..." && !this.state.loaded){
      document.getElementById("trends-widget-1").style.display = "block";
      var url = document.getElementById("trends-widget-1").src.replace("loading...", this.props.keyWord)
      document.getElementById("trends-widget-1").src = url
      ////////////
      // 使用document.getElementById("trends-widget-1").style更改內容
      ////////////
      document.getElementsByClassName("GoogleTrend")[0].append(document.getElementById("trends-widget-1"))
      this.setState({
        loaded: true
      })
    }
  }

  componentWillUnmount() {
    document.getElementById("trends-widget-1").src = DEFAULT_GOOGLE_TREND
    document.getElementById("trends-widget-1").style.display = "none";
    document.getElementById("root").append(document.getElementById("trends-widget-1"))
  }

  render() {
  	return (
      <div className="GoogleTrend">
      </div>
    );
  }
}

export default GoogleTrend;