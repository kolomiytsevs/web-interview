import React from 'react'
import { shallow } from 'enzyme'
import AppointmentTypeField from './AppointmentTypeField'
import { checkProps } from '../../Utils'

describe('Appointment Type Field Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        appointmentType: ['video', 'audio'],
        handleAppointmentTypeSelect: () => {},
        selectedAppointmentType: 'video',
        error: '',
      }
      const propsError = checkProps(AppointmentTypeField, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
