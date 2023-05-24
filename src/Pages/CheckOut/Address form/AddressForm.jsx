import React, { useState } from "react";
import "./AddressForm.css";
import { useData } from "../../../Contexts/DataContext/DataContext";
import { faker } from "@faker-js/faker";
import {
  setAddressList,
  setShowAddressModal,
} from "../../../DataReducer/Constants";
import { v4 as uuid } from "uuid";

const AddressForm = () => {
  const { dispatch } = useData();
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
  const {  name, address, mobile, city, state, pincode, alternatemobile } =
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
    setFormData({...formData,
      name: faker.person.fullName(),
      mobile: faker.number.int({min:10000000000, max:99999999999}),
      pincode: faker.location.zipCode("######"),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      alternatemobile: faker.number.int({min:10000000000, max:99999999999}),
      state: statesData[Math.floor(Math.random() * statesData.length - 1)],
    });
  };
  const formResetHandler = () => {
    setFormData(emptyFormData);
  };
  const addressHandler = (e) => {
    e.preventDefault();
    const r_id = uuid();
    dispatch({ type: setAddressList, payload: { ...formData, id: r_id } });
    setFormData(emptyFormData);
    dispatch({ type: setShowAddressModal });
  };

  return (
    <div className="address-form-container">
      <form action="" className="address-inp-form" onSubmit={addressHandler}>
        <div className="f-address-detail">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
          />
        </div>
        <div className="f-address-detail">
          <input
            type="number"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div className="f-address-inp">
          <textarea
            name=""
            id=""
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>
        <div className="f-address-detail">
          <input
            type="number"
            placeholder="Alternate Mobile no."
            value={alternatemobile}
            onChange={(e) =>
              setFormData({ ...formData, alternatemobile: e.target.value })
            }
            required
          />
          <select
            name=""
            id=""
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            value={state}
            required
          >
            <option disabled value>
              Choose State
            </option>
            {statesData.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="f-address-detail-btn-box">
          <button type="submit" className="btn">
            Add
          </button>
          <button className="btn bg-white"
          type="button"
           onClick={() => formResetHandler()}>
            Reset
          </button>

          <button
            className="btn bg-white"
            type="button"
            onClick={handleRandomAddress}
          >
            Random Data
          </button>

          <button
            className="btn red"
            type="button"
            onClick={() => dispatch({ type: setShowAddressModal })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
