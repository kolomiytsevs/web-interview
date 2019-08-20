import React from 'react'
import { shallow } from 'enzyme'
import ConsultantSelectField from './ConsultantSelectField'
import checkPropTypes from 'check-prop-types'
import { checkProps } from '../../Utils'

describe('Consultant Select Field Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        consultantTypes: ['GP', 'Therapist'],
        handleConsultantSelect: () => {},
        selectedConsultantType: 'gp',
      }
      const propsError = checkProps(ConsultantSelectField, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
