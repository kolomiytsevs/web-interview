import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Profile from './Profile'
import { checkProps } from '../../../Utils'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const findByClassName = (component, className) =>
  component.find(`[className='${className}']`)

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
    it('Should throw a prop type warning', () => {
      const expectedProps = {
        user: 'Bill',
      }
      const propsError = checkProps(Profile, expectedProps)
      expect(propsError).not.toBeNull()
    })
  })

  describe('Renders', () => {
    let wrapper
    let mockFunc
    beforeEach(() => {
      mockFunc = jest.fn()
      const props = {
        user: {
          avatar: 'http://www.google.com',
          firstName: 'Bill',
          lastName: 'Hemmingway',
        },
      }

      wrapper = shallow(<Profile {...props} />)
    })

    it('Should Render a avatar', () => {
      const button = findByClassName(wrapper, 'avatar-image')
      expect(button.length).toBe(1)
    })
    it('should render avatar link', () => {
      const img = wrapper.find('img')
      expect(img.props().src).toBe('http://www.google.com')
    })
    it('should render full name', () => {
      const text = findByClassName(wrapper, 'profile-name')
      expect(text.text()).toBe('Bill Hemmingway')
    })
  })
})
