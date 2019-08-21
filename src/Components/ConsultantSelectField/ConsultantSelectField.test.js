import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import ConsultantSelectField from './ConsultantSelectField'
import { checkProps } from '../../../Utils'

describe('Consultant Select Field Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a prop type warning', () => {
      const expectedProps = {
        consultantTypes: ['GP', 'Therapist'],
        handleConsultantSelect: () => {},
        selectedConsultantType: 'gp',
        error: '',
      }
      const propsError = checkProps(ConsultantSelectField, expectedProps)
      expect(propsError).toBeUndefined()
    })
  })

  it('renders without crashing', () => {
    const props = {
      consultantTypes: ['GP', 'Therapist', 'Physio', 'Specialist'],
    }
    const div = document.createElement('div')
    ReactDOM.render(<ConsultantSelectField {...props} />, div)
  })
})
