import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Dropdown } from "react-bootstrap";
import {
    FaBell, FaEye,
    FaEdit,
    FaFileMedical,
    FaFilePrescription, FaCalendarAlt,
    FaHeartbeat,FaHospital,FaFileAlt,FaVirus,
  } from "react-icons/fa";
  import { Link } from "react-router-dom"
// import {
//   FaEye, FaCalendarAlt, FaFilePrescription, FaDownload, FaUpload
// } from "react-icons/fa";
import "../Component/PrescriptionAccess.css"; // Keep your custom CSS file

const PrescriptionCard = ({ doctor, onUpload }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file, doctor.id);
    }
  };

  return (
    <div className="appointment-card"
    >
      <span className="s">{doctor.name}</span>
      <span style={{ marginLeft: '80px', color: "#00a6ff" }}><FaEye /></span>
      <p>Appointment Type: <span>{doctor.type}</span></p>
      <p>Hospital Name: <span>{doctor.hospital}</span></p>
      <p>Appointment Time: <span>{doctor.time}</span></p>
      <p>Patient Issue: <span>{doctor.issue}</span></p>
      
      {/* Upload Section */}
      {/* <div className="upload-section">
        <label htmlFor={`upload-${doctor.id}`} className="upload-label">
          <FaUpload /> Upload Prescription
        </label>
        <input
          id={`upload-${doctor.id}`}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div> */}
    </div>
  );
};

function Prescrtion() {
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Dr. Nolan George", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired", file: null },
    { id: 2, name: "Dr. Cristofer", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired", file: null },
    { id: 3, name: "Dr. Davis Donin", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired", file: null },
    { id: 4, name: "Dr. Terry Calzoni", type: "Online", hospital: "Shambua Hospital", time: "10:20 AM", issue: "Feeling Tired", file: null },
  ]);

  const [startDate, setStartDate] = useState(new Date("2022/01/02"));
  const [endDate, setEndDate] = useState(new Date("2022/01/13"));

  const handleUpload = (file, id) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, file } : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleDownload = () => {
    const data = appointments.map((appointment) => ({
      Doctor: appointment.name,
      Hospital: appointment.hospital,
      Time: appointment.time,
      Issue: appointment.issue,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prescriptions.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="appointments-container">
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
      <h2 style={{marginLeft: '140px' }}>Prescription Access</h2>
      
      {/* Date picker for filtering */}
      <div className="d" style={{ marginLeft: '500px', marginBottom: '30px' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="d MMM, yyyy"
        />
        <span> - </span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="d MMM, yyyy"
        />
      </div>

      {/* Download Button */}
      {/* <div style={{ marginLeft: '140px', marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={handleDownload}>
          <FaDownload /> Download Prescription Data
        </button>
      </div> */}

      {/* Prescription Cards */}
      <div className="appointment-cards">
        {appointments.map((doctor) => (
          <PrescriptionCard
            key={doctor.id}
            doctor={doctor}
            onUpload={handleUpload}
          />
        ))}
      </div>
    </div>
  );
}

export default Prescrtion;
