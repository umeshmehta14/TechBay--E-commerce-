import React from 'react'
import "./CartPrice.css";
import { useData } from '../../../../Contexts/DataContext/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

const CartPrice = () => {
    const {
        state: { cart }
      } = useData();
      const navigate = useNavigate();
      const location = useLocation();
    const originalPrice = cart.reduce(
        (acc, { original_price, qty }) => (acc += original_price * qty),
        0
      );
      const totalCost =
        cart.reduce((acc, { price, qty }) => (acc += price * qty), 0);
      const discountedPrice = originalPrice - totalCost;
  return (
    <div className="cart-price-box">
                  <div className="price-heading">
                    <h3 className="pfc">Price Details</h3>
                  </div>
                  <div className="price-cost-section">
                    <p>
                      <span>Price ({cart.length} items)</span>{" "}
                      <span>&#8377;{originalPrice}</span>
                    </p>
                    <p>
                      <span>Discount</span>{" "}
                      <span className="green">-&#8377;{discountedPrice}</span>
                    </p>
                    <p>
                      <span>Delivery Charges</span> <span>&#8377;40</span>
                    </p>
                    <p>
                      <span>Secured Packaging Fee</span> <span>&#8377;29</span>{" "}
                    </p>
                  </div>
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
                    onClick={() =>
                      navigate("/checkout", { state: { from: location } })
                    }
                  >
                    CHECKOUT
                  </button>
                </div>
  )
}

export default CartPrice

