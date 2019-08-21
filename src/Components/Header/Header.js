import React, { Fragment } from 'react'

import logo from '../../logo.png'
import { Menu } from '../../svgIcons'

import './Header.scss'

const Header = () => (
  <Fragment>
    <div className="app-header">
      <Menu />
      <img src={logo} className="app-logo" alt="Babylon Health" />
    </div>
    <h2 className="h6">New appointment</h2>
  </Fragment>
)

export default Header
