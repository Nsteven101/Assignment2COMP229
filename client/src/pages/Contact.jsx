import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User Contact Info:", formData); // Internal documentation for dev
    navigate('/'); // Redirect to Home after submission
  };

  return (
    <div className="contact-container">
      <h1>Contact Me</h1>

      <div className="contact-panel">
        <p><strong>Email:</strong> castroconi101@gmail.com</p>
        <p><strong>Phone:</strong> +1 (437) 445-1436</p>
        <p><strong>Location:</strong> Toronto, ON, Canada</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" required onChange={handleChange}></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
