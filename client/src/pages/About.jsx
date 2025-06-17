import headimg from '../assets/damn.jpg';

function About() {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <div className="home-description">
                      <img src={headimg} className="home-picture" alt="headshot"></img>

        <p>
          Hi, I’m Nico — Software Engineering Technician @ Centennial College, a web developer and coding instructor passionate about building interactive
          web applications and intuitive user interfaces. 
        </p>
        <p>
          Vice President of the CCSAI Engineering Club. Teaching programming at Algorithmics Ajax/Whitby
          (Python, Scratch, game development). Currently working on <strong>ProfileHubApp</strong> and <strong>Project01: SOUNDPEACE</strong>.
        </p>
        <p>
          Currently studying Javascript, C#, Python, Html and CSS, and Java.
        </p>
            <a
  href="/nicoresume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="resume-link"
>
  View My Resume (PDF)
</a>
      </div>
    </div>
  );
}

export default About;