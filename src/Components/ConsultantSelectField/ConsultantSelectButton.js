import React from 'react'
import PropTypes from 'prop-types'

const ConsultantSelectButton = ({
  consultantType,
  handleConsultantSelect,
  selectedConsultantType,
}) => (
  <div
    className={
      selectedConsultantType === consultantType.toLowerCase()
        ? 'selected'
        : 'button'
    }
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
  selectedConsultantType: PropTypes.string,
}

export default ConsultantSelectButton
