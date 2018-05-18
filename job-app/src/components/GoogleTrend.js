import React, { Component } from 'react';

class GoogleTrend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidUpdate() {
    if(this.props.keyWord && this.props.keyWord !== "loading..." && !this.state.loaded){
      var script = document.createElement("script")
      script.type = "text/javascript"
      script.innerHTML = 'trends.embed.renderExploreWidgetTo(document.getElementsByClassName("GoogleTrend")[0], "TIMESERIES", {"comparisonItem":[{"keyword":"'+this.props.keyWord+'","geo":"","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"q=%2Fm%2F0rfgxy2","guestPath":"https://www.google.co.uk:443/trends/embed/"})'
      script.async = true
      document.getElementById("root").append(script)
      this.setState({
        loaded: true
      })
    }
  }

  render() {
  	return (
      <div className="GoogleTrend">
      </div>
    );
  }
}

export default GoogleTrend;