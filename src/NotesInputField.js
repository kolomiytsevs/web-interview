import React from 'react'
import PropTypes from 'prop-types'

const NotesInputField = ({ value, handleInputChange }) => (
  <div>
    <strong>Notes</strong>
    <br />
    <textarea
      type="text"
      name="notes"
      value={value}
      placeholder="Describe your symptoms"
      onChange={handleInputChange}
    />
  </div>
)

NotesInputField.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
}

export default NotesInputField
