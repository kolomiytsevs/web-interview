import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ConsultantSelectButton from './ConsultantSelectButton'

const ConsultantSelectField = ({
  consultantTypes,
  handleConsultantSelect,
  selectedConsultantType,
}) => (
  <Fragment>
    <strong>Consultant Type</strong>
    <br />
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
  </Fragment>
)

ConsultantSelectField.propTypes = {
  consultantTypes: PropTypes.array,
  handleConsultantSelect: PropTypes.func,
  selectedConsultantType: PropTypes.string,
}

export default ConsultantSelectField
