import React from 'react'
import PropTypes from 'prop-types'

import ConsultantSelectButton from './ConsultantSelectButton'

const ConsultantSelectField = ({
  consultantTypes,
  handleConsultantSelect,
  selectedConsultantType,
}) =>
  consultantTypes.map((type, index) => (
    <ConsultantSelectButton
      consultantType={type}
      handleConsultantSelect={handleConsultantSelect}
      selectedConsultantType={selectedConsultantType}
      key={index}
    />
  ))

ConsultantSelectField.propTypes = {
  consultantTypes: PropTypes.array,
  handleConsultantSelect: PropTypes.func,
  selectedConsultantType: PropTypes.string,
}

export default ConsultantSelectField
