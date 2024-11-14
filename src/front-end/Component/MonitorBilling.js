import React, { useState } from "react";
import {
    FaBell, FaEye,
    FaEdit,
    FaFileMedical,
    FaFilePrescription, FaCalendarAlt,
    FaHeartbeat,FaHospital,FaFileAlt,FaVirus,
  } from "react-icons/fa";
import "../Component/MonitorBilling.css"; 
import { Link } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";

function MonitorBilling() {
  const [bills, setBills] = useState([
    { id: 1, patientName: "Alfredo Vaccaro", diseaseName: "Colds and Flu", phoneNumber: "89564 25462", status: "Paid", date: "2 Jan, 2022", time: "4:30 PM", totalAmount: "₹24,668.00" },
    { id: 2, patientName: "Talan Press", diseaseName: "Conjunctivitis", phoneNumber: "89564 25462", status: "Unpaid", date: "25 Jan, 2022", time: "4:30 PM", totalAmount: "₹10,320.00" },
    // Add more initial bill data if needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  // Open Modal
  const handleOpenModal = (bill) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle adding a new bill
  const handleCreateBill = () => {
    const newBill = {
      id: bills.length + 1,
      patientName: "New Patient",
      diseaseName: "New Disease",
      phoneNumber: "12345 67890",
      status: "Unpaid",
      date: "10 Oct, 2024",
      time: "5:00 PM",
      totalAmount: "₹5,000.00",
    };
    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  // Load bills from localStorage if available
  React.useEffect(() => {
    const storedBills = localStorage.getItem("bills");
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
  }, []);

  return (
    <div className="monitor-billing-container" style={{ width: '85%', marginTop: '140px', marginLeft: '300px', padding: "50px", backgroundColor: 'white' }}>
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
          <button className="btn btn-primary w-100 mb-3">Book Appointment</button>
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
      <section className="header d-flex align-items-center justify-content-between px-4 py-2 bg-light mb-4" style={{ marginTop: '80px' }}>
        <h2>MonitorBilling</h2>
        <div className="buttons d-flex">
          <button className="btn btn-outline-primary mx-2" onClick={() => alert('Edit Design Clicked')}>
            <FaEdit /> Edit Design Invoice
          </button>
          <button className="btn btn-primary" onClick={handleCreateBill}>
            Create Bills
          </button>
        </div>
      </section>

      <table className="table table-striped" style={{ width: '100%', fontSize: '14px' }}>
        <thead>
          <tr>
            <th>Bill Number</th>
            <th>Patient Name</th>
            <th>Disease Name</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.id}</td>
              <td>{bill.patientName}</td>
              <td>{bill.diseaseName}</td>
              <td>{bill.phoneNumber}</td>
              <td>
                <span className={`badge ${bill.status === "Paid" ? "bg-success" : "bg-danger"}`} style={{ padding: '5px', borderRadius: '5px' }}>
                  {bill.status}
                </span>
              </td>
              <td>{bill.date}</td>
              <td>{bill.time}</td>
              <td>
                <FaEye style={{ cursor: "pointer", color: "#00a6ff" }} onClick={() => handleOpenModal(bill)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Bill Details */}
      {selectedBill && (
    <div className="popup-modal">
      <div className="popup-data">
        <div className="popup-header">
          <h3>Invoice</h3>
          <button className="close-btn" onClick={closeModal}>X</button>
        </div>
        <div className="popup-body">
          <div className="hospital-details" >
            <img src="logo_url_here" alt="Hospital Logo" />
            <h4>Hospital Name</h4>
            <p>Tagline here</p>
          </div>
          <div className="patient-details">
            <h5><strong>Dr. Bharat Patel</strong></h5>
            <ul style={{backgroundColor:"#f5f5f5",padding:'10px',borderRadius:"5px"}}>
              <li><strong>Name:</strong> {selectedBill.patientName}</li>
              <li><strong>Gender:</strong> Male</li>
              <li><strong>Age:</strong> 36 Years</li>
              <li><strong>Address:</strong> Some Address</li>
            </ul>
          </div>
          <div className="billing-info">
            <div style={{backgroundColor:'#0e90ff',padding:"7px",color:'white',borderRadius:'5px'}}>
            <span>Description</span> <span style={{marginLeft:'280px'}}>Amount</span> <span style={{marginLeft:'20px'}}>Qty.</span> <span style={{marginLeft:'20px'}}>Total</span>
            </div>
            <div>

              <span>Neuromuscular Blockers</span> <span style={{marginLeft:'201px'}}>1200</span><span style={{marginLeft:'35px'}}>2</span><span style={{marginLeft:'40px'}}>2300</span>
            </div>
              {/* Add other bill items */}
       
            <div className="totals">
              <p>Claim Amount: <span style={{color:'#0e90ff'}}>₹2000</span> </p>
              <p>Total Amount: <span style={{color:'#0e90ff'}}>₹24668</span></p>
            </div>
          </div>
          <div style={{backgroundColor:'#0e90ff',padding:"7px",color:'white',borderRadius:'5px'}}>
            <span>Call: +90854 22354</span>
            <span style={{marginLeft:'270px'}}>Email: Hello@Gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  )}      
    </div>
  );
}

export default MonitorBilling;
