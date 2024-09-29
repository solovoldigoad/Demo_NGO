
import React from 'react';
import './aboutSection.css'
const AboutUsPage: React.FC = () => {
  return (
    <div>
    <section className="about-section">
      <h2>About Us</h2>
      <p>Our NGO's company and culture are crafted, not cobbled, for a delightful impact on society.</p>
    </section>
    <section className="mission-section">
      <div className="mission-image">
        <img src="about2.jpg" alt="Mission" />
      </div>
      <div className="mission-text">
        <h3>Our Mission: Helping Millions of People Grow Better</h3>
        <p>
          We believe in not just growing bigger, but in growing better. Better means aligning the success of the communities we serve.
        </p>
      </div>
    </section>
    <section className="mission-section">
      <div className="mission-text">
        <h3>Our Story</h3>
        <p>
            Founded in 2004, our NGO focuses on changing the way communities receive help and support. Over the years, we've helped thousands of individuals.
          </p>
          <p>
            We're dedicated to expanding our impact and providing better opportunities through our unique, people-centered approach.
          </p>
      </div>
      <div className="mission-image">
        <img src="about1.jpg" alt="Mission" />
      </div>
    </section>
    <section className="statistics-section">
      <p className='impact'>OUR IMPACT</p>
      <div className="statistics-grid">
        <div className="stat-item">
          <h4>800+</h4>
          <p>children impacted every year</p>
        </div>
        <div className="stat-item">
          <h4>600+</h4>
          <p> stums are reached out</p>
        </div>
        <div className="stat-item">
          <h4>200+</h4>
          <p>focuses on eduction and health </p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutUsPage;
