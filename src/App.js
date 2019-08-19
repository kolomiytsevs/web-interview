import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import ConsultantSelectButton from './ConsultantSelectButton'
import AppointmentSelectButton from './AppointmentSelectButton'
import AppointmentTypeField from './AppointmentTypeField'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedConsultantType: 'gp',
      availableSlots: [],
      selectedAppointment: null,
      selectedAppointmentType: null,
      error: null,
    }
    this.handleConsultantSelect = this.handleConsultantSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAppointmentSelect = this.handleAppointmentSelect.bind(this)
    this.handleAppointmentTypeSelect = this.handleAppointmentTypeSelect.bind(
      this
    )
  }

  componentDidMount() {
    /*document
      .querySelectorAll('button')
      .querySelectorAll('[id=GP-button]')
      .attachEventHandler('click', this.onClick)
    */

    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json })
        console.log(json)
      })
      .catch(error => this.setState({ error }))
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

  handleSubmit() {
    console.log('appointment booked')
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
    console.log(slots)

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

          <div>
            <strong>Notes</strong>
            <br />
            <textarea />
          </div>
          <div>
            <div className="button" onClick={this.handleSubmit}>
              Book appointment
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
