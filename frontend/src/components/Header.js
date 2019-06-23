//import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

import React, { Component } from 'react';

// import { Container } from './styles';

export default class Header extends Component {
  handleRightClick = e => {
    e.preventDefault();
  };

  render() {
    // every time you want to add a javascript code inside a JSX, you can do it by adding it inside {}
    return (
      <header id="main-header">
        <div className="header-content">
          <Link to="/">
            <img
              src={logo}
              alt="MyInsta"
              onContextMenu={e => this.handleRightClick(e)}
            />
          </Link>
          <Link to="/new">
            <img
              src={camera}
              alt="Publish"
              onContextMenu={e => this.handleRightClick(e)}
            />
          </Link>
        </div>
      </header>
    );
  }
}

/*
export default function Header() {
  // every time you want to add a javascript code inside a JSX, you can do it by adding it inside {}
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="MyInsta" />
        </Link>
        <Link to="/new">
          <img src={camera} alt="Publish" />
        </Link>
      </div>
    </header>
  );
}
*/
