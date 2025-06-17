import homeLogo from '../assets/nicologo.png';

function Home() {
  return (
    <div className="home-container">
      <img src={homeLogo} className="lgo" alt="logo"></img>
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
    <div className="mission-section">
    <p className="mission-text">
      My mission is to create meaningful software solutions that empower people,
      simplify complexity, and bridge the gap between technology and human needs.
      I strive to code with clarity, design with empathy, and teach with purpose.  Driven by a philosophy that values creativity and open-mindedness, I approach coding as an opportunity for free expression, consciously avoiding limitations imposed by current industry trends or conventional practices.
    </p>
    </div>
    <div className="linksSection">
      <div className='homeLink'>
         <a href="/about">About me</a>
      </div>
      <div className='homeLink'>
        <a href="/projects">My Projects</a>
      </div>
    </div>
        </div>
  );
}

export default Home;
