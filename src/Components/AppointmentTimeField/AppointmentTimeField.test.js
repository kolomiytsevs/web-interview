import React from 'react'
import { shallow } from 'enzyme'
import AppointmentTimeField from './AppointmentTimeField'
import { checkProps } from '../../../Utils'

describe('Appointment Time Field Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        slots: [{}, {}, {}],
        handleAppointmentSelect: () => {},
        selectedAppointment: {},
        error: '',
      }
      const propsError = checkProps(AppointmentTimeField, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
