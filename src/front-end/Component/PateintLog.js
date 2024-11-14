import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for hide/show password

function PateintLog() {
    const [puser, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...puser, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!puser.email) {
            formErrors.email = "Email is required";
            isValid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(puser.email)) {
                formErrors.email = "Invalid email format";
                isValid = false;
            }
        }

        if (!puser.password) {
            formErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const data = (e) => {
        e.preventDefault();
        if (validateForm()) {
            Axios.get(`https://patent-doctor-system.onrender.com/pusers/?email=${puser.email}&password=${puser.password}`)
                .then((res) => {
                    if (res.data.length === 1) {
                        const loggedInUser = res.data[0];
                        localStorage.setItem('puser', JSON.stringify(loggedInUser));
                        navigate(`/home/${loggedInUser.id}`);
                    } else {
                        alert('Username or Password is incorrect');
                    }
                })
                .catch((err) => {
                    alert('Error: Unable to login');
                });
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setForgotPassword(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftColumn}>
                {!forgotPassword ? (
                    <form method="post" onSubmit={data} style={styles.form}>
                        <h1 style={styles.heading}>Login</h1>
                        <div style={styles.inputContainer}>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                onChange={getValue}
                                style={styles.input}
                            />
                            {errors.email && <span style={styles.error}>{errors.email}</span>}
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                onChange={getValue}
                                style={styles.input}
                            />
                            <span onClick={togglePasswordVisibility} style={styles.passwordToggle}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {errors.password && <span style={styles.error}>{errors.password}</span>}
                        </div>
                        <div style={styles.rememberMeContainer}>
                            <input type="checkbox" id="rememberMe" name="rememberMe" style={styles.checkbox} />
                            <label htmlFor="rememberMe" style={styles.rememberMeLabel}>Remember Me</label>
                        </div>
                        <button
                            type="submit"
                            style={styles.submitButton}
                        >
                            Login
                        </button>
                        <div style={styles.forgotPassword}>
                            <a href="#" onClick={handleForgotPassword} style={styles.forgotPasswordLink}>Forgot Password?</a>
                        </div>
                    </form>
                ) : (
                    <form style={styles.form}>
                        <h1 style={styles.heading}>Forgot Password</h1>
                        <p style={styles.subHeading}>
                            Enter your email and we'll send you an OTP to reset your password.
                        </p>
                        <div style={styles.inputContainer}>
                            <input
                                id="emailPhone"
                                type="text"
                                name="emailPhone"
                                placeholder="Enter Email or Phone Number"
                                onChange={getValue}
                                style={styles.input}
                            />
                        </div>
                        <button
                            type="submit"
                            style={styles.submitButton}
                            onClick={() => alert('OTP sent')}
                        >
                            Get OTP
                        </button>
                        <div style={styles.backToLogin}>
                            <a href="#" onClick={() => setForgotPassword(false)} style={styles.backToLoginLink}>Back to Login</a>
                        </div>
                    </form>
                )}
            </div>
            <div style={styles.rightColumn}>
                <img src="https://cdn.vectopus.com/getillustrations/illustrations/48195F5B15FF/1E8B3BF8B254/icons-medical-profession-doctor-hospital-healthcare-health-man-care-report-treatment-1024.png" alt="Hospital Illustration" style={styles.image} />
                <h2 style={styles.hospitalTitle}>Hospital</h2>
                <p style={styles.hospitalTagline}>You can stay in touch with your hospital and contact your facility anytime!</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    leftColumn: {
        width: '35%',  // Decreased from 50%
        padding: '20px', // Decreased padding
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '10px 0 0 10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    rightColumn: {
        width: '35%', // Decreased from 50%
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f7ff',
        padding: '20px', // Decreased padding
        borderRadius: '0 10px 10px 0',
    },
    form: {
        width: '100%',
    },
    heading: {
        fontSize: '24px',  // Slightly reduced size
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: '15px',  // Reduced margin
    },
    input: {
        height: '35px',  // Reduced input height
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #ddd',
        paddingLeft: '15px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    passwordToggle: {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    },
    rememberMeContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',  // Reduced margin
    },
    checkbox: {
        width: '16px',
        height: '16px',
        marginRight: '10px',
    },
    submitButton: {
        width: '100%',
        padding: '10px', // Reduced padding
        borderRadius: '30px',
        backgroundColor: 'rgb(165 165 165)',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
    },
    forgotPassword: {
        marginTop: '10px',
        textAlign: 'center',
    },
    forgotPasswordLink: {
        textDecoration: 'none',
        color: 'rgb(33 171 239)',
    },
    image: {
        width: '60%',  // Reduced image size
        height: 'auto',
    },
    hospitalTitle: {
        fontSize: '22px', // Reduced font size
        fontWeight: 'bold',
        color: '#0073e6',
    },
    hospitalTagline: {
        fontSize: '14px', // Reduced font size
        color: '#333',
        textAlign: 'center',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        fontSize: '12px',
    },
    backToLogin: {
        marginTop: '15px',  // Adjusted margin
        textAlign: 'center',
    },
    backToLoginLink: {
        textDecoration: 'none',
        color: '#0073e6',
    },
};

export default PateintLog;
