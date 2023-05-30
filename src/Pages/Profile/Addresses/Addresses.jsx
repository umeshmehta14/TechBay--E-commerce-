import React from "react";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { FaPlus, RiDeleteBin5Line, BiEdit } from "../../../Icons/Icons";
import "./Addresses.css";
import {
  setDeleteAddress,
  setEditId,
  setShowAddressModal,
} from "../../../Utils/Constants";

const Addresses = () => {
  const {
    state: { addressList },
    dispatch,
  } = useData();
  return (
    <>
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
        {addressList?.map(
          ({
            id,
            name,
            address,
            city,
            mobile,
            alternatemobile,
            pincode,
            state,
            type
          }) => (
            <div key={id} className="profile-address">
              <p>
                <strong>Name:</strong> {name}
                <span className="profile-address-type">{type}</span>
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
              <p className="address-btns">
                <RiDeleteBin5Line
                className="address-dlt"
                  title="Delete"
                  onClick={() =>
                    dispatch({ type: setDeleteAddress, payload: id })
                  }
                />
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
      </div>
    </>
  );
};

export default Addresses;
