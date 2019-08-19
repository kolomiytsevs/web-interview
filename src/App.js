import React, { Component } from 'react'
import axios from 'axios'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import ConsultantSelectButton from './ConsultantSelectButton'
import AppointmentSelectButton from './AppointmentSelectButton'
import AppointmentTypeField from './AppointmentTypeField'
import NotesInputField from './NotesInputField'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      user: null,
      selectedConsultantType: 'gp',
      availableSlots: [],
      selectedAppointment: null,
      selectedAppointmentType: null,
      notes: '',
      error: null,
    }
    this.handleConsultantSelect = this.handleConsultantSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAppointmentSelect = this.handleAppointmentSelect.bind(this)
    this.handleAppointmentTypeSelect = this.handleAppointmentTypeSelect.bind(
      this
    )
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    /*document
      .querySelectorAll('button')
      .querySelectorAll('[id=GP-button]')
      .attachEventHandler('click', this.onClick)
    */

    Promise.all([
      axios.get(`${API_ENDPOINT}/availableSlots`),
      axios.get(`${API_ENDPOINT}/users/${this.state.userId}`),
    ])
      .then(([availableSlots, user]) => {
        availableSlots = availableSlots.data
        user = user.data
        this.setState({
          availableSlots,
          user,
        })
      })
      .catch(error => this.setState({ error }))

    /*
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json })
        console.log(json)
      })
      .catch(error => this.setState({ error }))*/
  }

  handleConsultantSelect(event) {
    console.log(event.target.getAttribute('name').toLowerCase())
    const selectedConsultantType = event.target
      .getAttribute('name')
      .toLowerCase()
    this.setState({
      selectedConsultantType,
      selectedAppointment: null,
    })
  }

  handleAppointmentSelect(slot) {
    const time = slot.time
    console.log(time)
    this.setState({
      selectedAppointment: slot,
      selectedAppointmentType: null,
    })
  }

  handleAppointmentTypeSelect(selectedAppointmentType) {
    this.setState({ selectedAppointmentType })
  }

  handleInputChange(event) {
    const { name, value } = event.target

    this.setState({
      [name]: value,
    })
  }

  handleSub() {
    console.log('appointment booked')
  }

  handleSubmit = async ({ userId, dateTime, notes, type }) => {
    try {
      let res = axios({
        method: 'post',
        url: `${API_ENDPOINT}/appointments`,
        data: {
          userId,
          dateTime,
          notes,
          type,
        },
      })

      let { data } = await res
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    // calculate matching slots
    let slots = []
    for (let i = 0; i < this.state.availableSlots.length; i++) {
      for (
        let j = 0;
        j < this.state.availableSlots[i]['consultantType'].length;
        j++
      ) {
        if (
          this.state.availableSlots[i]['consultantType'][j] ===
          this.state.selectedConsultantType
        ) {
          slots.push(this.state.availableSlots[i])
        }
      }
    }

    const consultantTypes = ['GP', 'Therapist', 'Physio', 'Specialist']

    return (
      <div className="app">
        <h2 className="h6">New appointment</h2>
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          {consultantTypes.map((type, index) => (
            <ConsultantSelectButton
              consultantType={type}
              handleConsultantSelect={this.handleConsultantSelect}
              key={index}
            />
          ))}
          <div>
            <strong>Date &amp; Time</strong>
            <br />
            {slots.map((slot, index) => (
              <AppointmentSelectButton
                slot={slot}
                handleAppointmentSelect={this.handleAppointmentSelect}
                key={index}
              />
            ))}
          </div>
          {this.state.selectedAppointment && (
            <div>
              <strong>Appointment Type</strong>
              <br />
              <AppointmentTypeField
                handleAppointmentTypeSelect={this.handleAppointmentTypeSelect}
                appointmentType={this.state.selectedAppointment.appointmentType}
              />
            </div>
          )}
          <NotesInputField
            value={this.state.notes}
            handleInputChange={this.handleInputChange}
          />
          <div>
            <div className="button" onClick={this.handleSub}>
              Book appointment
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
