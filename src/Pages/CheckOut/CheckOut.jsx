import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import { useData } from "../../Contexts/DataContext/DataContext";
import { useNavigate } from "react-router-dom";
import {
  setEditId,
  setOrderDetails,
  setSelectedAddress,
  setShowAddressModal,
} from "../../DataReducer/Constants";
import { FaPlus, BiEdit } from "../../Icons/Icons";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { useCart } from "../../Contexts/CartContext/CartContext";
import { popper } from "../../Utils/Popper";
import AddressForm from "../../Components/Address form/AddressForm";
import { toast } from "react-toastify";

const CheckOut = () => {
  const {
    state: { addressList, cart, showAddressModal, selectedAddress },
    dispatch,
  } = useData();
  document.title = "Checkout";

  const { currentUser } = useAuth();
  const { clearCart } = useCart();
  const { email } = currentUser;
  const navigate = useNavigate();
  const [paymentResponse, setPaymentResponse] = useState(false);
  const originalPrice = cart.reduce(
    (acc, { original_price, qty }) => (acc += original_price * qty),
    0
  );
  const totalCost = cart.reduce(
    (acc, { price, qty }) => (acc += price * qty),
    0
  );
  const discountedPrice = originalPrice - totalCost;
  const selectedMobileNo = addressList.find(({ id }) => id === selectedAddress);

  const handlePaymentSuccess = (response) => {
    setPaymentResponse(true);
    dispatch({
      type: setOrderDetails,
      payload: {
        id: response.razorpay_payment_id,
        orderList: [...cart],
        address: selectedMobileNo,
        amount: totalCost,
        date: new Date(),
      },
    });
    popper();
    clearCart();
    setTimeout(() => {
      navigate("/profile/orderDetail");
    }, 3000);
  };

  const razorpayOptions = {
    key: "rzp_test_D85llKxUWkwbEZ",
    amount: totalCost * 100,
    name: "TechBay",
    description: "Thank You For Ordering",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.VH-BQwstrgYmR6vADnIlFgAAAA&pid=Api&P=0&h=180",
    handler: (response) => handlePaymentSuccess(response),
    prefill: {
      name: selectedMobileNo?.firstName,
      email: email,
      contact: selectedMobileNo?.mobile,
    },
    notes: {
      address: selectedMobileNo?.address,
    },
    theme: {
      color: "#146cda",
    },
  };

  const handlePayment = () => {
    if (addressList.length > 0) {
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } else {
      toast.warning("Please Select a Address", {
        theme: "colored",
        containerId: "B",
      });
    }
  };

  useEffect(() => {
    if (cart.length === 0) navigate("/products");
    if (addressList.length === 1) {
      dispatch({ type: setSelectedAddress, payload: addressList[0].id });
    }
  }, []);

  return (
    <>
      <div className="container top-6-checkout">
        {paymentResponse ? (
          <div className="order-placed-msg-box pfc">
            Your order has been successfully placed 🥳
          </div>
        ) : (
          <div className="main-checkout-box">
            <div className="address-container">
              {addressList.length === 0
                ? ""
                : addressList.map(
                    ({
                      id,
                      name,
                      address,
                      city,
                      mobile,
                      pincode,
                      state,
                      type,
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
                        <p className="address-box-type">{type}</p>
                        <label htmlFor={id}>
                          <input
                            type="radio"
                            checked={selectedAddress === id}
                            id={id}
                            onChange={() =>
                              dispatch({
                                type: setSelectedAddress,
                                payload: id,
                              })
                            }
                          />
                          <strong>{name + "     " + mobile}</strong>
                        </label>
                        <div className="user-address-detail">
                          {address + ", " + city + ", " + state + "-"}
                          <strong>{pincode}</strong>
                        </div>
                        <p className="address-btns">
                          <BiEdit
                            className="address-edit"
                            title="Edit"
                            onClick={() => {
                              dispatch({ type: setShowAddressModal });
                              dispatch({ type: setEditId, payload: id });
                            }}
                          />
                        </p>
                      </div>
                    )
                  )}
              <div className="add-address-btn-box">
                <button
                  className="add-address-btn"
                  onClick={() => dispatch({ type: setShowAddressModal })}
                >
                  <FaPlus /> Add New Address
                </button>
              </div>
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
                  {cart.map(({ _id, title, qty }) => (
                    <p key={_id}>
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
                    <span>&#8377;{originalPrice}</span>
                  </p>
                  <p>
                    <span>Discount</span>{" "}
                    <span className="green">- &#8377;{discountedPrice}</span>
                  </p>
                  <p>
                    <span>Delivery Charges</span> <span>&#8377; 40</span>
                  </p>
                  <p>
                    <span>Secured Packaging Fee</span> <span>&#8377; 29</span>{" "}
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
                    Your Total Saving on this order &#8377;
                    {discountedPrice}
                  </p>
                </div>
                <button className="btn" onClick={() => handlePayment()}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showAddressModal ? <AddressForm /> : ""}
    </>
  );
};

export default CheckOut;
