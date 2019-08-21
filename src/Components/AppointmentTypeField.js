import React from 'react'
import PropTypes from 'prop-types'

import './AppointmentTypeField.scss'

const AppointmentTypeField = ({
  appointmentType,
  handleAppointmentTypeSelect,
  selectedAppointmentType,
}) => (
  <div className="appointment-type-container">
    <strong>Appointment Type</strong>
    <br />
    {appointmentType.map((type, index) => (
      <div
        className={selectedAppointmentType === type ? 'selected' : 'button'}
        key={index}
        onClick={() => handleAppointmentTypeSelect(type)}
      >
        {type}
      </div>
    ))}
  </div>
)

AppointmentTypeField.defaultProps = {
  appointmentType: ['video', 'audio'],
}

AppointmentTypeField.propTypes = {
  appointmentType: PropTypes.array,
  handleAppointmentTypeSelect: PropTypes.func,
  selectedAppointmentType: PropTypes.string,
}

export default AppointmentTypeField
