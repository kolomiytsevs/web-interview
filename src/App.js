import React, { Component } from 'react'
import axios from 'axios'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import ConsultantSelectButton from './ConsultantSelectButton'
import AppointmentSelectButton from './AppointmentSelectButton'
import AppointmentTypeField from './AppointmentTypeField'
import NotesInputField from './NotesInputField'
import SubmitButton from './SubmitButton'

import './App.scss'
import ConsultantSelectField from './ConsultantSelectField'

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
    this.handleAppointmentSelect = this.handleAppointmentSelect.bind(this)
    this.handleAppointmentTypeSelect = this.handleAppointmentTypeSelect.bind(
      this
    )
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit = async () => {
    try {
      const {
        userId,
        selectedAppointment,
        notes,
        selectedConsultantType,
      } = this.state
      let res = axios({
        method: 'post',
        url: `${API_ENDPOINT}/appointments`,
        data: {
          userId,
          dateTime: selectedAppointment.time,
          notes,
          type: `${selectedConsultantType} appointment`,
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
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <h2 className="h6">New appointment</h2>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          <ConsultantSelectField
            consultantTypes={consultantTypes}
            handleConsultantSelect={this.handleConsultantSelect}
          />
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
            <AppointmentTypeField
              handleAppointmentTypeSelect={this.handleAppointmentTypeSelect}
              appointmentType={this.state.selectedAppointment.appointmentType}
            />
          )}
          <NotesInputField
            value={this.state.notes}
            handleInputChange={this.handleInputChange}
          />
          <SubmitButton handleSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

export default App
