import React from 'react'
import PropTypes from 'prop-types'

import './AppointmentSelectButton.scss'

const AppointmentSelectButton = ({ slot, handleAppointmentSelect }) => (
  <li
    className="appointment-button"
    onClick={() => handleAppointmentSelect(slot)}
  >
    {slot.time}
  </li>
)

AppointmentSelectButton.propTypes = {
  slot: PropTypes.object,
  handleAppointmentSelect: PropTypes.func,
}

export default AppointmentSelectButton
