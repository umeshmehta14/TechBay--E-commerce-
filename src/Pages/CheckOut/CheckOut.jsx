import React from "react";
import "./CheckOut.css";
import { useData } from "../../Contexts/DataContext/DataContext";
import { useLocation, useNavigate } from "react-router-dom";
import AddressForm from "./Address form/AddressForm";
import {
  setSelectedAddress,
  setShowAddressModal,
} from "../../DataReducer/Constants";

const CheckOut = () => {
  const {
    state: { addressList, cart, showAddressModal, selectedAddress },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const originalPrice = cart.reduce(
    (acc, { original_price, qty }) => (acc += original_price * qty),
    0
  );
  const totalCost =
    cart.reduce((acc, { price, qty }) => (acc += price * qty), 0) + 79;
  const discountedPrice = originalPrice - totalCost;
  return (
    <>
      <div className="container top-6-checkout">
        <div className="main-checkout-box">
          <div className="address-container">
            {addressList.map(
              ({
                id,
                name,
                address,
                city,
                mobile,
                alternatemobile,
                pincode,
                state,
              }) => (
                <div
                  key={id}
                  className={`address-box ${
                    selectedAddress === id ? "selected" : ""
                  }`}
                  onClick={() =>
                    dispatch({ type: setSelectedAddress, payload: id })
                  }
                >
                  <label htmlFor="user-name">
                    <input
                      type="radio"
                      checked={selectedAddress === id}
                      id="user-name"
                      onChange={() =>
                        dispatch({ type: setSelectedAddress, payload: id })
                      }
                    />
                    <strong>{name + "     " + mobile}</strong>
                  </label>
                  <div className="user-address-detail">
                    {address + ", " + city + ", " + state + "-"}
                    <strong>{pincode}</strong>
                  </div>
                </div>
              )
            )}
            <button
              className="add-address-btn"
              onClick={() => dispatch({ type: setShowAddressModal })}
            >
              + Add New Address
            </button>
          </div>
          <div className="order-detail-container">
            <div className="c-cart-price-box ">
              <div className="c-price-heading">
                <h3 className="pfc">Order Details</h3>
              </div>
              <div className="order-names-box">
                <h4>
                  <span>Item</span>
                  <span>Qty</span>
                </h4>
                {cart.map(({ title, qty }) => (
                  <p>
                    <span>{title}</span>
                    <span>{qty}</span>
                  </p>
                ))}
              </div>
              <div className="c-price-heading">
                <h3 className="pfc">Price Details</h3>
              </div>
              <div className="price-cost-section">
                <p>
                  <span>Price ({cart.length} items)</span>{" "}
                  <span>${originalPrice}</span>
                </p>
                <p>
                  <span>Discount</span>{" "}
                  <span className="green">- ${discountedPrice}</span>
                </p>
                <p>
                  <span>Delivery Charges</span> <span>$40</span>
                </p>
                <p>
                  <span>Secured Packaging Fee</span> <span>$29</span>{" "}
                </p>
              </div>
              <div className="total-cost-heading">
                <h3>
                  <span>Total Cost</span>
                  <span>${totalCost}</span>
                </h3>
              </div>

              <div className="save-price-section">
                <p className="green">
                  Your Total Saving on this order ${discountedPrice - 79}
                </p>
              </div>
              <button className="btn" onClick={() => navigate("/checkout",{state:{from:location}})}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {showAddressModal ? <AddressForm /> : ""}
    </>
  );
};

export default CheckOut;
