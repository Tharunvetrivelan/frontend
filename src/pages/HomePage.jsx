import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('We have successfully collected your data!');
        event.target.reset();
      } else {
        alert('There was an error submitting your form.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className={`header_section ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="navbar">
            <Link to="/" className="navbar-brand">
              HOPE HAVEN
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`navbar-collapse ${menuOpen ? 'show' : ''}`}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#why" onClick={() => setMenuOpen(false)}>Why us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#devs" onClick={() => setMenuOpen(false)}>Devs</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adoption" onClick={() => setMenuOpen(false)}>Join</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <br></br><br></br><br></br>
      {/* Hero Section */}
      <section className="hero_area" style={{ backgroundImage: "url('/images/orphan-bg.jpg')" }}>
        <div className="container">
          <div className="hero-content">
            <h1>HOPE HAVEN</h1>
            <h4>Orphanage Management</h4>
            <p>
              Empowering orphanages to create nurturing homes for every child.
              We provide a digital platform fostering family-like environments, enabling seamless operations and ensuring every child thrives.
            </p>
            <a href="#contact" className="btn">Contact Us</a>
            
            <div className="carousel-indicators">
              <li className="active"></li>
              <li></li>
              <li></li>
              <li></li>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      {/* Why Choose Us Section */}
      <section className="us_section" id="why">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          
          <div className="services-grid">
            <div className="service-card">
              <img src="/images/u1.png" alt="Donation" className="service-icon" />
              <h5 className="service-title">GENUINE NECESSITY DONATION</h5>
              <p className="service-description">Empower Change: Where Genuine Need Meets Your Generosity.</p>
            </div>
            
            <div className="service-card">
              <img src="/images/u-2.png" alt="Adoption" className="service-icon" />
              <h5 className="service-title">ADOPTION</h5>
              <p className="service-description">Uniting hearts through adoption, one family at a time.</p>
            </div>
            
            <div className="service-card">
              <img src="/images/u-3.png" alt="Healthy Food" className="service-icon" />
              <h5 className="service-title">HEALTHY FOOD DONATION</h5>
              <p className="service-description">Nourishing communities with the gift of healthy meals, one plate at a time.</p>
            </div>
            
            <div className="service-card">
              <img src="/images/u-4.png" alt="Secure Data" className="service-icon" />
              <h5 className="service-title">SECURE DATA MANAGEMENT</h5>
              <p className="service-description">Guardians of your data fortress, ensuring safety in every byte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Objective Section */}
      <section className="objective_section" id="OBJECTIVE">
        <div className="container">
          <div className="objective-content">
            <h2 className="section-title">OUR OBJECTIVE</h2>
            <p>
              At Hope Haven Management System, our ethos is grounded in a profound commitment to creating compassionate sanctuaries for vulnerable children. We envision a world where orphanages evolve into nurturing familial havens, transcending traditional models of care and administration.
            </p>
            <p>
              Our objective is to revolutionize orphanage management through innovative digital solutions that prioritize the holistic development of each child. By streamlining administrative tasks, enhancing communication, and providing data-driven insights, we empower orphanages to focus on what truly matters: creating loving, supportive environments where children can heal, grow, and thrive.
            </p>
            <p>
              We are dedicated to fostering a global community of care providers, donors, and volunteers who collaborate to ensure every orphaned child receives the attention, education, and opportunities they deserve. Through our platform, we aim to increase transparency, accountability, and effectiveness in orphanage operations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Devs Section */}
      <section className="devs_section" id="devs">
        <div className="container">
          <h2 className="section-title">Our Devs</h2>
          
          <div className="team-grid">
            <div className="team-card">
              <div className="team-header">
                <h5>Tharunvetrivelan S</h5>
              </div>
              <img src="/images/blank.jpg" alt="Tharunvetrivelan" className="team-image" />
              <div className="team-social">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/portfolio.png" alt="Portfolio" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/linked-in.png" alt="LinkedIn" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/github-logo.png" alt="GitHub" className="social-icon" />
                </a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-header">
                <h5>Yoga Sabarisan</h5>
              </div>
              <img src="/images/blank.jpg" alt="Developer" className="team-image" />
              <div className="team-social">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/portfolio.png" alt="Portfolio" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/linked-in.png" alt="LinkedIn" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/github-logo.png" alt="GitHub" className="social-icon" />
                </a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-header">
                <h5>Prem Kumar R</h5>
              </div>
              <img src="/images/blank.jpg" alt="Developer" className="team-image" />
              <div className="team-social">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/portfolio.png" alt="Portfolio" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/linked-in.png" alt="LinkedIn" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/github-logo.png" alt="GitHub" className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact_section" id="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div>
              <img src="/images/contact-img.jpg" alt="Contact" className="contact-image" />
            </div>
            <div className="contact-form">
              <h2 className="section-title">Contact Us</h2>
              <form id="contactForm" onSubmit={submitForm}>
                <div className="form-group">
                  <input type="text" id="name" className="form-control" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                  <input type="tel" id="phone" className="form-control" placeholder="Phone Number" name="phone" required />
                </div>
                <div className="form-group">
                  <input type="email" id="email" className="form-control" placeholder="Email" name="email" required />
                </div>
                <div className="form-group">
                  <textarea id="message" className="form-control message-box" placeholder="Message" name="message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info_section">
        <div className="container">
          <div className="info-grid">
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
              <div className="info-item">
                <div className="info-icon">
                  <img src="/images/location-white.png" alt="Location" width="25" />
                </div>
                <div>
                  <p>123 Hope Street, Cityville</p>
                </div>
              </div>
            </a>
            
            <a href="tel:+021234567890">
              <div className="info-item">
                <div className="info-icon">
                  <img src="/images/telephone-white.png" alt="Phone" width="25" />
                </div>
                <div>
                  <p>+02 1234567890</p>
                </div>
              </div>
            </a>
            
            <a href="mailto:demo@gmail.com">
              <div className="info-item">
                <div className="info-icon">
                  <img src="/images/envelope-white.png" alt="Email" width="25" />
                </div>
                <div>
                  <p>demo@gmail.com</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer_section">
        <div className="container">
          <p>
            &copy; 2023 All Rights Reserved. Design by
            <a href="https://www.linkedin.com/in/tharunvetrivelan-s-2000b71a5/" target="_blank" rel="noopener noreferrer"> THARUN VELAN</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;