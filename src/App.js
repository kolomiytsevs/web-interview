import React, { Component } from 'react'
import axios from 'axios'

import { API_ENDPOINT } from './config'

import Header from './Header'
import Spinner from './Components/Spinner'

import './App.scss'
import Body from './Body'

class App extends Component {
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
    return (
      <div className="app">
        <Header />
        {this.state.loading && <Spinner />}
        {this.state.error ? (
          <p>We are current experiencing problems, please try again later.</p>
        ) : (
          <Body
            userId={this.state.userId}
            user={this.state.user}
            availableSlots={this.state.availableSlots}
          />
        )}
      </div>
    )
  }
}

export default App
