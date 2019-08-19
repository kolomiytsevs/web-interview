import React from 'react'
import PropTypes from 'prop-types'

import AppointmentSelectButton from './AppointmentSelectButton'

const AppointmentTimeField = ({
  handleAppointmentSelect,
  slots,
  selectedAppointment,
}) => (
  <div>
    <strong>Date &amp; Time</strong>
    <br />
    {slots.map((slot, index) => (
      <AppointmentSelectButton
        slot={slot}
        handleAppointmentSelect={handleAppointmentSelect}
        key={index}
        selectedAppointment={selectedAppointment}
      />
    ))}
  </div>
)

AppointmentTimeField.propTypes = {
  slots: PropTypes.array,
  handleAppointmentSelect: PropTypes.func,
  selectedAppointment: PropTypes.object,
}

export default AppointmentTimeField
