import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styles
import '../Component/Pateintmanagement.css'; // Importing CSS file for custom stylesimport {

import {
  FaBell, FaEye,
  FaEdit,
  FaFileMedical,
  FaFilePrescription, FaCalendarAlt,
  FaHeartbeat,FaHospital,FaFileAlt,FaVirus,FaSearch
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";

function PatientManagement() {
  // Sample patient data
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Marcus Philips",
      age: 60,
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
   
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  // Handle view patient details
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div className=" width" style={{marginTop:"80px"}}>
       <div className="sidebar bg-light p-4" style={{ width: '220px', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="text-center mb-4">
            <img
              src="https://i.pinimg.com/564x/e3/59/47/e3594778bad088a0582c7638ffa4333c.jpg"
              alt="Logo"
              className="img-fluid"
              style={{ width: "100px", height: "80px", borderRadius: "8px" }}
            />
          </div>
          <ul className="list-unstyled text-center">
            <li className="mb-3">
            <Link to="/home/:userId" style={{ textDecoration: "none", color: "black" }}>
              <FaFileMedical className="me-2" /> Personal Health Record
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/home/:userId/apbooke" style={{ textDecoration: 'none' ,color:'black'}}>
                <FaFilePrescription className="me-2" />Appointment Booking
              </Link>
            </li>
            <li className="mb-3">
            <FaFilePrescription/> <Link to="/home/:userId/p" style={{ textDecoration: 'none' ,color:'black'}}>Prescription Access</Link>
            </li>
            <li className="mb-3">
              <Dropdown>
                <Dropdown.Toggle variant="light">
                  <FaFileMedical className="me-2" /> Bill and Payments
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item><Link style={{ textDecoration: 'none',color:"black" }} to="/home/:userId/bills">Monitor Bill</Link></Dropdown.Item>
                  <Dropdown.Item><Link style={{ textDecoration: 'none',color:"black" }} to="/home/:userId/ibills">Insurance Claims</Link></Dropdown.Item>
                  <Dropdown.Item><Link style={{ textDecoration: 'none',color:'black'}} to="/home/:userId/detailbills">Payment Process</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="mb-3">
            <FaFileMedical className="me-2" /> <Link to="/home/:userId/reportan" style={{ textDecoration: 'none' ,color:'black'}}>Report Analytics</Link>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <button className="btn btn-primary w-100 mb-3" >Book Appointment</button>
          <button className="btn btn-danger w-100" >Logout</button>
        </div>
      </div>
      <header className="header d-flex align-items-center justify-content-between px-4 py-2 bg-light mb-4">
          <div className="search-bar">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <div className="user-info d-flex align-items-center">
            <FaBell size={24} />
            <span className="me-3">Lincoln Philips</span>
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="rounded-circle ms-3"
              style={{ width: "50px" }}
            />
          </div>
        </header>
      <div className="appointment-nav">
        <a href="#" className="nav-link active">Today Appointment</a>
        <a href="#" className="nav-link">Upcoming Appointment</a>
        <a href="#" className="nav-link">Previous Appointment</a>
        <a href="#" className="nav-link">Cancel Appointment</a>
      </div>
      
      <h2 className="section-title">Today Appointment</h2>

      <div className="search-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Patient"
            className="form-control search-input"
          />
        </div>
      </div>

      <table className="table table-hover table-striped table-bordered">
        <thead className="table-header">
          <tr>
            <th>Patient Name</th>
            <th>Patient Issue</th>
            <th>Doctor Name</th>
            <th>Diseas Name</th>
            <th>Appointment Time</th>
            <th>Appointment Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>
                <img
                  src={patient.image || "/default-patient-image.jpg"}
                  alt="Patient"
                  className="patient-img"
                />
                {patient.name}
              </td>
              <td>{patient.issue}</td>
              <td>{patient.doctor}</td>
              <td>{patient.disease}</td>
              <td className="time">{patient.appointmentTime}</td>
              <td className={`type ${patient.appointmentType.toLowerCase()}`}>
                {patient.appointmentType}
              </td>
              <td>
                <FaEye
                  className="view-icon"
                  onClick={() => handleViewPatient(patient)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing patient details */}
      {selectedPatient && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Patient Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedPatient.image || "/default-patient-image.jpg"}
                  alt="Patient"
                  className="img-fluid rounded mb-3"
                />
                <p><strong>Name:</strong> {selectedPatient.name}</p>
                <p><strong>Age:</strong> {selectedPatient.age}</p>
                <p><strong>Issue:</strong> {selectedPatient.issue}</p>
                <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
                <p><strong>Appointment Time:</strong> {selectedPatient.appointmentTime}</p>
                <p><strong>Appointment Type:</strong> {selectedPatient.appointmentType}</p>
                <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>
                <p><strong>Address:</strong> {selectedPatient.address}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientManagement;
