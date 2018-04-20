import React, { Component } from 'react';

class GoogleTrend extends Component {

  render() {
  	// trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":this.props.keyword,"geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=trump&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"})
    return (
      <div className="GoogleTrend">
      </div>
    );
  }
}

export default GoogleTrend;