import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { API_ENDPOINT } from './config'

import Header from './Components/Header/Header'
import Spinner from './Components/Spinner'

import './App.scss'
import Body from './Body'

class AppData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      user: null,
      availableSlots: [],
      error: null,
      loading: false,
    }

    this.getUser = this.getUser.bind(this)
    this.getAvailableAppointments = this.getAvailableAppointments.bind(this)
    this.fetchPageData = this.fetchPageData.bind(this)
  }

  componentDidMount() {
    this.fetchPageData()
  }

  fetchPageData() {
    this.setState({ loading: true })
    Promise.all([this.getAvailableAppointments(), this.getUser()])
      .then(([availableSlots, user]) => {
        availableSlots = availableSlots.data
        user = user.data
        this.setState({
          availableSlots,
          user,
          loading: false,
        })
      })
      .catch(error =>
        this.setState({
          error,
          loading: false,
        })
      )
  }

  getUser() {
    return axios.get(`${API_ENDPOINT}/users/${this.state.userId}`)
  }
  getAvailableAppointments() {
    return axios.get(`${API_ENDPOINT}/availableSlots`)
  }

  render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      userId: this.state.userId,
      user: this.state.user,
      availableSlots: this.state.availableSlots,
    })
  }
}

AppData.propTypes = {
  children: PropTypes.element,
}

export default AppData
