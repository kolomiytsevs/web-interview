import React from 'react'
import PropTypes from 'prop-types'

const Profile = ({ user }) => (
  <div>
    <img src={user.avatar} alt="" />
    <h2>
      {user.firstName} {user.lastName}
    </h2>
  </div>
)

Profile.propTypes = {
  user: PropTypes.object,
}

export default Profile
