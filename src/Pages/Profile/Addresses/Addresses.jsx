import "./Addresses.css";
import { useCheckout, useData } from "../../../Contexts";
import { SET_EDIT_ID, SET_SHOW_ADDRESS_MODAL } from "../../../Utils/Constants";
import { FaPlus, RiDeleteBin5Line, BiEdit } from "../../../Utils/Icons/Icons";

export const Addresses = () => {
  const {
    state: { addressList },
    dispatch,
  } = useData();

  const { removeAddress } = useCheckout();
  return (
    <>
      <section className="profile-address-btn">
        <button
          className="add-address-btn"
          onClick={() => dispatch({ type: SET_SHOW_ADDRESS_MODAL })}
        >
          <FaPlus /> Add New Address
        </button>
      </section>
      <section className="profile-address-container">
        {<h2>{addressList?.length === 0 && "No Address To Display"}</h2>}
        {addressList?.map(
          ({
            _id,
            name,
            address,
            city,
            mobile,
            alternatemobile,
            pincode,
            state,
            type,
          }) => (
            <div key={_id} className="profile-address">
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
                  onClick={() => removeAddress(_id)}
                />
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
      </section>
    </>
  );
};
