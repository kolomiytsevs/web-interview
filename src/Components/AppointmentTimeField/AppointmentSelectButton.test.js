import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import AppointmentSelectButton from './AppointmentSelectButton'
import { checkProps } from '../../../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const findByClassName = (component, className) =>
  component.find(`[className='${className}']`)

describe('AppointmentSelectButton Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        slot: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        selectedAppointment: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        handleAppointmentSelect: () => {},
      }
      const propsError = checkProps(AppointmentSelectButton, expectedProps)
      expect(propsError).toBeUndefined()
    })
    it('Should throw a prop type warning', () => {
      const expectedProps = {
        slot: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        selectedAppointment: '18/10/2019 11:25',
        handleAppointmentSelect: () => {},
      }
      const propsError = checkProps(AppointmentSelectButton, expectedProps)
      expect(propsError).not.toBeNull()
    })
  })

  describe('Renders', () => {
    let wrapper
    let mockFunc
    beforeEach(() => {
      mockFunc = jest.fn()
      const props = {
        slot: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        selectedAppointment: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:12:00.000Z',
        },
        handleAppointmentSelect: mockFunc,
      }

      wrapper = shallow(<AppointmentSelectButton {...props} />)
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
    it('should display converted date', () => {
      const text = wrapper.find('div')
      expect(text.text()).toBe('27 Nov 19 10:11')
    })
    it('should have a selected className when the value is the same as the selectedAppointment', () => {
      const props = {
        slot: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        selectedAppointment: {
          id: 1,
          consultantType: ['audio', 'video'],
          appointmentType: ['gp'],
          time: '2019-11-27T10:11:00.000Z',
        },
        handleAppointmentSelect: mockFunc,
      }
      wrapper = shallow(<AppointmentSelectButton {...props} />)
      expect(wrapper.props().className).toBe('selected')
    })
  })
})
