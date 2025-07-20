import { useState } from "react";
import { useNavigate, Link } from "react\u002drouter\u002ddom";
import { signin } from "./api-auth";      /* assumes apiAuth is your helper file */

function SignIn({ onAuth }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const data = await signin(values);

      if (data?.token) {
        onAuth();
        navigate("/admin");
      } else {
        setError(data?.error ?? "Sign in failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

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

      {/* sign-up link */}
      <p className="contact-secondary">
        Do not have an account?{" "}
        <Link className="signupButton" to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default SignIn;
