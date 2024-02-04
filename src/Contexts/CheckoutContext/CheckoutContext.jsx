import { createContext, useContext, useEffect } from "react";
import { getAddress } from "./CheckoutApi";
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
        console.log(data);
        dispatch({ type: SET_ADDRESS_LIST, payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  return (
    <CheckoutContext.Provider value={{}}>{children}</CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
