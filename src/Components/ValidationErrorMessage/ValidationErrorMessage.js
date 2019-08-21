import React from 'react'
import PropTypes from 'prop-types'

import './ValidationErrorMessage.scss'

const ValidationErrorMessage = ({ error }) => (
  <p className="validation-error-message">{error}</p>
)

ValidationErrorMessage.propTypes = {
  error: PropTypes.string,
}

export default ValidationErrorMessage
