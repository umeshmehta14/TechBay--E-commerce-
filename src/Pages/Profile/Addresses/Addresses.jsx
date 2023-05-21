import React from "react";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { FaPlus, RiDeleteBin5Line } from "../../../Icons/Icons";
import "./Addresses.css";
import { setDeleteAddress, setShowAddressModal } from "../../../DataReducer/Constants";

const Addresses = () => {
  const {
    state: { addressList },
    dispatch,
  } = useData();
  return (
    <div>
      <div className="profile-address-btn">
        <button
          className="add-address-btn"
          onClick={() => dispatch({ type: setShowAddressModal })}
        >
          <FaPlus /> Add New Address
        </button>
      </div>
      <div className="profile-address-container">
        {<h2>{addressList.length === 0 && "No Address To Display"}</h2>}
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
            <div key={id} className="profile-address">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Number:</strong> {mobile}, {alternatemobile}
              </p>
              <p>
                <strong>Address:</strong> {address}, {city}, {state}
              </p>
              <p>
                <strong>Pincode:</strong>
                 {pincode}
              </p>
              <p className="address-dlt">
                <RiDeleteBin5Line title="Delete" onClick={()=> dispatch({type:setDeleteAddress, payload: id})}/>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Addresses;
