import { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import {
  addUserAddress,
  getAddress,
  removeUserAddress,
  updateUserAddress,
} from "./CheckoutApi";
import { useAuth } from "../AuthContext/AuthContext";
import { useData } from "../DataContext/DataContext";
import { SET_ADDRESS_LIST } from "../../Utils/Constants";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const { token } = useAuth();
  const {
    dispatch,
    state: { addressList },
  } = useData();

  const getAllAddress = async () => {
    try {
      const {
        data: { statusCode, data },
      } = await getAddress(token);

      if (statusCode === 200) {
        dispatch({ type: SET_ADDRESS_LIST, payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addAddress = async (address) => {
    document.body.style.cursor = "progress";

    try {
      const {
        data: { statusCode, data },
      } = await addUserAddress(token, address);

      if (statusCode === 201) {
        dispatch({ type: SET_ADDRESS_LIST, payload: data });
        toast.success("Address Added", {
          containerId: "B",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      document.body.style.cursor = "default";
    }
  };

  const removeAddress = async (addressId) => {
    document.body.style.cursor = "progress";
    try {
      const {
        data: { statusCode, data },
      } = await removeUserAddress(token, addressId);

      if (statusCode === 200) {
        dispatch({ type: SET_ADDRESS_LIST, payload: data });
        toast.info("Address Removed", {
          containerId: "B",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      document.body.style.cursor = "default";
    }
  };

  const updateAddress = async (address) => {
    document.body.style.cursor = "progress";
    try {
      const {
        data: { statusCode, data },
      } = await updateUserAddress(token, address);

      if (statusCode === 200) {
        dispatch({ type: SET_ADDRESS_LIST, payload: data });
        toast.info("Address Updated", {
          containerId: "B",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      document.body.style.cursor = "default";
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  return (
    <CheckoutContext.Provider
      value={{ addAddress, removeAddress, updateAddress }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
