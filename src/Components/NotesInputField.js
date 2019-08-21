import React from 'react'
import PropTypes from 'prop-types'

import { Notes } from '../svgIcons'
import ValidationErrorMessage from './ValidationErrorMessage'

const NotesInputField = ({ value, handleInputChange, error }) => (
  <div className="field-container">
    <div className="input-label-container">
      <Notes />
      <strong className="field-title">Notes</strong>
    </div>

    <textarea
      type="text"
      name="notes"
      value={value}
      placeholder="Describe your symptoms"
      onChange={handleInputChange}
      className="notes-input"
    />
    <ValidationErrorMessage error={error} />
  </div>
)

NotesInputField.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  error: PropTypes.string,
}

export default NotesInputField
