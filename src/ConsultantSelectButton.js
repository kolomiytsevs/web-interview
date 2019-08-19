import React from 'react'
import PropTypes from 'prop-types'

const ConsultantSelectButton = ({ consultantType, handleConsultantSelect }) => (
  <div
    className="button"
    id={`${consultantType}-button`}
    name={consultantType}
    onClick={event => handleConsultantSelect(event)}
  >
    {consultantType}
  </div>
)

ConsultantSelectButton.propTypes = {
  consultantType: PropTypes.string,
  handleConsultantSelect: PropTypes.func,
}

export default ConsultantSelectButton
