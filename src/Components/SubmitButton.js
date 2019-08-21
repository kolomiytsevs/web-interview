import React from 'react'
import PropTypes from 'prop-types'

const SubmitButton = ({ handleSubmit }) => (
  <div className="field-container submit-container">
    <div className="submit-button" onClick={handleSubmit}>
      Book appointment
    </div>
  </div>
)

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func,
}

export default SubmitButton
