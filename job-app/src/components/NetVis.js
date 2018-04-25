import React, { Component } from 'react';
// import './JobList.css';
import PropTypes from 'prop-types'

class NetVis extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    relatedData: PropTypes.object.isRequired
  }

  render() {
  	const {data, relatedData} = this.props
    return (
      <div className="NetVis">
       	
      </div>
    );
  }
}

export default NetVis;