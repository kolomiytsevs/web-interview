import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Body from './Body'
import { checkProps } from '../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const findByClassName = (component, className) =>
  component.find(`[className='${className}']`)

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

  describe('Body Integration Tests', () => {
    it('Should show appointment type field once appointment has been selected', () => {
      const props = {
        userId: 1,
        user: {
          avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAA',
          dateOfBirth: '1971-02-03',
          firstName: 'Jane',
          id: 1,
          lastName: 'Doe',
        },
        availableSlots: availableSlotsData,
      }
      let wrapper = mount(<Body {...props} />)
      /*let button = findByClassName(wrapper, 'scroll-field').at(0).childAt(0)
        button.simulate('click')*/

      let typeContainer = wrapper.find('strong').at(2)
      expect(typeContainer.text()).toBe('Notes')
      wrapper.setState({ selectedAppointment: {} })
      wrapper.update()

      typeContainer = wrapper.find('strong').at(2)

      expect(typeContainer.text()).toBe('Appointment Type')
    })
  })
})

const availableSlotsData = [
  {
    id: 1,
    consultantType: ['gp'],
    appointmentType: ['audio'],
    time: '2019-11-27T10:11:00.000Z',
  },
  {
    id: 2,
    consultantType: ['specialist', 'gp'],
    appointmentType: ['audio', 'video'],
    time: '2019-12-01T14:16:30.000Z',
  },
  {
    id: 3,
    consultantType: ['gp'],
    appointmentType: ['audio', 'video'],
    time: '2019-10-08T16:17:30.000Z',
  },
  {
    id: 4,
    consultantType: ['therapist', 'gp'],
    appointmentType: ['audio', 'video'],
    time: '2019-11-16T16:18:30.000Z',
  },
  {
    id: 5,
    consultantType: ['specialist'],
    appointmentType: ['audio', 'video'],
    time: '2019-12-26T17:19:00.000Z',
  },
  {
    id: 6,
    consultantType: ['gp'],
    appointmentType: ['audio', 'video'],
    time: '2019-09-23T18:20:00.000Z',
  },
  {
    id: 7,
    consultantType: ['gp'],
    appointmentType: ['audio', 'video'],
    time: '2019-08-30T19:21:30.000Z',
  },
]
