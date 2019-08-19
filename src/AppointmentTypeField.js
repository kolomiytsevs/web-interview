import React from 'react'
import PropTypes from 'prop-types'

import './AppointmentTypeField.scss'

const AppointmentTypeField = ({
  appointmentType,
  handleAppointmentTypeSelect,
}) => (
  <div>
    <strong>Appointment Type</strong>
    <br />
    {appointmentType.map((type, index) => (
      <div
        className="appointment-type-button"
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
}

export default AppointmentTypeField
