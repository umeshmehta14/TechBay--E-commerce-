import React from "react";
import { useNavigate } from "react-router-dom";

import "./OrderDetails.css";
import { useData } from "../../../Contexts";

export const OrderDetails = () => {
  const {
    state: { orderDetails },
  } = useData();
  const navigate = useNavigate();

  return (
    <main className="order-details-container">
      {orderDetails?.length === 0 && (
        <section className="empty-order-box">
          <h1 className="pfc">No orders yet?</h1>
          <p>
            "Don't worry, there's still time to find your favorite products and
            make a purchase."
          </p>
          <button className="btn" onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </section>
      )}
      {orderDetails?.map(
        ({
          _id,
          products,
          paymentId,
          amount,
          address: deliveryAddress,
          createdAt,
        }) => {
          const { address, city, mobile, pincode, state } = deliveryAddress;
          return (
            <div key={_id} className="order-detail-box">
              <p>
                <strong>Payment Id</strong>: {paymentId}
              </p>
              <p>
                <strong>Amount</strong>: &#8377;{amount}
              </p>
              <p>
                <strong>Date</strong>:{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>
                <strong>Expected Delivery</strong>: Within 7 Days
              </p>
              <p>
                <strong>Delivery Address</strong>: {address}, {city}, {state}
              </p>
              <p>
                <strong>Number</strong>: {mobile} <strong>Pincode</strong>:
                {pincode}
              </p>
              <div className="order-cart-container">
                {products?.map(
                  ({ product: { _id, image, title, price }, quantity }) => {
                    return (
                      <div
                        key={_id}
                        className="order-cart-card"
                        onClick={() => navigate(`/product/${_id}`)}
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
                            {quantity}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        }
      )}
    </main>
  );
};
