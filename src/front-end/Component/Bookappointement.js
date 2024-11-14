import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaBell, FaEye, FaCalendarAlt, FaFileMedical, FaFilePrescription, FaHeartbeat, FaPhoneAlt, FaTimes
} from "react-icons/fa";
import "../Component/Bookappointeme.css"; 
import { Link } from "react-router-dom";

import { Dropdown } from "bootstrap";
const PrescriptionCard = ({ doctor, onCancel, onCall }) => (
  <div className="prescription-card">
    <div className="card-header">
      <span className="doctor-name">{doctor.name}</span>
      <div className="icons">
        <FaCalendarAlt className="icon" />
        <FaEye className="icon" />
      </div>
    </div>
    <div className="card-body">
      <p>Appointment Type: <span>{doctor.type}</span></p>
      <p>Hospital Name: <span>{doctor.hospital}</span></p>
      <p>Appointment Time: <span>{doctor.time}</span></p>
      <p>Patient Issue: <span>{doctor.issue}</span></p>
    </div>
    <div className="card-footer">
      <button className="cancel-btn" onClick={() => onCancel(doctor.id)}>
        <FaTimes /> Cancel
      </button>
      <button className="call-btn" onClick={() => onCall(doctor.id)}>
        <FaPhoneAlt /> Join Call
      </button>
    </div>
  </div>
);

function Bookappointement() {
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Dr. Ryan Vetrov", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired" },
    { id: 2, name: "Dr. Cristofer", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired" },
    { id: 3, name: "Dr. Davis Donin", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired" },
    { id: 4, name: "Dr. Terry Calzoni", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ date: new Date(), time: "03:00 PM - 04:00 PM" });

  const handleCancel = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
    console.log(`Cancel appointment ${id}`);
  };

  const handleCall = (id) => {
    console.log(`Join call for appointment ${id}`);
  };

  const handleSave = () => {
    const newAppointment = {
      id: appointments.length + 1,
      name: "Dr. New Appointment",
      type: "Online",
      hospital: "Shambua Hospital",
      time: popupData.time,
      issue: "New Issue",
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setShowPopup(false);
  };

  return (
    <div className="prescription-container">
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
              <FaFileMedical className="me-2" /> Personal Health Record
            </li>
            <li className="mb-3">
              <Link to="apbooke" style={{ textDecoration: 'none' ,color:'black'}}>
                <FaFilePrescription className="me-2" />Appointment Booking
              </Link>
            </li>
            <li className="mb-3">
            <FaFilePrescription/> <Link to="precriptionas" style={{ textDecoration: 'none' ,color:'black'}}>Prescription Access</Link>
            </li>
            <li className="mb-3">
              <Dropdown>
                <Dropdown.Toggle variant="light">
                  <FaFileMedical className="me-2" /> Bill and Payments
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item><Link style={{ textDecoration: 'none',color:"black" }} to="bills">Monitor Bill</Link></Dropdown.Item>
                  <Dropdown.Item><Link style={{ textDecoration: 'none',color:"black" }} to="bills">Insurance Claims</Link></Dropdown.Item>
                  <Dropdown.Item><Link style={{ textDecoration: 'none',color:'black'}} to="bills">Payment Process</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="mb-3">
             <FaFileMedical className="me-2" /> <Link to="precriptionas" style={{ textDecoration: 'none' ,color:'black'}}>Report Analytics</Link>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <button className="btn btn-primary w-100 mb-3">Book Appointment</button>
          <button className="btn btn-danger w-100">Logout</button>
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

      <h2 style={{marginTop:'50px'}}>My Appointments</h2>
      <div className="appointment-cards">
        {appointments.map((doctor) => (
          <PrescriptionCard
            key={doctor.id}
            doctor={doctor}
            onCancel={handleCancel}
            onCall={handleCall}
          />
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Reschedule Appointment</h3>
            <div>
              <label>Select Date</label>
              <DatePicker selected={popupData.date} onChange={(date) => setPopupData({ ...popupData, date })} />
            </div>
            <div>
              <label>Select Time</label>
              <select value={popupData.time} onChange={(e) => setPopupData({ ...popupData, time: e.target.value })}>
                <option>03:00 PM - 04:00 PM</option>
                <option>04:00 PM - 05:00 PM</option>
                <option>05:00 PM - 06:00 PM</option>
              </select>
            </div>
            <div className="popup-actions">
              <button className="btn btn-danger" onClick={() => setShowPopup(false)}>
                <FaTimes /> Close
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <FaCalendarAlt /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookappointement;
