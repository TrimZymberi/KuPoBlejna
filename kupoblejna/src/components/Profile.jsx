import React, { useContext } from "react";
import PropTypes from 'prop-types';  // Import PropTypes
import { AuthContext } from "../contexts/AuthProvider";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().then(() => {
      alert("Logged out successfully.");
    }).catch((error) => {
      alert("Logout failed. Error: " + error.message);
    });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {
                user.photoURL ? (
                  <img alt="User profile" src={user.photoURL} />
                ) : (
                  <img alt="Default avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                )
              }
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li><a href="/update-profile">Profile</a></li>
            <li><a>Order</a></li>
            <li><a>Settings</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the Profile component
Profile.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string  // Define that photoURL is expected to be a string
  }).isRequired  // Mark the user object as required
};

export default Profile;
