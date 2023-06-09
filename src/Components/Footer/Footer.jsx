import React from "react";
import { FiInstagram, FiGithub, AiOutlineLinkedin } from "../../Utils/Icons/Icons";
import "./Footer.css";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  if(location.pathname === "/404"){
    return null;
  }
  return (
    <footer>
      <div className="footer-info">
        <article className="footer-detail">
          <h2>TechBay</h2>
          <p>
            "Find your perfect tech match with TechBay - We have something for
            everyone!"
          </p>
        </article>
        <div className="social-link">
          <p>
            Follow Us
          </p>
         <a href="https://www.instagram.com/umesh_mehta_14/" title="Instagram"><FiInstagram /></a> 
         <a href="https://github.com/umeshmehta14" title="Github"><FiGithub /></a> 
         <a href="https://www.linkedin.com/in/umesh-mehta-57b979250/" title="LinkedIn"><AiOutlineLinkedin /></a>
        </div>
        <div className="contact-no">
          <div className="contact-phone">
          <p>Contact Us</p>
          <p>+00 123-456-789</p>
          </div>
          <div className="contact-email">
            <p>For Any Queries Mail Us</p>
            <p>TechBay@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="copyright-info">
        <div className="dev-name">&copy; {new Date().getFullYear()} Developed by UMESH MEHTA. All rights reserved.</div>
        <div className="terms">PRIVACY POLICY TERMS AND CONDITION</div>
      </div>
    </footer>
  );
};

