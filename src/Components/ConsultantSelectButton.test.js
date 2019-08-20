import React from 'react'
import { shallow } from 'enzyme'
import ConsultantSelectButton from './ConsultantSelectButton'
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

describe('ConsultantSelectButton Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        consultantType: 'GP',
        handleConsultantSelect: () => {},
      }
      const propsError = checkProps(ConsultantSelectButton, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
