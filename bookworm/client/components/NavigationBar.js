import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Bookworm</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/signup">Sign up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
