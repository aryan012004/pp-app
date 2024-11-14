import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for hide/show password

function SignIn() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const [forgotPassword, setForgotPassword] = useState(false); // To toggle between login and forgot password screen
    const [errors, setErrors] = useState({}); // For storing validation errors
    const navigate = useNavigate();

    const getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // Check if email is provided
        if (!user.email) {
            formErrors.email = "Email is required";
            isValid = false;
        } else {
            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(user.email)) {
                formErrors.email = "Invalid email format";
                isValid = false;
            }
        }

        // Check if password is provided
        if (!user.password) {
            formErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const data = (e) => {
        e.preventDefault();
        if (validateForm()) {
            Axios.get(`https://patent-doctor-system.onrender.com/users/?email=${user.email}&password=${user.password}`)
                .then((res) => {
                    if (res.data.length === 1) {
                        const loggedInUser = res.data[0];
                        localStorage.setItem('user', JSON.stringify(loggedInUser));
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
        setForgotPassword(true); // Show the forgot password screen
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.container}>
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
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ff4b2b'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ff416c'}
                    >
                        Login
                    </button>
                    <div style={styles.forgotPassword}>
                        <a href="#" onClick={handleForgotPassword} style={styles.forgotPasswordLink}>Forgot Password?</a>
                    </div>
                </form>
            ) : (
                // Forgot Password Form
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
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    heading: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    subHeading: {
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        width: '350px',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: '20px',
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
        marginBottom: '20px',
    },
    checkbox: {
        width: '16px',
        height: '16px',
        borderRadius: '50%', // Makes checkbox round
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    rememberMeLabel: {
        color: '#333',
        fontSize: '14px',
    },
    submitButton: {
        width: '100%',
        padding: '15px',
        borderRadius: '30px',
        border: 'none',
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
        color: 'rgb(33 171 239)',
    },
    forgotPasswordLink: {
        textDecoration: 'none', 
        color: 'rgb(33 171 239)',
    },
    backToLogin: {
        marginTop: '10px',
        textAlign: 'center',
        color: '#ff416c',
    },
    backToLoginLink: {
        textDecoration: 'none',
        color: '#ff416c',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default SignIn;
