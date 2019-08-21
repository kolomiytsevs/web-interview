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
    let wrapper
    beforeEach(() => {
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
      wrapper = mount(<Body {...props} />)
    })
    it('Should show appointment type field once appointment has been selected', () => {
      let button = findByClassName(wrapper, 'scroll-field')
        .at(1)
        .childAt(0)
      let thirdSectionHeader = wrapper.find('strong').at(2)
      expect(thirdSectionHeader.text()).toBe('Notes')
      button.simulate('click')
      wrapper.update()
      thirdSectionHeader = wrapper.find('strong').at(2)
      let typeContainer = findByClassName(wrapper, 'appointment-type-container')
      expect(typeContainer.length).toBe(1)
      expect(thirdSectionHeader.text()).toBe('Appointment Type')
    })
    it('Should display six gp appointments', () => {
      let appointments = findByClassName(wrapper, 'scroll-field').at(1)
      let appointmentSix = appointments.childAt(5)
      expect(appointmentSix).not.toBeUndefined()
    })
    it('Should NOT display appointments when there are none', () => {
      let physio = findByClassName(wrapper, 'scroll-field')
        .at(0)
        .childAt(2)
      physio.simulate('click')
      wrapper.update()
      let appointments = findByClassName(wrapper, 'scroll-field')
        .at(1)
        .find('button')
      expect(appointments.length).toBe(0)
    })
    it('Should display no appointments available text when there are no appointments', () => {
      let physio = findByClassName(wrapper, 'scroll-field')
        .at(0)
        .childAt(2)
      physio.simulate('click')
      wrapper.update()
      let appointments = findByClassName(wrapper, 'scroll-field')
        .at(1)
        .childAt(0)
      expect(appointments.text()).toBe('No Appointment Available')
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
