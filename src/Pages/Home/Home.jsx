import React from "react";
import "./Home.css";
import { useData } from "../../Contexts/DataContext/DataContext";
import HeroSection from "./Home Components/Hero Section/HeroSection";
import FeatureSection from "./Home Components/Feature Section/FeatureSection";
import CategorySection from "./Home Components/Category Section/CategorySection";
import DeliveryInfo from "./Home Components/DeliveryInfo Section/DeliveryInfo";
import CompanyInfo from "./Home Components/CompanyInfo Section/CompanyInfo";

const Home = () => {
  const {
    state: { products, category },
  } = useData();

  return (
    <>
      <div className="container top-5 top-6">
        <HeroSection />
        <FeatureSection products={products} />
        <CategorySection category={category} />
        <DeliveryInfo />
        <CompanyInfo />
      </div>
        {/* <Footer/> */}
    </>
  );
};

export default Home;
