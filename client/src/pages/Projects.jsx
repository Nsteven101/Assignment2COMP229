import { useEffect, useState } from 'react'
import './pages.css';

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects/')
        console.log(res);
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        // verify we really got JSON
        const type = res.headers.get('content-type') || ''
        if (!type.includes('application/json')) {
          throw new Error('Response was not valid JSON')
        }

        const data = await res.json()
        setProjects(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <p>Loading projects…</p>
  if (error) return <p>Could not load projects: {error}</p>
  if (projects.length === 0) return <div className="noProj"><p>No Projects</p></div>

  return (
    <div className="projectsContainer">
      <h1 className="projectsTitle">My Projects</h1>

      {projects.map(p => (
        <div key={p.title} className="projectCard">
          <div className="projectInfo">
            <h2>{p.title}</h2>
            <p><strong>Author:</strong> {p.firstname} {p.lastname}</p>
            <p><strong>Email:</strong> {p.email}</p>
            <p><strong>Completion:</strong> {new Date(p.completion).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {p.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Projects