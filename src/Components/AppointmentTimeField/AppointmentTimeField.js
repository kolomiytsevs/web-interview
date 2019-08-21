import React from 'react'
import PropTypes from 'prop-types'

import AppointmentSelectButton from './AppointmentSelectButton'
import { Clock } from '../../svgIcons'
import ValidationErrorMessage from '../ValidationErrorMessage/ValidationErrorMessage'

const AppointmentTimeField = ({
  handleAppointmentSelect,
  slots,
  selectedAppointment,
  error,
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
    <ValidationErrorMessage error={error} />
  </div>
)

AppointmentTimeField.propTypes = {
  slots: PropTypes.array,
  handleAppointmentSelect: PropTypes.func,
  selectedAppointment: PropTypes.object,
  error: PropTypes.string,
}

export default AppointmentTimeField
