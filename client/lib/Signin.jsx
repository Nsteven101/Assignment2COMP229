import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signin } from "./api-auth"

function SignIn({ onAuth }) {
  const navigate = useNavigate()

  const [values, setValues] = useState({ email: "", password: "" })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSending(true)

    try {
      const data = await signin(values)

      if (data?.token) {
        console.log('logged in succesfully')
        onAuth() 
        navigate("/admin")

      } else {
        setError(data?.error ?? "Sign in failed")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-container">
      <h1>Sign In</h1>

      {error && <p className="contact-error">{error}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button type="submit" disabled={sending}>
          {sending ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  )
}

export default SignIn
