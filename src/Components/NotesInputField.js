import React from 'react'
import PropTypes from 'prop-types'

const NotesInputField = ({ value, handleInputChange }) => (
  <div className="field-container">
    <strong className="field-title">Notes</strong>

    <textarea
      type="text"
      name="notes"
      value={value}
      placeholder="Describe your symptoms"
      onChange={handleInputChange}
      className="notes-input"
    />
  </div>
)

NotesInputField.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
}

export default NotesInputField
