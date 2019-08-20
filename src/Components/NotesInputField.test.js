import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import NotesInputField from './NotesInputField'
import { checkProps } from '../../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

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

  describe('Renders', () => {
    it('should call handleInputChange prop with input value', () => {
      const props = {
        handleInputChange: jest.fn(),
        value: 'headache',
      }
      const wrapper = shallow(<NotesInputField {...props} />)
      wrapper.find('textarea').simulate('change', 'back ache')
      expect(props.handleInputChange).toBeCalledWith('back ache')
    })
  })
})
