import { useState } from "react";
import { useNavigate } from "react\u002drouter\u002ddom";
import { signup } from "./api\u002dauth";

function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSending(true);

    try {
      const data = await signup(values);

      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        setSuccess(true);
        // navigate after brief acknowledgment so the user sees the message
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        setError("Sign up failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Sign Up</h1>

      {error && <p className="contact-error">{error}</p>}
      {success && <p className="contact-success">Sign Up successful! redirecting...</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={values.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={sending}>
          {sending ? "Signing up…" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
