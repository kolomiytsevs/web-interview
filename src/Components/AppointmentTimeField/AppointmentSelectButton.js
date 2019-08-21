import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './AppointmentSelectButton.scss'

const formatDate = dateTime =>
  moment(dateTime).calendar(null, {
    sameDay: '[Today] HH:mm',
    nextDay: '[Tomorrow] HH:mm',
    nextWeek: 'dddd HH:mm',
    lastDay: '[Yesterday] HH:mm',
    lastWeek: '[Last] dddd HH:mm',
    sameElse: 'DD MMM YY HH:mm',
  })

const AppointmentSelectButton = ({
  slot,
  handleAppointmentSelect,
  selectedAppointment,
}) =>
  selectedAppointment ? (
    <div
      className={selectedAppointment.time === slot.time ? 'selected' : 'button'}
      onClick={() => handleAppointmentSelect(slot)}
    >
      {formatDate(slot.time)}
    </div>
  ) : (
    <div className={'button'} onClick={() => handleAppointmentSelect(slot)}>
      {formatDate(slot.time)}
    </div>
  )

AppointmentSelectButton.propTypes = {
  slot: PropTypes.object,
  handleAppointmentSelect: PropTypes.func,
  selectedAppointment: PropTypes.object,
}

formatDate.propTypes = {
  dateTime: PropTypes.string,
}

export default AppointmentSelectButton
