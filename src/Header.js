import React, { Fragment } from 'react'

import logo from './logo.png'

import './Header.scss'

const Header = () => (
  <Fragment>
    <div className="app-header">
      <img src={logo} className="app-logo" alt="Babylon Health" />
    </div>
    <h2 className="h6">New appointment</h2>
  </Fragment>
)

export default Header
