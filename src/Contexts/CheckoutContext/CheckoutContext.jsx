import { createContext, useContext, useEffect } from "react";
import { addUserAddress, getAddress } from "./CheckoutApi";
import { useAuth } from "../AuthContext/AuthContext";
import { useData } from "../DataContext/DataContext";
import { SET_ADDRESS_LIST } from "../../Utils/Constants";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const { token } = useAuth();
  const { dispatch } = useData();

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
      } = await addUserAddress(token, addressId);

      if (statusCode === 201) {
        dispatch({ type: SET_ADDRESS_LIST, payload: data });
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
    <CheckoutContext.Provider value={{ addAddress, removeAddress }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
