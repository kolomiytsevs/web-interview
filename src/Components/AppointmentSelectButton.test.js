import React from 'react'
import { shallow } from 'enzyme'
import AppointmentSelectButton from './AppointmentSelectButton'
import checkPropTypes from 'check-prop-types'

const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  )
  return propsErr
}

describe('AppointmentSelectButton Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        slot: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        handleAppointmentSelect: () => {},
      }
      const propsError = checkProps(AppointmentSelectButton, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
