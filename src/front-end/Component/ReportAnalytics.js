import React from 'react';
import { FaUserAlt, FaRedo, FaHospital, FaFileAlt,FaBell, FaEye, FaEdit, FaWallet,
    FaFileMedical, FaFilePrescription, FaCalendarAlt} from 'react-icons/fa';
    import { Link } from "react-router-dom";
import { Modal, Dropdown } from "react-bootstrap";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip } from 'recharts';

function ReportAnalytics() {
  const data = []; // For Line Graphs and Pie Charts
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF69B4", "#9932CC"];
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa' ,width:'89%',marginLeft:'222px',marginTop:'50px' }}>
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
      {/* First Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {["Total Patients", "Repeat Patient", "Admitted Patient", "Total Claim"].map((label, i) => (
          <div key={i} style={{ flex: 1, margin: '0 10px', backgroundColor: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '24px', color: '#007bff' }}>{i === 0 ? <FaUserAlt /> : i === 1 ? <FaRedo /> : i === 2 ? <FaHospital /> : <FaFileAlt />}</div>
            <h5>{label}</h5>
            <h3>00</h3>
          </div>
        ))}
      </div>

      {/* Second Section (Graph Area) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ flex: 1, margin: '0 10px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <h5>Appointment</h5>
          {/* Line Chart for Appointment */}
          <LineChart width={400} height={200} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
            <Tooltip />
          </LineChart>
          <img src="https://via.placeholder.com/100" alt="No Patient" />
        </div>
        <div style={{ flex: 1, margin: '0 10px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <h5>Patients Summary</h5>
          {/* Line Chart for Patients Summary */}
          <LineChart width={400} height={200} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
            <Tooltip />
          </LineChart>
        </div>
      </div>

      {/* Third Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, margin: '0 10px', backgroundColor: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <h5>Patients Count Department</h5>
          <img src="https://www.plancover.com/simplify-insurance/wp-content/uploads/2024/02/cashless-claim-process-3-04-2-1024x1001.png"style={{height:"300px",width:"380px"
          }} alt="No Patient" />
         
        </div>
        <div style={{ flex: 1, margin: '0 10px', backgroundColor: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <h5>Doctor Count Department</h5>
          <img src="https://gotodoctor.ca/wp-content/uploads/2021/05/illustration-1-3.png"style={{height:"250px",width:"380px",objectFit:"fill",marginTop:'20px'
          }} alt="No Patient" />
        
        </div>
        <div style={{ flex: 1, margin: '0 10px', backgroundColor: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <h5>Patients Age</h5>
          <PieChart width={200} height={200}>
            <Pie data={data} cx={100} cy={100} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default ReportAnalytics;
