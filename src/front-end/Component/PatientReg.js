import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function PatientReg() {
  let [puser, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    bloodGroup: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    address: '',
    password: '',
    cpass: ''
  });

  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let getValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...puser, [name]: value });
  };

  let togglePassword = () => {
    setShowPassword(!showPassword);
  };

  let toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  let validateUser = async () => {
    if (!puser.firstName || !puser.lastName || !puser.email || !puser.password || !puser.cpass) {
      toast.error('All fields are required');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(puser.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (puser.password !== puser.cpass) {
      toast.error('Password and Confirm Password do not match');
      return false;
    }
    return true;
  };

  let data = async (e) => {
    e.preventDefault();
    const isValid = await validateUser();
    if (isValid) {
      Axios.post("https://patent-doctor-system.onrender.com/pusers", puser)
        .then(() => {
          toast.success('Registered Successfully');
          window.location = "/plog"; 
          setUser({
            firstName: '', lastName: '', email: '', phone: '', age: '', height: '', weight: '',
            gender: '', bloodGroup: '', dob: '', country: '', state: '', city: '', address: '', password: '', cpass: ''
          });
        })
        .catch(() => {
          toast.error('Something Went Wrong');
        });
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.page}>
        <form method="post" onSubmit={data} style={styles.form}>
          <h1 style={styles.heading}>Registration</h1>

          <div style={styles.row}>
            <input type="text" name="firstName" placeholder="Enter First Name" value={puser.firstName} onChange={getValue} style={styles.input} />
            <input type="text" name="lastName" placeholder="Enter Last Name" value={puser.lastName} onChange={getValue} style={styles.input} />
          </div>

          <div style={styles.row}>
            <input type="email" name="email" placeholder="Enter Email Address" value={puser.email} onChange={getValue} style={styles.input} />
            <input type="text" name="phone" placeholder="Enter Phone Number" value={puser.phone} onChange={getValue} style={styles.input} />
          </div>

          <div style={styles.row}>
            <input type="text" name="age" placeholder="Enter Age" value={puser.age} onChange={getValue} style={styles.input} />
            <input type="text" name="height" placeholder="Enter Height" value={puser.height} onChange={getValue} style={styles.input} />
            <input type="text" name="weight" placeholder="Enter Weight" value={puser.weight} onChange={getValue} style={styles.input} />
          </div>

          <div style={styles.row}>
            <select name="gender" value={puser.gender} onChange={getValue} style={styles.input}>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="text" name="bloodGroup" placeholder="Enter Blood Group" value={puser.bloodGroup} onChange={getValue} style={styles.input} />
          </div>

          <div style={styles.row}>
            <input type="date" name="dob" placeholder="Select DOB" value={puser.dob} onChange={getValue} style={styles.input} />
          </div>

          <div style={styles.row}>
            <select name="country" value={puser.country} onChange={getValue} style={styles.input}>
              <option>Select Country</option>
              <option>India</option>
            </select>
            <select name="state" value={puser.state} onChange={getValue} style={styles.input}>
              <option>Select State</option>
              <option>Gujarat</option>
            </select>
            <select name="city" value={puser.city} onChange={getValue} style={styles.input}>
              <option>Select City</option>
              <option>Surat</option>
            </select>
          </div>

          <div style={styles.row}>
            <input type="text" name="address" placeholder="Enter Address" value={puser.address} onChange={getValue} style={styles.input} />
          </div>

          <div style={styles.row}>
            <div style={styles.passwordContainer}>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" value={puser.password} onChange={getValue} style={styles.input} />
              <span onClick={togglePassword} style={styles.icon}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div style={styles.passwordContainer}>
              <input type={showConfirmPassword ? "text" : "password"} name="cpass" placeholder="Confirm Password" value={puser.cpass} onChange={getValue} style={styles.input} />
              <span onClick={toggleConfirmPassword} style={styles.icon}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <input type="submit" value="Register" style={styles.submitButton} />
          <Link to='/plog' style={styles.link}>Already have an account? Login</Link>
        </form>

        <div style={styles.imageContainer}>
          <img src="https://cdn.vectopus.com/getillustrations/illustrations/48195F5B15FF/1E8B3BF8B254/icons-medical-profession-doctor-hospital-healthcare-health-man-care-report-treatment-1024.png" alt="Hospital" style={styles.image} />
          <h2 style={styles.imageText}>Hospital</h2>
          <p style={styles.imageSubText}>You can stay in your hospital and contact your facility</p>
        </div>
      </div>
    </div>
  );
}

export default PatientReg;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',

    
  },
  page: {
    display: 'flex',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',

  },
  form: {
    width: '50%',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  input: {
    width: '48%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  passwordContainer: {
    position: 'relative',
    width: '48%',
  },
  icon: {
    position: 'absolute',
    right: '10px',
    top: '12px',
    cursor: 'pointer',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  imageContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  image: {
    width: '80%',
  },
  imageText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  imageSubText: {
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '10px',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '15px',
    color: '#007bff',
    textDecoration: 'none',
},
};
