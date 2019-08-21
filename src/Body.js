import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { API_ENDPOINT } from './config'

import AppointmentTypeField from './Components/AppointmentTypeField'
import NotesInputField from './Components/NotesInputField'
import SubmitButton from './Components/SubmitButton'
import ConsultantSelectField from './Components/ConsultantSelectField'
import AppointmentTimeField from './Components/AppointmentTimeField'
import Profile from './Components/Profile'

import './App.scss'

class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedConsultantType: 'gp',
      selectedAppointment: null,
      selectedAppointmentType: null,
      notes: '',
      error: null,
      message: null,
      loading: false,
      consultantErr: null,
      timeErr: null,
      typeErr: null,
      notesErr: null,
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
    this.validateInputs = this.validateInputs.bind(this)
  }

  getMatchingSlots() {
    const { availableSlots } = this.props
    let slots = availableSlots
      .filter(slot =>
        slot.consultantType.includes(this.state.selectedConsultantType)
      )
      .sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
    return slots
  }

  handleConsultantSelect(event) {
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

  validateInputs(consultant, time, type, notes) {
    if (!consultant)
      this.setState({ consultantErr: '*please select a consultant type' })
    if (!time) this.setState({ timeErr: '*please select an appointment slot' })
    if (!type) this.setState({ typeErr: '*please select call type' })
    if (!notes)
      this.setState({
        notesErr: '*please tell us a little about your symptoms',
      })
  }

  handleSubmit = async () => {
    const {
      selectedAppointment,
      notes,
      selectedConsultantType,
      selectedAppointmentType,
    } = this.state
    const { userId } = this.props
    this.validateInputs(
      selectedConsultantType,
      selectedAppointment,
      selectedAppointmentType,
      notes
    )
    if (
      !userId ||
      !selectedAppointment ||
      !notes ||
      !selectedConsultantType ||
      !selectedAppointmentType
    ) {
      this.setState({ message: 'please select all fields' })
    } else {
      try {
        let res = axios({
          method: 'post',
          url: `${API_ENDPOINT}/appointments`,
          data: {
            userId,
            dateTime: selectedAppointment.time,
            notes,
            consultantType: `${selectedConsultantType} appointment`,
            appointmentType: selectedAppointmentType,
          },
        })

        let { data } = await res
        this.setState({
          message: `Appointment Booked`,
        })
        this.resetForm()
      } catch (error) {
        this.setState({ error })
      }
    }
  }

  render() {
    const slots = this.getMatchingSlots()
    const consultantTypes = ['GP', 'Therapist', 'Physio', 'Specialist']

    return (
      <div style={{ maxWidth: 600, margin: '24px auto' }}>
        {this.props.user && <Profile user={this.props.user} />}
        <ConsultantSelectField
          consultantTypes={consultantTypes}
          handleConsultantSelect={this.handleConsultantSelect}
          selectedConsultantType={this.state.selectedConsultantType}
        />
        {this.state.consultantErr && <div>{this.state.consultantErr}</div>}
        <AppointmentTimeField
          handleAppointmentSelect={this.handleAppointmentSelect}
          slots={slots}
          selectedAppointment={this.state.selectedAppointment}
        />
        {this.state.timeErr && <div>{this.state.timeErr}</div>}
        {this.state.selectedAppointment && (
          <div>
            <AppointmentTypeField
              handleAppointmentTypeSelect={this.handleAppointmentTypeSelect}
              appointmentType={this.state.selectedAppointment.appointmentType}
              selectedAppointmentType={this.state.selectedAppointmentType}
            />
            {this.state.typeErr && <div>{this.state.typeErr}</div>}
          </div>
        )}
        <NotesInputField
          value={this.state.notes}
          handleInputChange={this.handleInputChange}
        />
        {this.state.notesErr && <div>{this.state.notesErr}</div>}
        <div>{this.state.message}</div>
        <SubmitButton handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

Body.propTypes = {
  availableSlots: PropTypes.array,
  userId: PropTypes.number,
  user: PropTypes.object,
}

export default Body
