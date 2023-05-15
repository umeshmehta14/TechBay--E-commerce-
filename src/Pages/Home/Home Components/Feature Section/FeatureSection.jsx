import React from "react";
import "./FeatureSection.css";
import { useNavigate } from "react-router-dom";

const FeatureSection = ({ products }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="feature-services">
        <div className="feature-service-heading-box">
          <span>Check Now</span>
          <h1>Our Feature Services</h1>
        </div>
        <div className="feature-container">
          {products
            .filter(({ feature }) => feature)
            .map((product) => {
              const { id, title, price, category, image } = product;
              return (
                <div key={id} className="feature-item" onClick={()=>navigate(`/singleProduct/${id}`)}>
                  <div className="feature-img-box">
                    <img
                      className="feature-item-img"
                      src={image}
                      alt="Product"
                    />
                    <span>{category}</span>
                  </div>
                  <div className="feature-item-detail">
                    <span>{title}</span>
                    <span>${price}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
