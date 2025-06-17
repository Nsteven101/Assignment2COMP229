import project1 from '../assets/profilehubapp.png';
import project2 from '../assets/soundpeace.png';
import project3 from '../assets/daycaredbms.png';

function Projects() {
  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>

      <div className="project-card">
        <img src={project1} alt="ProfileHubApp" className="project-img" />
        <div className="project-info">
          <h2>ProfileHubApp</h2>
          <p><strong>Role:</strong> Lead Developer</p>
          <p><strong>Description:</strong> A profile management web application built using React and Firebase. Users can create, edit, and display digital profiles in a clean, responsive UI.</p>
          <p><strong>Outcome:</strong> Successfully deployed a fully functional MVP with authentication and real-time data sync.</p>
        </div>
      </div>

      <div className="project-card">
        <img src={project2} alt="SOUNDPEACE" className="project-img" />
        <div className="project-info">
          <h2>Project01: SOUNDPEACE</h2>
          <p><strong>Role:</strong> Frontend Engineer</p>
          <p><strong>Description:</strong> A collaborative music-sharing platform where users can upload tracks, share playlists, and explore new sounds together.</p>
          <p><strong>Outcome:</strong> Designed the full UI/UX, improving user engagement and accessibility across devices.</p>
        </div>
      </div>

      <div className="project-card">
        <img src={project3} alt="Daycare DBMS" className="project-img" />
        <div className="project-info">
          <h2>Daycare Centre DBMS</h2>
          <p><strong>Role:</strong> Database Designer</p>
          <p><strong>Description:</strong> Built an Oracle-based system to manage children’s records, staff assignments, and activity logs with SQL scripts and ERD modeling.</p>
          <p><strong>Outcome:</strong> Delivered a normalized, scalable schema used as a model project in Advanced Databases class.</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
