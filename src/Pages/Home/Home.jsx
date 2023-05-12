import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import { useProducts } from "../../Contexts/DataContext";

const Home = () => {
  const {
    state: { products },
  } = useProducts();
  console.log(products)
  return (
    <>
      <Navbar />
      <div className="hero-img-box">
        <img
          className="main-image"
          src="https://tse2.mm.bing.net/th?id=OIP.wP2f6WjJxh0ptaieVCk6XAHaEK&pid=Api&P=0"
          alt="TechBay"
        />
      </div>
      <div className="welcome-message">
        <span>Welcome To</span>
        <h1>TechBay</h1>
        <p>
          Unleash Your Tech Potential with TechBay: Choose from a Wide Range of
          Phones, TVs, Laptops, Speakers and More
        </p>
        <button className="btn">Shop Now</button>
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
            return <div key={id} className="feature-item">
              <div className="feature-img-box">
              <img className="feature-item-img" src={image} alt="Product" />
              <span>{category}</span>
              </div>
              <span>{title}</span>
              <span>{price}</span>
            </div>;
          })}
        </div>

      </div>
    </>
  );
};

export default Home;
