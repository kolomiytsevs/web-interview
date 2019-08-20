import React from 'react'
import { shallow } from 'enzyme'
import NotesInputField from './NotesInputField'
import checkPropTypes from 'check-prop-types'
import { checkProps } from '../../Utils'

describe('Notes Input Field Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        value: 'not feeling so good',
        handleInputChange: () => {},
      }
      const propsError = checkProps(NotesInputField, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
