import React from "react";
import { toast } from "react-toastify";


import "./Addresses.css";
import { useData } from "../../../Contexts";
import {
  setDeleteAddress,
  setEditId,
  setShowAddressModal,
} from "../../../Utils/Constants";
import { FaPlus, RiDeleteBin5Line, BiEdit } from "../../../Utils/Icons/Icons";

export const Addresses = () => {
  const {
    state: { addressList },
    dispatch,
  } = useData();
  return (
    <>
      <section className="profile-address-btn">
        <button
          className="add-address-btn"
          onClick={() => dispatch({ type: setShowAddressModal })}
        >
          <FaPlus /> Add New Address
        </button>
      </section>
      <section className="profile-address-container">
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
            type,
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
                  onClick={() => {
                    dispatch({ type: setDeleteAddress, payload: id });
                    toast.info("Address Removed", {
                      containerId: "B",
                      theme: "colored",
                    });
                  }}
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
      </section>
    </>
  );
};
