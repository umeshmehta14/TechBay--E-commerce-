import React, { useEffect, useState } from "react";
import "./AddressForm.css";
import { useData } from "../../Contexts/DataContext/DataContext";
import { faker } from "@faker-js/faker";
import { RxCross1 } from "../../Icons/Icons";

import { v4 as uuid } from "uuid";
import {
  setShowAddressModal,
  setAddressList,
  setEditId,
  updateAddressList,
} from "../../DataReducer/Constants";

const AddressForm = () => {
  const {
    dispatch,
    state: { editId, addressList },
  } = useData();
  const emptyFormData = {
    id: "",
    name: "",
    address: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    alternatemobile: "",
  };
  const [formData, setFormData] = useState(emptyFormData);
  const { name, address, mobile, city, state, pincode, alternatemobile } =
    formData;
  const statesData = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleRandomAddress = () => {
    setFormData({
      ...formData,
      name: faker.person.fullName(),
      mobile: faker.number.int({ min: 10000000000, max: 99999999999 }),
      pincode: faker.location.zipCode("######"),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      alternatemobile: faker.number.int({ min: 10000000000, max: 99999999999 }),
      state: statesData[Math.floor(Math.random() * statesData.length - 1)],
    });
  };
  const formResetHandler = () => {
    setFormData(emptyFormData);
  };
  const addressHandler = (e) => {
    e.preventDefault();
    if (editId.length > 0) {
      dispatch({ type: updateAddressList, payload: { ...formData } });
    } else {
      const r_id = uuid();
      dispatch({ type: setAddressList, payload: { ...formData, id: r_id } });
    }
    setFormData(emptyFormData);
    dispatch({ type: setShowAddressModal });
    dispatch({ type: setEditId, payload: "" });
  };

  useEffect(() => {
    if (editId.length > 0) {
      const selectedAddress = addressList.find(({ id }) => id === editId);
      setFormData({
        ...formData,
        id: editId,
        name: selectedAddress.name,
        mobile: selectedAddress.mobile,
        pincode: selectedAddress.pincode,
        city: selectedAddress.city,
        address: selectedAddress.address,
        alternatemobile: selectedAddress.alternatemobile,
        state: selectedAddress.state,
      });
    }
  }, [editId]);

  return (
    <div className="address-form-container">
      <form action="" className="address-inp-form" onSubmit={addressHandler}>
        <p>
          <RxCross1
          title="Cancel"
            onClick={() => {
              dispatch({ type: setShowAddressModal });
              dispatch({ type: setEditId, payload: "" });
            }}
          />
        </p>
        <div className="f-address-detail">
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <label className="form-label" htmlFor="name">
            Name
          </label>
        </div>
        <div className="f-address-detail">
          <input
            type="number"
            id="number"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
          />
          <label className="form-label" htmlFor="number">
            Number
          </label>
        </div>
        <div className="f-address-detail">
          <input
            type="number"
            id="pincode"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            required
          />
          <label className="form-label" htmlFor="pincode">
            Pincode
          </label>
        </div>
        <div className="f-address-detail">
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <label className="form-label" htmlFor="city">
            City
          </label>
        </div>
        <div className="f-address-inp f-address-detail">
          <textarea
            name="address"
            id="address"
            placeholder="Address(Area and Street)"
            value={address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <label className="form-label" htmlFor="address">
          Address(Area and Street)
          </label>
        </div>
        <div className="f-address-detail">
          <input
            type="number"
            id="anumber"
            placeholder="Alternate Mobile no."
            value={alternatemobile}
            onChange={(e) =>
              setFormData({ ...formData, alternatemobile: e.target.value })
            }
            required
          />
          <label className="form-label" htmlFor="anumber">
            Pincode
          </label>
        </div>
        <div className="f-address-detail">
          <select
            name=""
            id=""
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            value={state}
            required
          >
            <option disabled value="">
              --Select State--
            </option>
            {statesData.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="f-address-detail-btn-box">
          <button type="submit" className="btn">
            {editId.length > 0 ? "Save" : "Add"}
          </button>
          <button
            className="btn bg-white"
            type="button"
            onClick={() => formResetHandler()}
          >
            Reset
          </button>
          {editId.length > 0 ? (
            ""
          ) : (
            <button
              className="btn bg-white"
              type="button"
              onClick={handleRandomAddress}
            >
              Random Data
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
