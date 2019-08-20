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
    <div className="scroll-field">
      {slots.length ? (
        slots.map((slot, index) => (
          <AppointmentSelectButton
            slot={slot}
            handleAppointmentSelect={handleAppointmentSelect}
            key={index}
            selectedAppointment={selectedAppointment}
          />
        ))
      ) : (
        <p>No Appointment Available</p>
      )}
    </div>
  </div>
)

AppointmentTimeField.propTypes = {
  slots: PropTypes.array,
  handleAppointmentSelect: PropTypes.func,
  selectedAppointment: PropTypes.object,
}

export default AppointmentTimeField
