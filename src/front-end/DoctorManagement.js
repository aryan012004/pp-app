import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaEye, FaTrash, FaMale, FaFemale } from "react-icons/fa"; // Icons

function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    gender: "",
    qualification: "",
    specialty: "",
    workingTime: "",
    checkUpTime: "",
    breakTime: "",
    image: null,
  });

  useEffect(() => {
    // Fetch doctor data from localStorage or API
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(storedDoctors);
  }, []);

  const handleAddDoctor = () => {
    setShowModal(true);
    setNewDoctor({
      name: "",
      gender: "",
      qualification: "",
      specialty: "",
      workingTime: "",
      checkUpTime: "",
      breakTime: "",
      image: null,
    });
  };

  const handleSaveDoctor = () => {
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDoctor({ ...newDoctor, image: URL.createObjectURL(file) });
    }
  };

  const handleDeleteDoctor = (index) => {
    const updatedDoctors = doctors.filter((_, i) => i !== index);
    setDoctors(updatedDoctors);
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
  };

  const handleEditDoctor = (index) => {
    setNewDoctor(doctors[index]);
    setShowModal(true);
  };

  const handleViewDoctor = (doctor) => {
    setViewDoctor(doctor);
  };

  return (
    <div className=" profile-info card p-4" style={{margin:'0 auto',width:'72%'}}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary">Doctor Management</h2>
        <div className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Search Patient"
            className="form-control me-2"
          />
          <button className="btn btn-primary" onClick={handleAddDoctor} style={{padding:'10px 30px'}}>
             Add Doctor
          </button>
        </div>
      </div>

      <table className="table mt-4 table-hover table-striped">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Gender</th>
            <th>Qualification</th>
            <th>Specialty</th>
            <th>Working Time</th>
            <th>Patient Check Up Time</th>
            <th>Break Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                <p>No Doctor Found Yet</p>
              </td>
            </tr>
          ) : (
            doctors.map((doctor, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={doctor.image || "/default-doctor-image.jpg"}
                    alt="Doctor"
                    style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                  />
                  {doctor.name}
                </td>
                <td>
                  {doctor.gender === "Male" ? (
                    <FaMale style={{ color: "blue" }} />
                  ) : (
                    <FaFemale style={{ color: "pink" }} />
                  )}
                </td>
                <td>{doctor.qualification}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.workingTime}</td>
                <td>{doctor.checkUpTime}</td>
                <td>{doctor.breakTime}</td>
                <td>
                    <FaEdit
                      style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEditDoctor(index)}
                    />
                  <FaEye
                    style={{ color: "green", cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleViewDoctor(doctor)}
                  />
                  <FaTrash
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteDoctor(index)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add/Edit Doctor Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add/Edit Doctor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Doctor Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newDoctor.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      value={newDoctor.gender}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={newDoctor.qualification}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Specialty</label>
                    <input
                      type="text"
                      name="specialty"
                      value={newDoctor.specialty}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Working Time</label>
                    <input
                      type="text"
                      name="workingTime"
                      value={newDoctor.workingTime}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Check Up Time</label>
                    <input
                      type="text"
                      name="checkUpTime"
                      value={newDoctor.checkUpTime}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Break Time</label>
                    <input
                      type="text"
                      name="breakTime"
                      value={newDoctor.breakTime}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveDoctor}
                >
                  Save Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Doctor Modal */}
      {viewDoctor && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Doctor Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewDoctor(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={viewDoctor.image || "/default-doctor-image.jpg"}
                  alt="Doctor"
                  className="img-fluid rounded mb-3"
                />
                <p><strong>Name:</strong> {viewDoctor.name}</p>
                <p><strong>Gender:</strong> {viewDoctor.gender}</p>
                <p><strong>Qualification:</strong> {viewDoctor.qualification}</p>
                <p><strong>Specialty:</strong> {viewDoctor.specialty}</p>
                <p><strong>Working Time:</strong> {viewDoctor.workingTime}</p>
                <p><strong>Patient Check Up Time:</strong> {viewDoctor.checkUpTime}</p>
                <p><strong>Break Time:</strong> {viewDoctor.breakTime}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewDoctor(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorManagement;
