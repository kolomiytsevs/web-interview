import React from 'react'
import { shallow } from 'enzyme'
import Body from './Body'
import { checkProps } from '../Utils'

describe('Body Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        availableSlots: [{}, {}, {}],
        userId: 12,
        user: {
          firstName: 'Bill',
        },
      }
      const propsError = checkProps(Body, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })
})
