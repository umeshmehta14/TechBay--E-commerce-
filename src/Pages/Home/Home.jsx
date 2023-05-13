import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import { useProducts } from "../../Contexts/DataContext";
import {
  TbTruckDelivery,
  IoShieldHalf,
  FaHandHoldingUsd,
  RiSecurePaymentLine,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "../../Icons/Icons";
import {
  apple_logo,
  nike,
  huawei,
  facebook,
  microsoft,
} from "../../Images-Gifs/Images";

const Home = () => {
  const {
    state: { products, category },
  } = useProducts();

  const [categoryIndex, setCategoryIndex] = useState(0);

  const nextSlide = () => {
    if (categoryIndex === category.length - 1) {
      setCategoryIndex(0);
    } else {
      setCategoryIndex(categoryIndex + 1);
    }
  };
  const previousSlide = () => {
    if (categoryIndex === 0) {
      setCategoryIndex(category.length - 1);
    } else {
      setCategoryIndex(categoryIndex - 1);
    }
  };

  const curCategory = category[categoryIndex];
  return (
    <>
      <Navbar />
      <div className="container">
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
            <button className="btn">Shop Now</button>
          </div>
        </div>

        <div className="feature-services">
          <div className="feature-service-heading-box">
            <span>Check Now</span>
            <h1>Our Feature Services</h1>
          </div>
          <div className="feature-container">
            {products
              .filter(({ feature }) => feature)
              .map((product) => {
                const {
                  id,
                  title,
                  description,
                  price,
                  discountPercentage,
                  rating,
                  inStock,
                  brand,
                  category,
                  image,
                  wishList,
                  quantity,
                  trending,
                } = product;
                return (
                  <div key={id} className="feature-item">
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

        <div className="category-section">
          <div className="category-heading">
            <h3>Select By</h3>
            <h1>Categories</h1>
          </div>
          <div className="category-container-mobile">
            <div className="category-item" key={curCategory?.id}>
              <img
                className="category-img"
                src={curCategory?.image}
                alt="Categories"
              />
              <h2>{curCategory?.categoryName}</h2>
            </div>
            <p className="arrow-btn" onClick={() => previousSlide()}>
              <AiOutlineArrowLeft />
            </p>
            <p className="arrow-btn arrow-right" onClick={() => nextSlide()}>
              <AiOutlineArrowRight />
            </p>
          </div>
          <div className="category-container">
            {category.map(({ id, categoryName, image }) => {
              return (
                <div className="category-item" key={id}>
                  <img className="category-img" src={image} alt="Categories" />
                  <h2>{categoryName}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div className="delivery-information">
          <div className="info-box" id="first">
            <TbTruckDelivery className="delivery-info-img" />
            <p>Super Fast and Free Delivery</p>
          </div>
          <div className="info-box" id="second">
            <IoShieldHalf className="delivery-info-img" />
            <p>Non Contact Shipping</p>
          </div>
          <div className="info-box" id="third">
            <FaHandHoldingUsd className="delivery-info-img" />
            <p>Money Back Guaranteed</p>
          </div>
          <div className="info-box" id="fourth">
            <RiSecurePaymentLine className="delivery-info-img" />
            <p>Super Secure Payment System</p>
          </div>
        </div>

        <div className="company-info">
          <p>Trusted By 1000+ Companies</p>
          <div className="company-logos">
            <img src={apple_logo} alt="Apple" />
            <img src={microsoft} alt="Microsoft" />
            <img src={facebook} alt="Facebook" />
            <img src={huawei} alt="Huawei" />
            <img src={nike} alt="Nike" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
