import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import SubmitButton from './SubmitButton'
import { checkProps } from '../../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const findByClassName = (component, className) =>
  component.find(`[className='${className}']`)

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
  describe('Renders', () => {
    let wrapper
    let mockFunc
    beforeEach(() => {
      mockFunc = jest.fn()
      const props = {
        handleSubmit: mockFunc,
      }

      wrapper = shallow(<SubmitButton {...props} />)
    })
    it('Should Render a button', () => {
      const button = findByClassName(wrapper, 'button')
      expect(button.length).toBe(1)
    })
    it('Should emit callback on click event', () => {
      const button = findByClassName(wrapper, 'button')
      button.simulate('click')
      const callback = mockFunc.mock.calls.length
      expect(callback).toBe(1)
    })
  })
})
