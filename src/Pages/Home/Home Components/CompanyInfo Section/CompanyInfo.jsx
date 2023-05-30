import React from "react";
import {
  apple_logo,
  nike,
  huawei,
  facebook,
  microsoft,
} from "../../../../Images/Images";
import "./CompanyInfo.css";

const CompanyInfo = () => {
  return (
    <>
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
    </>
  );
};

export default CompanyInfo;
