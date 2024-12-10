import React, { useEffect } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  // Load the Tenor script dynamically when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script if the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="about-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Shaping the Future of Technology</h1>
          <p>This project was built by two enthusiastic students as part of their third year assignment.</p>
        </div>
        <div className="animation-container">
          <img className="project-animation" src="https://media.tenor.com/boiTs.gif" alt="Coding animation" />
        </div>
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>This project began in 2024 as a collaboration between two passionate students dedicated to revolutionizing food delivery. With the goal of addressing the challenges faced by users in accessing their favorite meals, the duo embarked on a journey that involved mastering new technologies, overcoming obstacles, and ultimately delivering a user-friendly application. This food delivery app not only showcases their technical skills but also reflects their commitment to enhancing the dining experience for everyone.</p>
      </section>

      <section className="what-we-built">
        <h2>What We Built</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Feature 1: Interactive Platform</h3>
            <p>We developed an interactive web platform using modern technologies like React and Node.js.</p>
          </div>
          <div className="feature">
            <h3>Feature 2: Data Integration</h3>
            <p>The platform is integrated with a real-time database to fetch and display data seamlessly.</p>
          </div>
          <div className="feature">
            <h3>Feature 3: User Experience</h3>
            <p>We focused on creating an intuitive user experience, ensuring that users can easily navigate the system.</p>
          </div>
        </div>
      </section>

      <section className="our-impact">
        <h2>Project Impact</h2>
        <div className="impact-grid">
          <div className="impact-stat">
            <h3>10+</h3>
            <p>A Journey of Learning</p>
          </div>
          <div className="impact-stat">
            <h3>2</h3>
            <p>Students Involved</p>
          </div>
          <div className="impact-stat">
            <h3>React</h3>
            <p>Technologies Used</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <div className="leader-grid">
          <div className="leader">
            <img src="/images/shreya.jpg" alt="Student 1" />
            <h3>Shreya</h3>
            <p>MSc.SS 3rd-yr</p>
          </div>
          <div className="leader">
            <img src="/images/shreyasri.jpg" alt="Student 2" />
            <h3>Shreya Sri</h3>
            <p>MSc.SS 3rd-yr</p>
          </div>
        </div>
      </section>

      <section className="join-us">
  <h2>Join Our Journey</h2>
  <p>We're constantly learning and building more. Reach out if you'd like to collaborate or learn more about our project!</p>
  <div className="cta-buttons">
    <a href="http://www.linkedin.com/in/shreya-sl" target="_blank" rel="noopener noreferrer" className="cta-button">
      Shreya's LinkedIn
    </a>
    <a href="http://linkedin.com/in/sh-reyaa07" target="_blank" rel="noopener noreferrer" className="cta-button">
      Shreya Sri's LinkedIn
    </a>
  </div>
</section>

    </div>
  );
};

export default AboutPage;
