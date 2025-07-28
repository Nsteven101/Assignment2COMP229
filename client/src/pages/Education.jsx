import { useEffect, useState } from 'react'
import './pages.css';

function Education() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEducation() {
      try {
        const res = await fetch('/api/qualifications')
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        // confirm we received JSON
        const type = res.headers.get('content-type') || ''
        if (!type.includes('application/json')) {
          throw new Error('Response was not valid JSON')
        }

        const data = await res.json()
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  if (loading) return <p>Loading education…</p>
  if (error) return <p>Could not load education: {error}</p>
  if (items.length === 0) return <p>No Education</p>

  return (
    <div className="educationContainer">
      <h1 className="educationTitle">Education</h1>

      {items.map(item => (
        <div key={item.title} className="educationCard">
          <div className="educationInfo">
            <h2>{item.title}</h2>
            <p><strong>Author:</strong> {item.firstname} {item.lastname}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Completion:</strong> {new Date(item.completion).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Education
