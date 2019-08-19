import React from 'react'
import PropTypes from 'prop-types'

import ConsultantSelectButton from './ConsultantSelectButton'

const ConsultantSelectField = ({ consultantTypes, handleConsultantSelect }) =>
  consultantTypes.map((type, index) => (
    <ConsultantSelectButton
      consultantType={type}
      handleConsultantSelect={handleConsultantSelect}
      key={index}
    />
  ))

ConsultantSelectField.propTypes = {
  consultantTypes: PropTypes.array,
  handleConsultantSelect: PropTypes.func,
}

export default ConsultantSelectField
