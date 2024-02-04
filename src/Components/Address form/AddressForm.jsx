import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

import "./AddressForm.css";
import { useCheckout, useData } from "../../Contexts";
import { RxCross1 } from "../../Utils/Icons/Icons";
import {
  SET_SHOW_ADDRESS_MODAL,
  SET_EDIT_ID,
  UPDATE_ADDRESS,
  STATE_DATA,
} from "../../Utils/Constants";

export const AddressForm = () => {
  const {
    dispatch,
    state: { editId, addressList },
  } = useData();

  const { addAddress, updateAddress } = useCheckout();

  const emptyFormData = {
    id: "",
    name: "",
    address: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    alternatemobile: "",
    type: "",
  };
  const [formData, setFormData] = useState(emptyFormData);
  const { name, address, mobile, city, state, pincode, alternatemobile, type } =
    formData;

  const handleRandomAddress = () => {
    setFormData({
      ...formData,
      name: faker.person.fullName(),
      mobile: faker.number.int({ min: 10000000000, max: 99999999999 }),
      pincode: faker.location.zipCode("######"),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      alternatemobile: faker.number.int({ min: 10000000000, max: 99999999999 }),
      state: STATE_DATA[Math.floor(Math.random() * STATE_DATA.length - 1)],
      type: "Home",
    });
  };

  const formResetHandler = () => {
    setFormData(emptyFormData);
  };

  const addressHandler = (e) => {
    e.preventDefault();
    if (editId?.length > 0) {
      updateAddress({ _id: editId, ...formData });
    } else {
      addAddress(formData);
    }
    setFormData(emptyFormData);
    dispatch({ type: SET_SHOW_ADDRESS_MODAL });
    dispatch({ type: SET_EDIT_ID, payload: "" });
  };

  useEffect(() => {
    if (editId?.length > 0) {
      const selectedAddress = addressList?.find(({ _id }) => _id === editId);
      setFormData({
        ...formData,
        id: editId,
        name: selectedAddress?.name,
        mobile: selectedAddress?.mobile,
        pincode: selectedAddress?.pincode,
        city: selectedAddress?.city,
        address: selectedAddress?.address,
        alternatemobile: selectedAddress?.alternatemobile,
        state: selectedAddress?.state,
        type: selectedAddress?.type,
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
              dispatch({ type: SET_SHOW_ADDRESS_MODAL });
              dispatch({ type: SET_EDIT_ID, payload: "" });
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
            Alternate Number
          </label>
        </div>
        <div className="f-address-detail">
          <select
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            value={state}
            required
          >
            <option disabled value="">
              --Select State--
            </option>
            {STATE_DATA?.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="f-address-detail">
          <select
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            value={type}
            required
          >
            <option disabled value="">
              --Address Type
            </option>
            <option value="Home">Home (All Day Delivery)</option>
            <option value="Office">
              Office (Delivery Between 10 Am - 5 Am)
            </option>
          </select>
        </div>
        <div className="f-address-detail-btn-box">
          <button type="submit" className="btn">
            {editId.length > 0 ? "Save" : "Add"}
          </button>
          <button className="btn" type="button" onClick={formResetHandler}>
            Reset
          </button>
          {editId.length > 0 ? null : (
            <button className="btn" type="button" onClick={handleRandomAddress}>
              Random Data
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
