import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-box">
        <div className="hero-img-box">
          <img
            className="main-image"
            src="https://neilpatel.com/wp-content/uploads/2015/04/ecommerce.jpg"
            alt="TechBay"
          />
        </div>

        <div className="welcome-message">
          <span>Welcome To</span>
          <h1>TechBay</h1>
          <p>
            Unleash Your Tech Potential with TechBay: Choose from a Wide Range
            of Phones, TVs, Laptops, Speakers and More
          </p>
          <button onClick={() => navigate("/products")} className="btn">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
