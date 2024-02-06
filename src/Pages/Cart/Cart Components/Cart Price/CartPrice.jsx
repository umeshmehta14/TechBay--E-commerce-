import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useData } from "../../../../Contexts";
import "./CartPrice.css";

const CartPrice = () => {
  const {
    state: { cart },
  } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const originalPrice = cart?.reduce(
    (acc, { product: { original_price }, quantity }) =>
      (acc += original_price * quantity),
    0
  );
  const totalCost = cart?.reduce(
    (acc, { product: { price }, quantity }) => (acc += price * quantity),
    0
  );
  const discountedPrice = originalPrice - totalCost;
  return (
    <main className="cart-price-box">
      <section className="price-heading">
        <h3 className="pfc">Price Details</h3>
      </section>
      <section className="price-cost-section">
        <p>
          <span>Price ({cart.length} items)</span>
          <span>&#8377;{originalPrice}</span>
        </p>
        <p>
          <span>Discount</span>
          <span className="green">-&#8377;{discountedPrice}</span>
        </p>
        <p>
          <span>Delivery Charges</span> <span>&#8377;40</span>
        </p>
        <p>
          <span>Secured Packaging Fee</span> <span>&#8377;29</span>
        </p>
      </section>
      <div className="total-cost-heading">
        <h3>
          <span>Total Cost</span>
          <span>&#8377;{totalCost + 79}</span>
        </h3>
      </div>

      <div className="save-price-section">
        <p className="green">
          You will save &#8377;{discountedPrice} on this order
        </p>
      </div>
      <button
        className="btn"
        onClick={() => navigate("/checkout", { state: { from: location } })}
      >
        CHECKOUT
      </button>
    </main>
  );
};

export default CartPrice;
