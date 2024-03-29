import React from "react";
import "./FeatureSection.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../Contexts";

const FeatureSection = () => {
  const navigate = useNavigate();
  const {
    state: { featuredProducts },
  } = useData();
  return (
    <>
      <div className="feature-services">
        <div className="feature-service-heading-box">
          <span>Check Now</span>
          <h1>Our Feature Services</h1>
        </div>
        <div className="feature-container">
          {featuredProducts?.map((product) => {
            const { _id, title, price, category, image } = product;
            return (
              <div
                key={_id}
                className="feature-item"
                title={title}
                onClick={() => navigate(`/product/${_id}`)}
              >
                <div className="feature-img-box">
                  <img className="feature-item-img" src={image} alt="Product" />
                  <span>{category}</span>
                </div>
                <div className="feature-item-detail">
                  <span>{title}</span>
                  <span>&#8377;{price}</span>
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
