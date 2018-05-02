import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class GoogleTrend extends Component {

  // componentDidUpdate() {
  //   const that = this
  //   const keyword = this.props.keyword
  //   console.log(this.refs)
  //   const script = document.createElement("script")
  //   script.src = "https://ssl.gstatic.com/trends_nrtr/1386_RC02/embed_loader.js"
  //   script.async = true

  //   ReactDOM.findDOMNode(this.refs.trendsWrapper1).appendChild(script)
    
  //   script.onload = function () {
  //     // trends.embed.renderExploreWidgetTo(ReactDOM.findDOMNode(that.refs.trendsWrapper1), "TIMESERIES", {"comparisonItem":[{"keyword":keyword,"geo":"","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"q=%2Fm%2F0rfgxy2","guestPath":"https://www.google.co.uk:443/trends/embed/"})
  //     console.log("here")
  //     // trends.embed.renderExploreWidget(ReactDOM.findDOMNode(that.refs.trendsWrapper1), "TIMESERIES", {"comparisonItem":[{"keyword":this.props.keyword,"geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=trump&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"})
  //   }
  
  // }

  render() {
  	// trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":this.props.keyword,"geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=trump&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"})
    return (
      <div className="GoogleTrend">
      </div>
    );
  }
}

export default GoogleTrend;