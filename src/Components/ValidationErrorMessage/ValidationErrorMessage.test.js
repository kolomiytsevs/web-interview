import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import ValidationErrorMessage from './ValidationErrorMessage'
import { checkProps } from '../../../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Notes Input Field Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        error: 'please tell us your symptoms',
      }
      const propsError = checkProps(ValidationErrorMessage, expectedProps)
      expect(propsError).toBeUndefined()
    })
    it('Should throw a prop type warning', () => {
      const expectedProps = {
        error: {},
      }
      const propsError = checkProps(ValidationErrorMessage, expectedProps)
      expect(propsError).not.toBeNull()
    })
  })

  describe('Renders', () => {
    it('should render the error message', () => {
      const props = {
        error: '*please tell us your symptoms',
      }
      const wrapper = shallow(<ValidationErrorMessage {...props} />)
      const message = wrapper.find('p')
      expect(message.text()).toBe('*please tell us your symptoms')
    })
  })
})
