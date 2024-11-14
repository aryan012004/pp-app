import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reg() {
    let [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        hospital: '',
        password: '',
        cpass: ''
    });
    
    let [showPassword, setShowPassword] = useState(false);
    let [showConfirmPassword, setShowConfirmPassword] = useState(false);
    let [hospitals, setHospitals] = useState([]);
    let [showHospitalModal, setShowHospitalModal] = useState(false);
    let [newHospital, setNewHospital] = useState({
        hospitalName: '',
        hospitalAddress: '',
        country: '',
        state: '',
        city: '',
        zipcode: ''
    });

    // Fetch hospitals on page load
    useEffect(() => {
        Axios.get("https://patent-doctor-system.onrender.com/hospitals")
            .then((response) => {
                setHospitals(response.data);
            })
            .catch(() => {
                toast.error("Failed to load hospitals");
            });
    }, []);

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    let togglePassword = () => {
        setShowPassword(!showPassword);
    };

    let toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    let validateUser = async () => {
        // Basic validation for required fields
        if (!user.firstName || !user.lastName || !user.email || !user.password || !user.cpass) {
            toast.error('All fields are required');
            return false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(user.email)) {
            toast.error('Invalid email format');
            return false;
        }

        try {
            const firstNameRes = await Axios.get("https://patent-doctor-system.onrender.com/users/?firstName=" + user.firstName);
            if (firstNameRes.data.length > 0) {
                toast.error('First Name is already in use');
                return false;
            }

            const emailRes = await Axios.get("https://patent-doctor-system.onrender.com/users/?email=" + user.email);
            if (emailRes.data.length > 0) {
                toast.error('Email is already in use');
                return false;
            }

            if (user.password !== user.cpass) {
                toast.error('Password and Confirm Password do not match');
                return false;
            }

            return true;
        } catch (error) {
            toast.error('Something went wrong');
            return false;
        }
    };

    let data = async (e) => {
        e.preventDefault();
        const isValid = await validateUser();
        if (isValid) {
            Axios.post("https://patent-doctor-system.onrender.com/users", user)
                .then(() => {
                    toast.success('Registered Successfully');
                    
                    setUser({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        country: '',
                        state: '',
                        city: '',
                        hospital: '',
                        password: '',
                        cpass: ''
                    });
                    toast.success('Registered Successfully');
                    window.location = "/signin"; 
                })
                .catch(() => {
                    toast.error('Something Went Wrong');
                });
        }
    };

    let handleNewHospitalChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setNewHospital({ ...newHospital, [name]: value });
    };

    let saveHospital = () => {
        if (!newHospital.hospitalName || !newHospital.hospitalAddress || !newHospital.country || !newHospital.state || !newHospital.city || !newHospital.zipcode) {
            toast.error("All fields are required for hospital creation");
            return;
        }
        
        Axios.post("https://patent-doctor-system.onrender.com/hospitals", newHospital)
            .then((response) => {
                setHospitals([...hospitals, response.data]);
                setShowHospitalModal(false);
                toast.success('Hospital created successfully');
            })
            .catch(() => {
                toast.error('Failed to add hospital');
            });
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <form method="post" onSubmit={data} style={styles.form}>
                <h1 style={styles.heading}>Registration</h1>
                {/* Form Fields */}
                <div style={styles.row}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={user.firstName}
                        onChange={getValue}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={user.lastName}
                        onChange={getValue}
                        style={styles.input}
                    />
                </div>
                <div style={styles.row}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={user.email}
                        onChange={getValue}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={user.phone}
                        onChange={getValue}
                        style={styles.input}
                    />
                </div>
                <div style={styles.row}>
                    <select name="country" value={user.country} onChange={getValue} style={styles.select}>
                        <option>Select Country</option>
                        <option>India</option>
                    </select>
                    <select name="state" value={user.state} onChange={getValue} style={styles.select}>
                        <option>Select State</option>
                        <option>Gujarat</option>
                    </select>
                    <select name="city" value={user.city} onChange={getValue} style={styles.select}>
                        <option>Select City</option>
                        <option>Surat</option>
                        <option>Ahmedabad</option>
                        <option>Rajkot</option>
                    </select>
                </div>

                <div style={styles.row}>
                    <select
                        name="hospital"
                        value={user.hospital}
                        onChange={getValue}
                        style={styles.select}
                    >
                        <option>Select Hospital</option>
                        {hospitals.map((hospital, index) => (
                            <option key={index} value={hospital.hospitalName}>{hospital.hospitalName}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={() => setShowHospitalModal(true)}
                    style={styles.createHospitalButton}
                >
                    Create Hospital
                </button>
                <div style={styles.row}>
                    <div style={styles.passwordContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={user.password}
                            onChange={getValue}
                            style={styles.input}
                        />
                        <span onClick={togglePassword} style={styles.icon}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div style={styles.passwordContainer}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="cpass"
                            placeholder="Confirm Password"
                            value={user.cpass}
                            onChange={getValue}
                            style={styles.input}
                        />
                        <span onClick={toggleConfirmPassword} style={styles.icon}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                
                <input
                    type="submit"
                    value="Register"
                    style={styles.submitButton}
                />
                <Link to='/signin' style={styles.link}>Already have an account? Login</Link>
                <Link to='/preg' style={styles.link} >Pateint  Login</Link>
            </form>
            
            {/* Hospital Modal */}
            {showHospitalModal && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalHeading}>Create Hospital</h2>
                        <input
                            type="text"
                            name="hospitalName"
                            placeholder="Hospital Name"
                            onChange={handleNewHospitalChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="hospitalAddress"
                            placeholder="Hospital Address"
                            onChange={handleNewHospitalChange}
                            style={styles.input}
                        />
                        <div style={styles.row}>
                            <select name="country" onChange={handleNewHospitalChange} style={styles.select}>
                                <option>Select Country</option>
                                <option>India</option>
                            </select>
                            <select name="state" onChange={handleNewHospitalChange} style={styles.select}>
                                <option>Select State</option>
                                <option>Gujarat</option>
                            </select>
                            <select name="city" onChange={handleNewHospitalChange} style={styles.select}>
                                <option>Select City</option>
                                <option>Surat</option>
                                <option>Ahmedabad</option>
                                <option>Rajkot</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            name="zipcode"
                            placeholder="Zipcode"
                            onChange={handleNewHospitalChange}
                            style={styles.input}
                        />
                        <div style={styles.modalButtons}>
                            <button onClick={saveHospital} style={styles.saveButton}>Save</button>
                            <button onClick={() => setShowHospitalModal(false)} style={styles.cancelButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reg;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    form: {
        width: '400px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
    },
    input: {
        height: '40px',
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #ddd',
        paddingLeft: '15px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    select: {
        height: '40px',
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #ddd',
        paddingLeft: '15px',
        fontSize: '16px',
        boxSizing: 'border-box',
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
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    link: {
        display: 'block',
        textAlign: 'center',
        marginTop: '15px',
        color: '#007bff',
        textDecoration: 'none',
    },
    createHospitalButton: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    modalBackdrop: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
    },
    modalHeading: {
        textAlign: 'center',
        marginBottom: '15px',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
    },
    modalButton: {
        width: '48%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    }
};
