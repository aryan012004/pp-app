import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaEye, FaCalendarAlt, FaFilePrescription, FaDownload, FaUpload
} from "react-icons/fa";
import "../Component/PrescriptionAccess.css"; // Keep your custom CSS file

const PrescriptionCard = ({ doctor, onUpload }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file, doctor.id);
    }
  };

  return (
    <div className="appointment-card" style={{ marginTop: '180px' }}>
      <span className="s">{doctor.name}</span>
      <span style={{ marginLeft: '80px', color: "#00a6ff" }}><FaEye /></span>
      <p>Appointment Type: <span>{doctor.type}</span></p>
      <p>Hospital Name: <span>{doctor.hospital}</span></p>
      <p>Appointment Time: <span>{doctor.time}</span></p>
      <p>Patient Issue: <span>{doctor.issue}</span></p>
      
      {/* Upload Section */}
      <div className="upload-section">
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
      </div>
    </div>
  );
};

function AppointmentPrescrton() {
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
      <h2 style={{ marginTop: '20px', marginLeft: '140px' }}>Prescription Access</h2>
      
      {/* Date picker for filtering */}
      <div className="date-picker" style={{ marginLeft: '140px', marginBottom: '20px' }}>
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
      <div style={{ marginLeft: '140px', marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={handleDownload}>
          <FaDownload /> Download Prescription Data
        </button>
      </div>

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

export default AppointmentPrescrton;
