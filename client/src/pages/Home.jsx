// client/lib/Home.jsx
import React from 'react'
import homeLogo from '../assets/nicologo.png'

export default function Home() {
  return (
    <div className="home-container">
      <img src={homeLogo} className="lgo" alt="logo" />
      <h1 className="home-title">Nico's Portfolio, Hello World!</h1>
      <p className="home-subtitle">Nice meeting you here.. Welcome.</p>
      <a
        href="https://www.linkedin.com/in/nico-steven-castro-5a5285332/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-link"
      >
        Connect with me on LinkedIn
      </a>
<div className="mission-section mt-12 px-4">
  <p className="mission-text text-center max-w-2xl mx-auto">
    My mission is to create meaningful software solutions that empower people,
    simplify complexity, and bridge the gap between technology and human needs.
    I strive to code with clarity, design with empathy, and teach with purpose.
    Driven by a philosophy that values creativity and open-mindedness, I approach
    coding as an opportunity for free expression, consciously avoiding limitations
    imposed by current industry trends or conventional practices.
  </p>

  <p className="text-center text-green-600 font-semibold mt-6">
    ✅ CI/CD Test Update: This paragraph was added to demonstrate automatic deployment using Render.
  </p>
</div>

<div className="linksSection flex justify-center space-x-8 mt-10">
  <a href="/about" className="homeLink text-blue-600 hover:underline">
    About me
  </a>
  <a href="/projects" className="homeLink text-blue-600 hover:underline">
    My Projects
  </a>
</div>

    </div>
  )
}
