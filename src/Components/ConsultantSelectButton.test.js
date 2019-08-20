import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import ConsultantSelectButton from './ConsultantSelectButton'
import { checkProps } from '../../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const findByClassName = (component, className) =>
  component.find(`[className='${className}']`)

describe('ConsultantSelectButton Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        consultantType: 'GP',
        selectedConsultantType: 'gp',
        handleConsultantSelect: () => {},
      }
      const propsError = checkProps(ConsultantSelectButton, expectedProps)
      expect(propsError).toBeUndefined()
    })
    it('Should throw a prop type warning', () => {
      const expectedProps = {
        consultantType: [],
        handleConsultantSelect: () => {},
        selectedConsultantType: {},
      }
      const propsError = checkProps(ConsultantSelectButton, expectedProps)
      expect(propsError).not.toBeNull()
    })
  })
})

describe('Renders', () => {
  let wrapper
  let mockFunc
  beforeEach(() => {
    mockFunc = jest.fn()
    const props = {
      consultantType: 'GP',
      selectedConsultantType: 'therapist',
      handleConsultantSelect: mockFunc,
    }

    wrapper = shallow(<ConsultantSelectButton {...props} />)
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
  it('should display consultant name', () => {
    const text = wrapper.find('div')
    expect(text.text()).toBe('GP')
  })
  it('should convert consultant type to lowercase and change className to selected when the value is the same as the selectedConsultantType', () => {
    const props = {
      consultantType: 'GP',
      selectedConsultantType: 'gp',
      handleConsultantSelect: mockFunc,
    }
    wrapper = shallow(<ConsultantSelectButton {...props} />)
    expect(wrapper.props().className).toBe('selected')
  })
})
