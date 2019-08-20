import React from 'react'
import { shallow } from 'enzyme'
import SubmitButton from './SubmitButton'
import checkPropTypes from 'check-prop-types'
import { checkProps } from '../../Utils'

describe('Submit Button Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        handleSubmit: () => {},
      }
      const propsError = checkProps(SubmitButton, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
