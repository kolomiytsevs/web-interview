import React from 'react'
import { shallow } from 'enzyme'
import Profile from './Profile'
import checkPropTypes from 'check-prop-types'
import { checkProps } from '../../Utils'

describe('Profile Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        user: {
          avatar: 'link',
          firstName: 'Bill',
        },
      }
      const propsError = checkProps(Profile, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
