import React from 'react'
import PropTypes from 'prop-types'

import './AppointmentSelectButton.scss'

const AppointmentSelectButton = ({
  slot,
  handleAppointmentSelect,
  selectedAppointment,
}) => (
  <div
    className={selectedAppointment === slot ? 'selected' : 'appointment-button'}
    onClick={() => handleAppointmentSelect(slot)}
  >
    {slot.time}
  </div>
)

AppointmentSelectButton.propTypes = {
  slot: PropTypes.object,
  handleAppointmentSelect: PropTypes.func,
  selectedAppointment: PropTypes.object,
}

export default AppointmentSelectButton
