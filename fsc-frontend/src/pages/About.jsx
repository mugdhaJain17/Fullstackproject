import React from "react";
import "./About.css";
import AboutImage from "../assets/about.png";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <img src={AboutImage} alt="About Us" className="about-image" />
        <div className="overlay-text">
          <h1>About Local Farmers' Market</h1>
          <p>Bridging the gap between farmers and consumers.</p>
        </div>
      </div>

      
      <div className="about-content">
        <h2>Who We Are</h2>
        <p>
          We are an online marketplace dedicated to supporting local farmers by connecting them directly with consumers.
          Our goal is to provide fresh, organic, and high-quality farm products at fair prices.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to create a sustainable ecosystem where farmers receive fair compensation, and consumers enjoy
          farm-fresh produce directly from the source. We believe in transparency, quality, and supporting local
          agriculture.
        </p>

        <h2>Meet Our Team</h2>
        <div className="team">
          <div className="team-member">
            <div className="profile-circle">A</div>
            <p>Arjun Bansal</p>
            <span>Founder & CEO</span>
          </div>
          <div className="team-member">
            <div className="profile-circle">S</div>
            <p>Simran Kaur</p>
            <span>Marketing Head</span>
          </div>
          <div className="team-member">
            <div className="profile-circle">R</div>
            <p>Rohan Sharma</p>
            <span>Tech Lead</span>
          </div>
          <div className="team-member">
            <div className="profile-circle">R</div>
            <p>Radhika Goyal</p>
            <span>Tech Lead</span>
          </div>
        </div>
      </div>

      <footer className="about-footer">
        <p>© {new Date().getFullYear()} Local Farmers' Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
