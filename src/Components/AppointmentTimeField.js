import React from 'react'
import PropTypes from 'prop-types'

import AppointmentSelectButton from './AppointmentSelectButton'
import { Clock } from '../svgIcons'

const AppointmentTimeField = ({
  handleAppointmentSelect,
  slots,
  selectedAppointment,
}) => (
  <div className="field-container">
    <div className="input-label-container">
      <Clock />
      <strong>Date &amp; Time</strong>
    </div>
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
