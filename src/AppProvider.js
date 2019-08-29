import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { API_ENDPOINT } from './config'

import Header from './Components/Header/Header'
import Spinner from './Components/Spinner'

import './App.scss'

const AppContext = React.createContext()

class AppProvider extends Component {
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

  static Consumer = AppContext.Consumer

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
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

AppProvider.propTypes = {
  children: PropTypes.element,
}

export default AppProvider
