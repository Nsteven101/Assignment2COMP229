import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contactNumber: '',
    email: '',
    message: ''
  })

  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setSending(true)

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.status === 201) {
        navigate('/contact')
      } else {
        const { message } = await res.json()
        throw new Error(message || `Server responded with ${res.status}`)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-container">
      <h1>Contact Me</h1>

      <div className="contact-panel">
        <p><strong>Email:</strong> castroconi101@gmail.com</p>
        <p><strong>Phone:</strong> +1 (437) 445 1436</p>
        <p><strong>Location:</strong> Toronto ON Canada</p>
      </div>

      {error && <p className="contact-error">{error}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          onChange={handleChange}
        />
        <button type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

export default Contact
