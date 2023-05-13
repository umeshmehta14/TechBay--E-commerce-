import React from 'react'
import {
    TbTruckDelivery,
    IoShieldHalf,
    FaHandHoldingUsd,
    RiSecurePaymentLine,
  } from "../../../../Icons/Icons";
  import "./DeliveryInfo.css";

const DeliveryInfo = () => {
  return (
    <>
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
    </>
  )
}

export default DeliveryInfo
