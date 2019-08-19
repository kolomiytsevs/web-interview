import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import ConsultantSelectButton from './ConsultantSelectButton'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointmentType: 'gp',
      availableSlots: [],
    }
    this.handleConsultantSelect = this.handleConsultantSelect.bind(this)
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
      })
      .catch(() => {
        // TODO: Handle error here
      })
  }

  handleConsultantSelect(event) {
    console.log(event.target.getAttribute('name').toLowerCase())
    const selectedAppointmentType = event.target
      .getAttribute('name')
      .toLowerCase()
    this.setState({ selectedAppointmentType })
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
          this.state.availableSlots[j]['consultantType'][i] ===
          this.state.selectedAppointmentType
        ) {
          slots.push(this.state.availableSlots[j])
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
            <strong>Appointments</strong>
            {slots.map((slot, index) => (
              <li
                key={index}
                className="appointment-button"
                onClick={() => {
                  this.setState({ selectedAppointment: slot })
                }}
              >
                {slot.time}
              </li>
            ))}
          </div>
          <div>
            <strong>Notes</strong>
            <textarea />
          </div>
          <div>
            <div
              className="button"
              onClick={() => {
                /* TODO: submit the data */
              }}
            >
              Book appointment
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
