import React, { Component } from 'react'
import axios from 'axios'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import ConsultantSelectButton from './ConsultantSelectButton'
import AppointmentSelectButton from './AppointmentSelectButton'
import AppointmentTypeField from './AppointmentTypeField'
import NotesInputField from './NotesInputField'
import SubmitButton from './SubmitButton'
import ConsultantSelectField from './ConsultantSelectField'
import AppointmentTimeField from './AppointmentTimeField'
import Header from './Header'

import './App.scss'
import Profile from './Profile'

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
      message: null,
    }
    this.handleConsultantSelect = this.handleConsultantSelect.bind(this)
    this.handleAppointmentSelect = this.handleAppointmentSelect.bind(this)
    this.handleAppointmentTypeSelect = this.handleAppointmentTypeSelect.bind(
      this
    )
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.getMatchingSlots = this.getMatchingSlots.bind(this)
  }

  componentDidMount() {
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
  }

  getMatchingSlots() {
    let slots = this.state.availableSlots.filter(slot =>
      slot.consultantType.includes(this.state.selectedConsultantType)
    )
    return slots
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

  resetForm() {
    this.setState({
      selectedConsultantType: 'gp',
      selectedAppointment: null,
      selectedAppointmentType: null,
      notes: '',
      error: null,
    })
  }

  handleSubmit = async () => {
    const {
      userId,
      selectedAppointment,
      notes,
      selectedConsultantType,
    } = this.state

    if (!userId || !selectedAppointment || !notes || !selectedConsultantType) {
      this.setState({ error: 'please select all fields' })
    } else {
      try {
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
        this.setState({
          message: `Appointment Booked`,
        })
        console.log(data)
        this.resetForm()
      } catch (error) {
        this.setState({ error })
      }
    }
  }

  render() {
    let slots = this.getMatchingSlots()
    const consultantTypes = ['GP', 'Therapist', 'Physio', 'Specialist']
    console.log(this.state.user)

    return (
      <div className="app">
        <Header />
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          {this.state.user && <Profile user={this.state.user} />}
          <ConsultantSelectField
            consultantTypes={consultantTypes}
            handleConsultantSelect={this.handleConsultantSelect}
            selectedConsultantType={this.state.selectedConsultantType}
          />
          <AppointmentTimeField
            handleAppointmentSelect={this.handleAppointmentSelect}
            slots={slots}
            selectedAppointment={this.state.selectedAppointment}
          />
          {this.state.selectedAppointment && (
            <AppointmentTypeField
              handleAppointmentTypeSelect={this.handleAppointmentTypeSelect}
              appointmentType={this.state.selectedAppointment.appointmentType}
              selectedAppointmentType={this.state.selectedAppointmentType}
            />
          )}
          <NotesInputField
            value={this.state.notes}
            handleInputChange={this.handleInputChange}
          />
          <div>{this.state.error}</div>
          <SubmitButton handleSubmit={this.handleSubmit} />
        </div>
      </div>
    )
  }
}

export default App
