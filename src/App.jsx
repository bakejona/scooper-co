import React, { useState } from "react";

// Main App component
const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    dogs: "",
    yardSize: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleYardSizeClick = (size) => {
    setFormData((prevData) => ({ ...prevData, yardSize: size }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        // Reset form after a successful submission
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          service: "",
          dogs: "",
          yardSize: "",
          message: "",
        });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <>
      <style>
        {`
          /* Global Styles */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=DM+Sans:wght@400;600;700;800&display=swap');
          
          * {
              box-sizing: border-box;
          }
          
          body {
              font-family: 'DM Sans', sans-serif;
              background-color: #fff;
              color: #2d3748;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              scroll-behavior: smooth;
              margin: 0;
              padding: 0;
              min-height: 100vh;
          }

          .app-container {
              padding-top: 5rem;
          }
          
          /* Animations */
          @keyframes fade-in-down {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          
          .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
          .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
          .animate-fade-in { animation: fade-in 1.2s ease-out; }
          
          /* Navigation */
          .nav-bar {
              position: fixed;
              top: 0;
              width: 100%;
              z-index: 50;
              padding: 1rem 1.5rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: #fff;
          }
          
          .nav-brand {
              font-size: 1.5rem;
              font-weight: 700;
              color: #058250;
              text-decoration: none;
              font-family: 'Poppins', sans-serif;
          }
          
          .nav-links {
              display: flex;
              gap: 1.5rem;
              font-size: 1.125rem;
              font-weight: 700;
              color: #2d3748;
          }
          
          .nav-item {
              text-decoration: none;
              transition: color 0.3s ease-in-out;
              font-weight: 600;
              color: #2d3748;
              
          }
          
          .nav-item:hover {
              color: #058250
              ;
          }
          
          /* Sections */
          .hero-section {
              position: relative;
              height: 100vh;
              display: flex;
              align-items: center;
              text-align: left;
              color: #fff;
              border-bottom-left-radius: 1rem;
              border-bottom-right-radius: 1rem;
              background-size: cover;
              background-position: center;
          }
          
          .hero-overlay {
              position: absolute;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.35);
              border-bottom-left-radius: 1.5rem;
              border-bottom-right-radius: 1.5rem;
          }
          
          .hero-content {
              z-index: 10;
              padding: 0 6rem;
          }
          
          .hero-title {
              font-size: 2.25rem;
              font-weight: 800;
              margin-bottom: 1rem;
              font-family: 'Poppins', sans-serif;
              
          }
          
          .hero-subtitle {
              max-width: 50rem;
              margin-right: auto;
              margin-bottom: 2rem;
              font-weight: 700;

          }
          
            .cta-button {
              background-color: #058250;
              color: #fff;
              font-weight: 700;
              padding: 0.75rem 1.25rem;
              border-radius: 9999px;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              transition: transform 0.3s ease-in-out;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
          }
          
          .cta-button:hover {
              transform: scale(1.05);
              background-color: #2f855a;
          }

          .cta-button img {
            margin-left: 0.5rem;
            width: 24px;
            height: 24px;
            filter: invert(100%);
          }
          
          .services-section {
              padding: 5rem 1.5rem;
              background-color: #fff;
              text-align: center;
          }
          
          .section-title {
              font-size: 2.25rem;
              font-weight: 800;
              color: #2d3748;
              margin-bottom: 3rem;
              font-family: 'Poppins', sans-serif;
          }
          
          .services-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2.5rem;
          }
          
          .service-card {
              background-color: #f7fafc;
              padding: 2rem;
              border-radius: 0.5rem;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              transition: transform 0.3s ease-in-out;
          }
          
          .service-card:hover {
              transform: scale(1.05);
          }
          
          .service-icon {
              font-size: 2.25rem;
              color: #058250;
              margin-bottom: 1rem;
          }
          
          .service-title {
              font-size: 1.5rem;
              font-weight: 700;
              margin-bottom: 1rem;
              font-family: 'Poppins', sans-serif;
          }
          
          .service-description {
              color: #4a5568;
          }
          
          .about-section {
              padding: 3rem 5rem;
              background-color: #f7fafc;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
              text-align: center;
              border-radius: 1.5rem;

          }
          
          .about-image-container {
              border-radius: 0.5rem;
              overflow: hidden;
              transition: transform 0.3s ease-in-out;
          }
          
          
          
          .about-image {
              width: 75%;
              height: auto;
              object-fit: cover;
              border-radius: 0.5rem;

          }
          
          .about-text-content {
              padding: 1rem;
          }
          
          .about-text {
              font-size: 1.125rem;
              color: #4a5568;
              line-height: 1.625;
              margin-bottom: 1rem;
          }
          
          .about-text-bold {
              font-size: 1.125rem;
              font-weight: 700;
              margin-top: 1rem;
              color: #4a5568;
              line-height: 1.625;
          }
          
          .contact-section {
              padding: 5rem 1.5rem;
              background-color: #fff;
              text-align: center;
          }
          
          .form-container {
              max-width: 48rem;
              margin-left: auto;
              margin-right: auto;
              padding: 2rem;
              background-color: #f7fafc;
              border-radius: 0.5rem;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .contact-form {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
          }
          
          .form-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.5rem;
          }
          
          .form-input, .form-select, .form-textarea {
              width: 100%;
              padding: 0.75rem;
              border-radius: 0.375rem;
              border: 1px solid #e2e8f0;
              transition: all 0.2s ease-in-out;
              box-shadow: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              background-color: #fff;
              color: #2d3748;
          }
          
          .form-input:focus, .form-select:focus, .form-textarea:focus {
              outline: none;
              border-color: #058250;
              box-shadow: 0 0 0 2px rgba(72, 187, 120);
          }
          
          .form-label {
              display: block;
              text-align: left;
              color: #4a5568;
              font-weight: 700;
              margin-bottom: 0.5rem;
          }
          
          .yard-size-options {
              display: flex;
              justify-content: space-around;
              gap: 1rem;
          }
          
          .yard-size-item {
              flex: 1;
              padding: 1rem;
              border-radius: 0.5rem;
              cursor: pointer;
              transition: all 0.2s ease-in-out;
              border: 2px solid #e2e8f0;
              background-color: #fff;
          }
          
          .yard-size-item:hover {
              background-color: #f7fafc;
          }
          
          .yard-size-item.selected {
              border-color: #058250;
              background-color: #e6ffed;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          .yard-size-icon {
              font-size: 2.25rem;
              display: block;
              margin-bottom: 0.5rem;
          }
          
          .yard-size-label {
              font-size: 0.875rem;
              font-weight: 600;
              color: #4a5568;
          }
          
          .submit-button {
              width: 100%;
              background-color: #058250;
              color: #fff;
              font-weight: 700;
              padding: 0.75rem 1.5rem;
              border-radius: 0.375rem;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              transition: transform 0.2s ease-in-out;
              border: none;
              cursor: pointer;
          }
          
          .submit-button:hover {
              background-color: #2f855a;
              transform: scale(1.05);
          }
          
          .submit-button:disabled {
              background-color: #a0aec0;
              cursor: not-allowed;
              transform: scale(1);
          }
          
          .success-message {
              margin-top: 1.5rem;
              padding: 1rem;
              background-color: #e6ffed;
              color: #2f855a;
              border-radius: 0.5rem;
              text-align: center;
              font-weight: 600;
          }
          
          .error-message {
              margin-top: 1.5rem;
              padding: 1rem;
              background-color: #fff5f5;
              color: #e53e3e;
              border-radius: 0.5rem;
              text-align: center;
              font-weight: 600;
          }
          
          /* Media Queries for responsiveness */
          @media (min-width: 768px) {
              .nav-bar {
                  padding: 1rem 3rem;
              }
              .hero-title {
                  font-size: 3.75rem;
              }
              .hero-subtitle {
                  font-size: 1.25rem;
              }
              .services-grid {
                  grid-template-columns: repeat(3, 1fr);
              }
              .about-section {
                  flex-direction: row;
                  text-align: left;
              }
              .about-image-container {
                  width: 50%;
              }
              .about-text-content {
                  width: 50%;
              }
              .form-grid {
                  grid-template-columns: repeat(2, 1fr);
              }
          }
        `}
      </style>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="nav-bar">
          <a href="#home" className="nav-brand">
            Scooper Co.
          </a>
          <div className="nav-links">
            <a href="#home" className="nav-item">
              home
            </a>
            <a href="#about" className="nav-item">
              about
            </a>
            <a href="#contact" className="nav-item">
              contact
            </a>
          </div>
        </nav>

        {/* Hero Section (Home) */}
        <section
          id="home"
          className="hero-section"
          style={{
            backgroundImage: "url('/images/sc-hero.jpeg')",
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title animate-fade-in-down">
              Taking care of business,
              <br /> so you don't have to.
            </h1>
            <p className="hero-subtitle animate-fade-in">
              Expert pet waste management to keep your yard clean, safe, and
              beautiful.
            </p>
            <a href="#contact" className="cta-button animate-fade-in-up">
              Schedule a cleanup{" "}
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/fluency-systems-regular/48/right--v1.png"
                alt="right--v1"
              />
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {/* One-Time Cleanups */}
            <div className="service-card">
              <div className="service-icon">
                <span role="img" aria-label="One-Time Cleanup">
                  🧹
                </span>
              </div>
              <h3 className="service-title">One-Time Cleanups</h3>
              <p className="service-description">
                Perfect for special events, before a move, or just to get your
                yard back in shape. Our one-time service provides a thorough,
                deep clean.
              </p>
            </div>
            {/* Routine Cleanups */}
            <div className="service-card">
              <div className="service-icon">
                <span role="img" aria-label="Routine Cleanup">
                  🗓️
                </span>
              </div>
              <h3 className="service-title">Routine Cleanups</h3>
              <p className="service-description">
                Choose from weekly, bi-weekly, or monthly visits. We handle the
                dirty work so you can enjoy a consistently clean yard without
                the hassle.
              </p>
            </div>
            {/* Yard Deodorizing */}
            <div className="service-card">
              <div className="service-icon">
                <span role="img" aria-label="Deodorizing">
                  👃
                </span>
              </div>
              <h3 className="service-title">Yard Deodorizing</h3>
              <p className="service-description">
                Beyond just scooping, our yard deodorizing service eliminates
                foul odors, leaving your lawn smelling fresh and clean.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-image-container">
            <img
              src="/images/sc-about.jpg"
              alt="Landon, owner of Scooper Co."
              className="about-image"
            />
          </div>
          <div className="about-text-content">
            <h2 className="section-title">Why choose Scooper Co?</h2>
            <p className="about-text">
              Hey there! I’m Landon — husband, dad of three awesome kids,
              veteran, Christian, and lifelong dog lover. I started Scooper Co.
              because, let’s be honest… no one likes stepping in dog poop.
              Growing up, I hated being on poop patrol, and now I’m making sure
              you don’t have to be!
            </p>
            <p className="about-text">
              At Scooper Co., we’re all about quality service and results you
              can actually see (and smell…less of). Whether you’ve got one dog
              or a whole pack, we’re here to help you keep your yard clean, your
              shoes safe, and your weekends poop-free.
            </p>
            <p className="about-text-bold">
              Let us handle the dirty work — so you can get back to enjoying
              your clean yard and your happy pup!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <h2 className="section-title">Contact Us for a Quote</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-grid">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-input"
                  required
                />
              </div>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select a Service
                </option>
                <option value="one-time">One-Time Cleanup</option>
                <option value="routine">Routine Cleanup</option>
                <option value="deodorizing">Yard Deodorizing</option>
              </select>
              <select
                name="dogs"
                value={formData.dogs}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Number of Dogs
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
              <div>
                <label className="form-label">Yard Size</label>
                <div className="yard-size-options">
                  <div
                    className={`yard-size-item ${
                      formData.yardSize === "small" ? "selected" : ""
                    }`}
                    onClick={() => handleYardSizeClick("small")}
                  >
                    <span
                      role="img"
                      aria-label="Small Yard"
                      className="yard-size-icon"
                    >
                      🤏
                    </span>
                    <span className="yard-size-label">Small</span>
                  </div>
                  <div
                    className={`yard-size-item ${
                      formData.yardSize === "medium" ? "selected" : ""
                    }`}
                    onClick={() => handleYardSizeClick("medium")}
                  >
                    <span
                      role="img"
                      aria-label="Medium Yard"
                      className="yard-size-icon"
                    >
                      🏡
                    </span>
                    <span className="yard-size-label">Medium</span>
                  </div>
                  <div
                    className={`yard-size-item ${
                      formData.yardSize === "large" ? "selected" : ""
                    }`}
                    onClick={() => handleYardSizeClick("large")}
                  >
                    <span
                      role="img"
                      aria-label="Large Yard"
                      className="yard-size-icon"
                    >
                      🌳
                    </span>
                    <span className="yard-size-label">Large</span>
                  </div>
                </div>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your yard or other details..."
                rows="4"
                className="form-textarea"
              ></textarea>

              <button
                type="submit"
                className="submit-button"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? "Sending..." : "Submit Request"}
              </button>
            </form>

            {formStatus === "success" && (
              <div className="success-message">
                <p>
                  Your request has been sent! We will get back to you shortly.
                </p>
              </div>
            )}
            {formStatus === "error" && (
              <div className="error-message">
                <p>
                  There was an issue sending your request. Please try again
                  later or contact us directly at jbakerbba@gmail.com.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
