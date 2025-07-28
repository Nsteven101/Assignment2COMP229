import { Routes, Route } from "react-router-dom"
import "./App.css"

import NavBar from "./components/NavBar"

import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"

import Projects from "./pages/Projects.jsx"
import AccessProjects from '../access/Project/AccessProject.jsx'
import AddProject from "../access/Project/AddProject.jsx"
import UpdateProject from "../access/Project/UpdateProject.jsx"

import Services from "./pages/Services.jsx"

import Education from "./pages/Education.jsx"
import AccessEducation from "../access/Education/AccessEducation.jsx"
import AddEducation from "../access/Education/AddEducation.jsx"
import UpdateEducation from "../access/Education/UpdateEducation.jsx"

import Contact from "./pages/Contact.jsx"
import AccessContact from "../access/Contacts/AccessContacts.jsx"

import AccessAccounts from "../access/Accounts/AccessAccounts.jsx"
import UpdateAccount from "../access/Accounts/UpdateAccount.jsx"

import SignIn from "../lib/Signin.jsx"
import SignUp from "../lib/Signup.jsx"
import Admin from "../lib/UserAccess.jsx"
import AdminButton from "../lib/UserButton.jsx"
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/education" element={<Education />} />
        <Route
          path="/signin"
          element={<SignIn onAuth={handleAuthChange} />}   /* pass it here */
        />
        <Route path="/admin"
          element={<Admin onSignOut={() => setLoggedIn(false)} />}
        />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/accessprojects" element={<AccessProjects />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/editproject/:id" element={<UpdateProject />} />

        <Route path="/accesscontacts" element={<AccessContact />} />

        <Route path="/accesseducation" element={<AccessEducation />} />
        <Route path="/addeducation" element={<AddEducation  />} />
        <Route path="/editeducation/:id" element={<UpdateEducation/>} />

                <Route path="/accessaccounts" element={<AccessAccounts/>} />
                        <Route path="/editaccount/:id" element={<UpdateAccount/>} />

      </Routes>
    </>
  )
}

export default App
