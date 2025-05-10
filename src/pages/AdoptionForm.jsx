import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import '../css/AdoptionForm.css';

const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    adoptionConsent: '',
  });
  
  const [files, setFiles] = useState({
    aadhaarCard: null,
    passport: null,
    voterID: null,
    drivingLicense: null,
    panCard: null,
    birthCertificate: null,
    marriageCertificate: null,
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const submitData = new FormData();
    
    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        submitData.append(key, file);
      }
    });

    try {
      const response = await api.post('/adoption', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage({ type: 'success', text: 'Form submitted successfully!' });
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        adoptionConsent: '',
      });
      setFiles({
        aadhaarCard: null,
        passport: null,
        voterID: null,
        drivingLicense: null,
        panCard: null,
        birthCertificate: null,
        marriageCertificate: null,
      });
      
      // Reset file inputs
      document.getElementById('adoptionForm').reset();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Error submitting the form. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="adoption-container">
      {/* Header Section */}
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>HOPE HAVEN</span>
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#why">Why us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#devs">devs</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero_area">
        <div className="container">
          <div className="col-lg-10 col-md-11 mx-auto">
            <div className="detail-box">
              <div>
                <h1>Adoption Application Form</h1>
                <h4>Begin Your Journey of Love</h4>
                <p>
                  Thank you for considering adoption. Please fill out the form below
                  with accurate information to help us process your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Form Section */}
      <section className="form_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form className="adoption_form" id="adoptionForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel"
                    className="form-control"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Current Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Upload Documents</label>
                  <input 
                    type="file"
                    className="form-control-file"
                    name="aadhaarCard"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <input 
                    type="file"
                    className="form-control-file"
                    name="passport"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <input 
                    type="file"
                    className="form-control-file"
                    name="voterID"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <input 
                    type="file"
                    className="form-control-file"
                    name="drivingLicense"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <input 
                    type="file"
                    className="form-control-file"
                    name="panCard"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <input 
                    type="file"
                    className="form-control-file"
                    name="birthCertificate"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                  <input 
                    type="file"
                    className="form-control-file"
                    name="marriageCertificate"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    className="form-control"
                    rows="4"
                    name="adoptionConsent"
                    placeholder="Consent for adoption (YES/NO)"
                    value={formData.adoptionConsent}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
              {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="container-fluid footer_section">
        <p>
          &copy; {new Date().getFullYear()} All Rights Reserved. Design by
          <a href="https://www.linkedin.com/in/tharunvetrivelan-s-2000b71a5/">
            THARUN VELAN
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AdoptionForm;