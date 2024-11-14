# Event-app
 
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/Dashboard.css"; // Custom styles

function Dashboard() {
  const [userData, setUserData] = useState({
    firstName: "Lincoln",
    lastName: "Philips",
    email: "lincoln@gmail.com",
    phone: "99130 53222",
    hospitalName: "Silver Park Medical Center",
    gender: "Male",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India"
  });
  
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <div className="dashboard-wrapper d-flex justify-content-center align-items-center">
      <div className="dashboard-section">
        <div className="d-flex">
          {/* Sidebar */}
          <div className="sidebars p-4 bg-light">
            <div className="text-center mb-4">
              <img 
                src="https://via.placeholder.com/100" 
                alt="User" 
                className="rounded-circle user-img mb-3"
              />
              <h5>{userData.firstName} {userData.lastName}</h5>
            </div>
              <h4>Menu</h4>
            <div className="menu">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-person-circle me-2"></i>
                  <a href="/profile" className="text-decoration-none">Profile</a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-key-fill me-2"></i>
                  <a href="/change-password" className="text-decoration-none">Change Password</a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  <a href="/terms" className="text-decoration-none">Terms & Condition</a>
                </li>
                <li>
                  <i className="bi bi-lock-fill me-2"></i>
                  <a href="/privacy" className="text-decoration-none">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Profile Form */}
          <div className="content-container ms-4 p-4">
            <h2 className="text-primary mb-4">Profile Setting</h2>
            <div className="profile-info card p-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;




 {
        id: 2,
        name: "Robert Star",
        age: 45,
        issue: "Head Ache",
        doctor: "Dr. Mathew Best",
        disease: "Migrane",
        appointmentTime: "3:30 PM",
        appointmentType: "Online",
        phoneNumber: "133-4646-2390",
        address: "121  Street, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },
      {
        id: 3,
        name: "Marcus Philips",
        age: 55,
        issue: "Heart",
        doctor: "Dr. Mathew Best",
        disease: "Heart Pateint",
        appointmentTime: "7:30 PM",
        appointmentType: "Onsite",
        phoneNumber: "333-356-750",
        address: "3 Ambik Heights, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },
      {
        id: 4,
        name: "Alex Philips",
        age: 13,
        issue: "Fever",
        doctor: "Dr. Mathew Best",
        disease: "Viral Infection",
        appointmentTime: "2:30 PM",
        appointmentType: "Online",
        phoneNumber: "323-356-7430",
        address: "143 Dam Street, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },
      {
        id: 5,
        name: "Sofia Downy",
        age: 22,
        issue: "Itching",
        doctor: "Dr. Mathew Best",
        disease: "Skin Infection",
        appointmentTime: "6:00 PM",
        appointmentType: "Onsite",
        phoneNumber: "223-556-7890",
        address: "123 Main Street, City",
        gender: "Female",
        image: "/images/patient1.jpg",
      },
      {
        id: 6,
        name: "Marcus Philips",
        age: 35,
        issue: "Stomach Ache",
        doctor: "Dr. Mathew Best",
        disease: "Viral Infection",
        appointmentTime: "4:30 PM",
        appointmentType: "Online",
        phoneNumber: "123-456-7890",
        address: "123 Main Street, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },
      {
        id: 7,
        name: "Marcus Philips",
        age: 35,
        issue: "Stomach Ache",
        doctor: "Dr. Mathew Best",
        disease: "Viral Infection",
        appointmentTime: "4:30 PM",
        appointmentType: "Online",
        phoneNumber: "123-456-7890",
        address: "123 Main Street, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },
      {
        id: 8,
        name: "Marcus Philips",
        age: 35,
        issue: "Stomach Ache",
        doctor: "Dr. Mathew Best",
        disease: "Viral Infection",
        appointmentTime: "4:30 PM",
        appointmentType: "Online",
        phoneNumber: "123-456-7890",
        address: "123 Main Street, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },
      {
        id: 9,
        name: "Marcus Philips",
        age: 35,
        issue: "Stomach Ache",
        doctor: "Dr. Mathew Best",
        disease: "Viral Infection",
        appointmentTime: "4:30 PM",
        appointmentType: "Online",
        phoneNumber: "123-456-7890",
        address: "123 Main Street, City",
        gender: "Male",
        image: "/images/patient1.jpg",
      },





      import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/PateintDashboard.css"; // Custom styles
import { FaBell, FaUser, FaCalendarAlt, FaPrescriptionBottleAlt, FaSignOutAlt } from 'react-icons/fa';

const PatientDashboard = () => {
  const [userData, setUserData] = useState({
    name: "Marcus Philips",
    number: "99130 44537",
    email: "John@gmail.com",
    gender: "Male",
    dob: "2 Jan, 2022",
    age: "20 Years",
    bloodGroup: "B+",
    height: 160,
    weight: 50,
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    address: "B-408 Swastik society, mota varacha rajkot",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulate fetching user data
    // axios.get("/api/user/profile").then(response => setUserData(response.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate saving user data
    // axios.put("/api/user/profile", userData);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="dashboard-wrapper d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-light p-4">
      <div className="logo d-flex align-items-center">
            <img src="logo-url" alt="Hospital Logo" style={{ width: "50px" }} />
            <h2 className="ms-2">Hospital</h2>
          </div>
        <h3 className="mb-4">Hospital</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <FaUser /> <a href="#" className="text-decoration-none">Personal Health Record</a>
          </li>
          <li className="mb-3">
            <FaCalendarAlt /> <a href="#" className="text-decoration-none">Appointment Booking</a>
          </li>
          <li className="mb-3">
            <FaPrescriptionBottleAlt /> <a href="#" className="text-decoration-none">Prescription Access</a>
          </li>
        </ul>
        <button className="btn btn-primary w-100">Appointment</button>
        <button className="btn btn-danger w-100 mt-4">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="content-container flex-grow-1 p-4">
        {/* Header */}
        <header className="header d-flex align-items-center justify-content-between px-4 py-2 bg-light">
          
          <div className="search-bar">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <div className="user-info d-flex align-items-center">
            <span className="me-3">Lincoln Philips</span>
            <FaBell size={24} />
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="rounded-circle ms-3"
              style={{ width: "50px" }}
            />
          </div>
        </header>

        {/* Patient Detail Section */}
        <div style={{marginTop:'100px'}} className=" card p-4 ">
          <h2 className="text-primary mb-4">Patient Details</h2>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Number</label>
              <input
                type="text"
                name="number"
                value={userData.number}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
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
              <label className="form-label">DOB</label>
              <input
                type="text"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Age</label>
              <input
                type="text"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={userData.bloodGroup}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={userData.height}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Weight (Kg)</label>
              <input
                type="number"
                name="weight"
                value={userData.weight}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
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
          <div className="row mb-3">
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
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              className="form-control"
              disabled={!isEditing}
            ></textarea>
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

        {/* Additional Section */}
        <div className="additional-section card p-4 mt-4">
          <h2 className="text-primary mb-4">Additional Information</h2>
          {/* You can add your additional content here */}
          <p>This section can be used for any extra details or links.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;    
