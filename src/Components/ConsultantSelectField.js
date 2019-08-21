import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ConsultantSelectButton from './ConsultantSelectButton'

const ConsultantSelectField = ({
  consultantTypes,
  handleConsultantSelect,
  selectedConsultantType,
}) => (
  <div className="field-container">
    <strong>Consultant Type</strong>
    <div className="scroll-field">
      {consultantTypes.map((type, index) => (
        <ConsultantSelectButton
          consultantType={type}
          handleConsultantSelect={handleConsultantSelect}
          selectedConsultantType={selectedConsultantType}
          key={index}
        />
      ))}
    </div>
  </div>
)

ConsultantSelectField.propTypes = {
  consultantTypes: PropTypes.array,
  handleConsultantSelect: PropTypes.func,
  selectedConsultantType: PropTypes.string,
}

export default ConsultantSelectField
