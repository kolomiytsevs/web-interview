import React from 'react'
import PropTypes from 'prop-types'

const SubmitButton = ({ handleSubmit }) => (
  <div>
    <div className="button" onClick={handleSubmit}>
      Book appointment
    </div>
  </div>
)

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func,
}

export default SubmitButton
