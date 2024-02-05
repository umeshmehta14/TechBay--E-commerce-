import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import "./CheckOut.css";
import { useData, useAuth, useCart, useCheckout } from "../../Contexts/";
import { popper } from "../../Utils/Popper";
import { AddressForm } from "../../Components";
import { FaPlus, BiEdit } from "../../Utils/Icons/Icons";
import {
  SELECTED_PRODUCT,
  SET_EDIT_ID,
  SET_ORDER_DETAIL,
  SET_SELECTED_ADDRESS,
  SET_SHOW_ADDRESS_MODAL,
} from "../../Utils/Constants";

export const CheckOut = () => {
  const {
    state: {
      addressList,
      cart,
      showAddressModal,
      selectedAddress,
      selectedProduct,
    },
    dispatch,
    getProductById,
  } = useData();

  const { addOrders } = useCheckout();

  document.title = "Checkout";

  const { buyNowId } = useParams();
  const { currentUser } = useAuth();
  const { clearCart } = useCart();
  const { email } = currentUser;
  const navigate = useNavigate();

  const [paymentResponse, setPaymentResponse] = useState(false);
  const originalPrice =
    selectedProduct?.original_price ||
    cart?.reduce(
      (acc, { product: { original_price }, quantity }) =>
        (acc += original_price * quantity),
      0
    );
  const totalCost =
    selectedProduct?.price ||
    cart?.reduce(
      (acc, { product: { price }, quantity }) => (acc += price * quantity),
      0
    );
  const discountedPrice = originalPrice - totalCost;
  const selectedMobileNo = addressList.find(
    ({ _id }) => _id === selectedAddress
  );

  const handlePaymentSuccess = (response) => {
    setPaymentResponse(true);
    addOrders({
      paymentId: response.razorpay_payment_id,
      products: selectedProduct?.title
        ? [{ product: selectedProduct, quantity: 1 }]
        : [...cart],
      address: selectedMobileNo?._id,
      amount: totalCost,
    });
    popper();
    setTimeout(() => {
      navigate("/profile/orderDetail");
    }, 3000);
    clearCart();
  };

  const razorpayOptions = {
    key: "rzp_test_D85llKxUWkwbEZ",
    amount: (totalCost + 79) * 100,
    name: "TechBay",
    description: "Thank You For Ordering",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.VH-BQwstrgYmR6vADnIlFgAAAA&pid=Api&P=0&h=180",
    handler: (response) => handlePaymentSuccess(response),
    prefill: {
      name: selectedMobileNo?.username,
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
    if (addressList?.length > 0) {
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
    dispatch({ type: SELECTED_PRODUCT, payload: {} });
    if (addressList?.length !== 0) {
      dispatch({ type: SET_SELECTED_ADDRESS, payload: addressList[0]._id });
    }
    buyNowId && getProductById(buyNowId);
  }, [buyNowId, addressList, dispatch]);

  return (
    <>
      <main className="container top-6-checkout">
        {paymentResponse ? (
          <div className="order-placed-msg-box pfc">
            Your order has been successfully placed 🥳
          </div>
        ) : (
          <div className="main-checkout-box">
            <section className="address-container">
              {addressList?.length === 0
                ? null
                : addressList?.map(
                    ({
                      _id,
                      name,
                      address,
                      city,
                      mobile,
                      pincode,
                      state,
                      type,
                    }) => (
                      <div
                        key={_id}
                        className={`address-box ${
                          selectedAddress === _id ? "selected" : ""
                        }`}
                        onClick={() =>
                          dispatch({ type: SET_SELECTED_ADDRESS, payload: _id })
                        }
                      >
                        <p className="address-box-type">{type}</p>
                        <label htmlFor={_id}>
                          <input
                            type="radio"
                            checked={selectedAddress === _id}
                            id={_id}
                            onChange={() =>
                              dispatch({
                                type: SET_SELECTED_ADDRESS,
                                payload: _id,
                              })
                            }
                          />
                          <strong>{`${name}    ${mobile}`}</strong>
                        </label>
                        <div className="user-address-detail">
                          {`${address}, ${city},  ${state} - `}
                          <strong>{pincode}</strong>
                        </div>
                        <p className="address-btns">
                          <BiEdit
                            className="address-edit"
                            title="Edit"
                            onClick={() => {
                              dispatch({ type: SET_SHOW_ADDRESS_MODAL });
                              dispatch({ type: SET_EDIT_ID, payload: _id });
                            }}
                          />
                        </p>
                      </div>
                    )
                  )}
              <div className="add-address-btn-box">
                <button
                  className="add-address-btn"
                  onClick={() => dispatch({ type: SET_SHOW_ADDRESS_MODAL })}
                >
                  <FaPlus /> Add New Address
                </button>
              </div>
            </section>
            <section className="order-detail-container">
              <div className="c-cart-price-box ">
                <div className="c-price-heading">
                  <h3 className="pfc">Order Details</h3>
                </div>
                <div className="order-names-box">
                  <h4>
                    <span>Item</span>
                    <span>Qty</span>
                  </h4>
                  {selectedProduct?.title ? (
                    <p>
                      <span>{selectedProduct?.title}</span>
                      <span>{selectedProduct?.quantity || 1}</span>
                    </p>
                  ) : (
                    cart?.map(({ product: { _id, title }, quantity }) => (
                      <p key={_id}>
                        <span>{title}</span>
                        <span>{quantity}</span>
                      </p>
                    ))
                  )}
                </div>
                <div className="c-price-heading">
                  <h3 className="pfc">Price Details</h3>
                </div>
                <div className="price-cost-section">
                  <p>
                    <span>Price ({cart?.length} items)</span>
                    <span>&#8377;{originalPrice}</span>
                  </p>
                  <p>
                    <span>Discount</span>
                    <span className="green">- &#8377;{discountedPrice}</span>
                  </p>
                  <p>
                    <span>Delivery Charges</span> <span>&#8377; 40</span>
                  </p>
                  <p>
                    <span>Secured Packaging Fee</span> <span>&#8377; 29</span>
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
            </section>
          </div>
        )}
      </main>
      {showAddressModal ? <AddressForm /> : null}
    </>
  );
};
