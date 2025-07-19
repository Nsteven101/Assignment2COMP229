import { Routes, Route } from "react-router-dom"
import "./App.css"

import NavBar from "./components/NavBar"

import Home     from "./pages/Home.jsx"
import About    from "./pages/About.jsx"
import Projects from "./pages/Projects.jsx"
import Services from "./pages/Services.jsx"
import Contact  from "./pages/Contact.jsx"
import Education from "./pages/Education.jsx"


import SignIn from "../lib/SignIn.jsx"
import Admin  from "../lib/AdminAccess.jsx"
import AdminButton from "../lib/AdminButton.jsx"
import auth from "../lib/auth-helper.js"
import { useState, useEffect } from "react"

function App() {
const [loggedIn, setLoggedIn] = useState(Boolean(auth.isAuthenticated()))

  useEffect(() => {
    const sync = () => setLoggedIn(Boolean(auth.isAuthenticated()))
    window.addEventListener("storage", sync)
    return () => window.removeEventListener("storage", sync)
  }, [])

  const handleAuthChange = () => {
    setLoggedIn(true)            /* runs as soon as SignIn succeeds */
  }

  return (
    <>
      {loggedIn && <AdminButton />}
      <NavBar />

      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/projects"  element={<Projects />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/education" element={<Education />} />
        <Route
          path="/signin"
          element={<SignIn onAuth={handleAuthChange} />}   /* pass it here */
        />
        <Route           path="/admin"
          element={<Admin onSignOut={() => setLoggedIn(false)} />}
        />
      </Routes>
    </>
  )
}

export default App
