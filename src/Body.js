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

  getMatchingSlots() {
    const { availableSlots } = this.props
    let slots = availableSlots.filter(slot =>
      slot.consultantType.includes(this.state.selectedConsultantType)
    )
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

  handleSubmit = async () => {
    const {
      selectedAppointment,
      notes,
      selectedConsultantType,
      selectedAppointmentType,
    } = this.state
    const { userId } = this.props

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
