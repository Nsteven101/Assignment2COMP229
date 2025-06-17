import webdevImg from '../assets/webdev.png';
import programmingImg from '../assets/programming.png';
import mobileImg from '../assets/mobile.png';

function Services() {
  return (
    <div className="services-container">
      <h1 className="services-title">My Services</h1>
      <div className="services-list">
        <div className="service-card">
          <img src={webdevImg} alt="Web Development" />
          <h2>Web Development</h2>
          <p>I build responsive and interactive websites using HTML, CSS, JavaScript, and React.</p>
        </div>

        <div className="service-card">
          <img src={programmingImg} alt="General Programming" />
          <h2>General Programming</h2>
          <p>Skilled in Python, C#, and Java—developing scripts, apps, and console-based programs.</p>
        </div>

        <div className="service-card">
          <img src={mobileImg} alt="Mobile App Development" />
          <h2>Mobile App Development</h2>
          <p>Creating mobile-ready prototypes and learning React Native for cross-platform apps.</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
