import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="hero-box">
        <section className="hero-img-box">
          <img
            className="main-image"
            src="https://neilpatel.com/wp-content/uploads/2015/04/ecommerce.jpg"
            alt="TechBay"
          />
        </section>

        <section className="welcome-message">
          <span>Welcome To</span>
          <h1>TechBay</h1>
          <article>
            Unleash Your Tech Potential with TechBay: Choose from a Wide Range
            of Phones, TVs, Laptops, Speakers and More
          </article>
          <button onClick={() => navigate("/products")} className="btn">
            Shop Now
          </button>
        </section>
      </main>
    </>
  );
};

export default HeroSection;
