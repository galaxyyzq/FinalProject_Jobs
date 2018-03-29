import React, { Component } from 'react';
// import './SelectedSkills.css';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Header">
        <div>LOGO</div>
       	<Link to="/history">
          <button>History</button>
        </Link>
      </div>
    );
  }
}

export default Header;