import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import { useProducts } from "../../Contexts/DataContext";
import HeroSection from "./Home Components/Hero Section/HeroSection";
import FeatureSection from "./Home Components/Feature Section/FeatureSection";
import CategorySection from "./Home Components/Category Section/CategorySection";
import DeliveryInfo from "./Home Components/DeliveryInfo Section/DeliveryInfo";
import CompanyInfo from "./Home Components/CompanyInfo Section/CompanyInfo";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const {
    state: { products, category },
  } = useProducts();

  return (
    <>
      <Navbar />
      <div className="container">
        <HeroSection />
        <FeatureSection products={products} />
        <CategorySection category={category} />
        <DeliveryInfo />
        <CompanyInfo />
      </div>
        <Footer/>
    </>
  );
};

export default Home;
