import React, { useState, useEffect } from "react";
import { FaBell, FaEye, FaEdit, FaFileMedical, FaFilePrescription } from "react-icons/fa";
import "../Component/MonitorBilling.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function InsuranceBill() {
  const [bills, setBills] = useState(() => {
    const savedBills = localStorage.getItem("bills");
    return savedBills ? JSON.parse(savedBills) : [
      { id: 1, patientName: "Alfredo Vaccaro", diseaseName: "Colds and Flu", insuranceCompany: "HDFC Life", date: "2 Jan, 2022", totalAmount: "₹24,668.00" },
      { id: 2, patientName: "Talan Press", diseaseName: "Conjunctivitis", insuranceCompany: "ICICI Insurance", date: "25 Jan, 2022", totalAmount: "₹10,320.00" }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // For the create bill modal
  const [newBill, setNewBill] = useState({
    id: bills.length + 1,
    patientName: "",
    diseaseName: "",
    insuranceCompany: "",
    date: "",
    totalAmount: ""
  });

  const [selectedBill, setSelectedBill] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Open the view bill modal
  const handleOpenModal = (bill) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  // Open the create bill modal
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  // Close the modals
  const closeModal = () => {
    setShowModal(false);
    setShowCreateModal(false);
  };

  // Save the new bill and store in localStorage
  const handleSaveBill = () => {
    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    closeModal(); // Close the create modal after saving
  };

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

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
              <FaFileMedical className="me-2" /> Personal Health Record
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
        <h2>Monitor Billing</h2>
        <div className="buttons d-flex">
          <button className="btn btn-outline-primary mx-2" onClick={() => alert('Edit Design Clicked')}>
            <FaEdit /> Edit Design Invoice
          </button>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            Create Bills
          </button>
        </div>
      </section>

      <table className="table table-striped" style={{ width: '100%', fontSize: '14px' }}>
        <thead>
          <tr>
            <th>Bill Number</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Disease Name</th>
            <th>Insurance Company</th>
            <th>Insurance Bill</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.id}</td>
              <td>{bill.patientName}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="https://img.pikbest.com/png-images/20240528/portrait-of-male-doctor-with-stethoscope-on-a-transparent-background_10587863.png!sw800"
                    alt="Doctor"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  />
                  <span>Dr. Bharat Patel</span>
                </div>
              </td>
              <td>{bill.diseaseName}</td>
              <td>{bill.insuranceCompany}</td>
              <td>
                <span style={{ color: '#0e90ff' }}>{bill.totalAmount}</span>
              </td>
              <td>{bill.date}</td>
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
              <div className="hospital-details">
                <img src="logo_url_here" alt="Hospital Logo" />
                <h4>Hospital Name</h4>
                <p>Tagline here</p>
              </div>
              <div className="patient-details">
                <h5><strong>Dr. Bharat Patel</strong></h5>
                <ul style={{ backgroundColor: "#f5f5f5", padding: '10px', borderRadius: "5px" }}>
                  <li><strong>Name:</strong> {selectedBill.patientName}</li>
                  <li><strong>Gender:</strong> Male</li>
                  <li><strong>Age:</strong> 36 Years</li>
                  <li><strong>Address:</strong> Some Address</li>
                </ul>
              </div>
              <div className="billing-info">
                <div style={{ backgroundColor: '#0e90ff', padding: "7px", color: 'white', borderRadius: '5px' }}>
                  <span>Description</span> <span style={{ marginLeft: '280px' }}>Amount</span> <br />
                  <span>Insurance Coverage</span> <span style={{ marginLeft: '210px' }}>{selectedBill.totalAmount}</span>
                </div>
              </div>
              <div style={{backgroundColor:'#0e90ff',padding:"7px",color:'white',borderRadius:'5px',marginTop:'50px'}}>
            <span>Call: +90854 22354</span>
            <span style={{marginLeft:'270px'}}>Email: Hello@Gmail.com</span>
          </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Creating New Bill */}
      {showCreateModal && (
        <div className="popup-modal">
          <div className="popup-data">
            <div className="popup-header">
              <h3>Create Bill</h3>
              <button className="close-btn" onClick={closeModal}>X</button>
            </div>
            <div className="popup-body">
              <form>
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="patientName"
                    value={newBill.patientName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Disease Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="diseaseName"
                    value={newBill.diseaseName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Insurance Company</label>
                  <input
                    type="text"
                    className="form-control"
                    name="insuranceCompany"
                    value={newBill.insuranceCompany}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={newBill.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Total Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    name="totalAmount"
                    value={newBill.totalAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="popup-footer">
              <button className="btn btn-primary" onClick={handleSaveBill}>Save Bill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InsuranceBill;
