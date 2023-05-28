import React from "react";
import "./OrderDetails.css";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const {
    state: { orderDetails },
  } = useData();
  const navigate = useNavigate();
  return (
    <div className="order-details-container">
      {orderDetails.length === 0 && (
        <div className="empty-order-box">
          <h1 className="pfc">No orders yet?</h1>
          <p>
            "Don't worry, there's still time to find your favorite products and
            make a purchase."
          </p>
          <button className="btn" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      )}
      {orderDetails.map(
        ({ id, orderList, amount, address: deliveyAddress, date }) => {
          const { address, city, mobile, pincode, state } = deliveyAddress;
          return (
            <div key={id} className="order-detail-box">
              <p>
                <strong>Payment Id</strong>: {id}
              </p>
              <p>
                <strong>Amount</strong>: &#8377;{amount}
              </p>
              <p>
                <strong>Date</strong>: {date.toDateString()}
              </p>
              <p>
                <strong>Expected Delivery</strong>: Within 7 Days
              </p>
              <p>
                <strong>Delivery Address</strong>: {address}, {city}, {state}
              </p>
              <p>
                <strong>Number</strong>: {mobile} <strong>Pincode</strong>:{" "}
                {pincode}
              </p>
              <div className="order-cart-container">
                {orderList.map(({ _id, image, title, price, qty }) => {
                  return (
                    <div
                      key={_id}
                      className="order-cart-card"
                      onClick={() => navigate(`/singleProduct/${_id}`)}
                    >
                      <div className="order-img-box">
                        <img width={"100px"} src={image} alt="" />
                      </div>
                      <div className="order-cart-detail-box">
                        <h3 className="pfc">{title}</h3>
                        <p>
                          <strong>Price:</strong> &#8377;{price}
                        </p>
                        <p>
                          <strong>Quantity:</strong>
                          {qty}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default OrderDetails;
