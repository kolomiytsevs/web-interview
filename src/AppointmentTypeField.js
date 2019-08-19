import React from 'react'
import PropTypes from 'prop-types'

import './AppointmentTypeField.scss'

const AppointmentTypeField = ({
  appointmentType,
  handleAppointmentTypeSelect,
}) =>
  appointmentType.map((type, index) => (
    <div
      className="appointment-type-button"
      key={index}
      onClick={() => handleAppointmentTypeSelect(type)}
    >
      {type}
    </div>
  ))

AppointmentTypeField.defaultProps = {
  appointmentType: ['video', 'audio'],
}

AppointmentTypeField.propTypes = {
  appointmentType: PropTypes.array,
  handleAppointmentTypeSelect: PropTypes.func,
}

export default AppointmentTypeField
