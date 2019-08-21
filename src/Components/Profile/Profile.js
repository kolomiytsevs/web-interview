import React from 'react'
import PropTypes from 'prop-types'

const Profile = ({ user }) => (
  <div className="profile-container">
    <img src={user.avatar} alt="" className="avatar-image" />
    <p className="profile-name">
      {user.firstName} {user.lastName}
    </p>
  </div>
)

Profile.propTypes = {
  user: PropTypes.object,
}

export default Profile
