import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ConsultantSelectButton from './ConsultantSelectButton'
import { Stethascope } from '../../svgIcons'
import ValidationErrorMessage from '../ValidationErrorMessage/ValidationErrorMessage'

const ConsultantSelectField = ({
  consultantTypes,
  handleConsultantSelect,
  selectedConsultantType,
  error,
}) => (
  <div className="field-container">
    <div className="input-label-container">
      <Stethascope />
      <strong>Consultant Type</strong>
    </div>

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

    <ValidationErrorMessage error={error} />
  </div>
)

ConsultantSelectField.propTypes = {
  consultantTypes: PropTypes.array,
  handleConsultantSelect: PropTypes.func,
  selectedConsultantType: PropTypes.string,
  error: PropTypes.string,
}

export default ConsultantSelectField
