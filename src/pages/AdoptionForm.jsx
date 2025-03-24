import React, { useState, useEffect } from 'react';
import api from './api';


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
    <div className="adoption-page" style={{ backgroundImage: "url('/images/donations-bg.jpg')" }}>
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="/">
                <span>HOPE HAVEN</span>
              </a>
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
                      <a className="nav-link" href="/#devs">Devs</a>
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

        {/* Slider Section */}
        <section className="slider_section position-relative">
          <div id="customCarousel1" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
              <li data-target="#customCarousel1" data-slide-to="1"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" style={{backgroundImage: "url('/images/slider-bg1.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="box">
                  <div className="baby_detail">
                    <div className="baby_text">
                      <h2>
                        GENUINE <br />
                        NECESSITY DONATION
                      </h2>
                    </div>
                    <a href="">Donate</a>
                  </div>
                  <div className="care_detail">
                    <a href="#Form">FORM</a>
                    <div className="care_text">
                      <h2>
                        Register <br />
                        for <br />
                        adoption
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="carousel-item" style={{backgroundImage: "url('/images/slider-bg3.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="box">
                  <div className="baby_detail">
                    <div className="baby_text">
                      <h2>
                        HEALTHY <br />
                        FOOD DONATION
                      </h2>
                    </div>
                    <a href="">Read More</a>
                  </div>
                  <div className="care_detail">
                    <a href="">DATA GOVERNANCE</a>
                    <div className="care_text">
                      <h2>
                        We will take <br />
                        Care of <br />
                        your Baby
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="contact_section layout_padding-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="contact-form">
                <div className="heading_container">
                  <h2>ADOPTION FORM</h2>
                </div>
                {message && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {message.text}
                  </div>
                )}
                <form id="adoptionForm" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Full name" 
                    value={formData.fullName}
                    onChange={handleChange}
                    required 
                  />
                  <div className="top_input">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                    <input 
                      type="text" 
                      name="phoneNumber" 
                      placeholder="Phone Number" 
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required 
                  />
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Address" 
                    className="message_input" 
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                  
                  {/* Document upload fields */}
                  <label htmlFor="aadhaarCard">Aadhaar Card</label>
                  <input 
                    type="file" 
                    id="aadhaarCard" 
                    name="aadhaarCard" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <label htmlFor="passport">Passport</label>
                  <input 
                    type="file" 
                    id="passport" 
                    name="passport" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <label htmlFor="voterID">Voter ID</label>
                  <input 
                    type="file" 
                    id="voterID" 
                    name="voterID" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <label htmlFor="drivingLicense">Driving License</label>
                  <input 
                    type="file" 
                    id="drivingLicense" 
                    name="drivingLicense" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <label htmlFor="panCard">PAN Card</label>
                  <input 
                    type="file" 
                    id="panCard" 
                    name="panCard" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <label htmlFor="birthCertificate">Birth Certificate</label>
                  <input 
                    type="file" 
                    id="birthCertificate" 
                    name="birthCertificate" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <label htmlFor="marriageCertificate">Marriage Certificate (if applicable)</label>
                  <input 
                    type="file" 
                    id="marriageCertificate" 
                    name="marriageCertificate" 
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf" 
                  />
                  
                  <input 
                    type="text" 
                    name="adoptionConsent" 
                    placeholder="Consent for adoption (YES/NO)" 
                    value={formData.adoptionConsent}
                    onChange={handleChange}
                    required 
                  />
                  
                  <div className="btn-box">
                    <button type="submit" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Send'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer_section container-fluid">
        <p>
          &copy; {new Date().getFullYear()} All Rights Reserved. Design by
          <a href="https://html.design/">Tharun Velan</a>
        </p>
      </footer>
    </div>
  );
};

export default AdoptionForm;