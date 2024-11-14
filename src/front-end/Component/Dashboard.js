import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/Dashboard.css"; // Custom styles

function Dashboard() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hospitalName: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    profilePicture: "", // For profile picture
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Fetch user data when component mounts
    axios.get("/api/user/profile") // Replace with your actual user API endpoint
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    axios.put("/api/user/profile", userData) // Update user data API
      .then(() => {
        localStorage.setItem("user", JSON.stringify(userData)); // Update local storage
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    axios.put("/api/user/change-password", passwordData) 
      .then(() => {
        alert("Password updated successfully");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <div className="profile-info card p-4" style={{marginBottom:'1850px'}}>
            <h2 className="text-primary mb-4">Profile Setting</h2>
            {/* Profile Form */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={userData.email} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={userData.phone} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Hospital Name</label>
                <input 
                  type="text" 
                  name="hospitalName" 
                  value={userData.hospitalName} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <input 
                  type="text" 
                  name="gender" 
                  value={userData.gender} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={userData.city} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={userData.state} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input 
                  type="text" 
                  name="country" 
                  value={userData.country} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  disabled={!isEditing} 
                />
              </div>
            </div>
            <div className="text-end">
              {isEditing ? (
                <button className="btn btn-success me-3" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleEdit}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        );
      case "changePassword":
        return (
          <div className="change-password-form card p-4">
            <h2 className="text-primary mb-4">Change Password</h2>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-success" onClick={handleChangePassword}>
                Update Password
              </button>
            </div>
          </div>
        );
      case "terms":
        return (
          <div className="terms-conditions card p-4">
            <h2 className="text-primary mb-4">Terms & Conditions</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
              suscipit elit. Integer feugiat, odio eu sollicitudin tincidunt,
              enim elit gravida lorem, at efficitur sem mi nec est.
            </p>
          </div>
        );
      case "privacy":
        return (
          <div className="privacy-policy card p-4">
            <h2 className="text-primary mb-4">Privacy Policy</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vestibulum odio et ante tempus, eget suscipit purus facilisis.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="dashboard-section d-flex justify-content-center align-items-center" style={{ width: '100%', maxWidth: '1200px' }}>
        <div className="d-flex w-100">
          {/* Sidebar */}
          <div className="sidebars p-4 bg-light" style={{ minWidth: '300px' }}>
            <div className="text-center mb-4">
              <img
                src={userData.profilePicture || "https://via.placeholder.com/100"}
                alt="User"
                className="rounded-circle user-img mb-3"
              />
              <h5>
                {userData.firstName} {userData.lastName}
              </h5>
            </div>
            <h4>Menu</h4>
            <div className="menu">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-person-circle me-2"></i>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => setActiveMenu("profile")}
                    style={{ cursor: "pointer" }}
                  >
                    Profile
                  </a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-key-fill me-2"></i>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => setActiveMenu("changePassword")}
                    style={{ cursor: "pointer" }}
                  >
                    Change Password
                  </a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => setActiveMenu("terms")}
                    style={{ cursor: "pointer" }}
                  >
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <i className="bi bi-lock-fill me-2"></i>
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => setActiveMenu("privacy")}
                    style={{ cursor: "pointer" }}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="content-container ms-4 p-4 flex-grow-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
