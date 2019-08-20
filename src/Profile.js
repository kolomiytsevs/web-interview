import React from 'react'
import PropTypes from 'prop-types'

const Profile = ({ user }) => (
  <div className="profile-container">
    <img src={user.avatar} alt="" className="avatar-image" />
    <h2>
      {user.firstName} {user.lastName}
    </h2>
  </div>
)

Profile.propTypes = {
  user: PropTypes.object,
}

export default Profile
