import React from "react";
import { FiInstagram, FiTwitter, AiOutlineLinkedin } from "../../Icons/Icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-info">
        <div className="footer-detail">
          <h2>TechBay</h2>
          <p>
            "Find your perfect tech match with TechBay - We have something for
            everyone!"
          </p>
        </div>
        <div className="social-link">
          <p>
            Follow Us
          </p>
         <a href="https://www.instagram.com/umesh_mehta_14/"><FiInstagram /></a> 
         <a href="https://twitter.com/Umesh_mehta_14"><FiTwitter /></a> 
         <a href="https://www.linkedin.com/in/umesh-mehta-57b979250/"><AiOutlineLinkedin /></a>
        </div>
        <div className="contact-no">
          <p>Contact Us</p>
          <p>+00 123-456-789</p>
        </div>
      </div>
      <div className="copyright-info">
        <div className="dev-name">&copy; 2023 Developed by UMESH MEHTA. All rights reserved.</div>
        <div className="terms">PRIVACY POLICY TERMS AND CONDITION</div>
      </div>
    </footer>
  );
};

export default Footer;
