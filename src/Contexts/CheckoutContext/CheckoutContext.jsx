import { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import {
  addUserAddress,
  addUserOrder,
  deleteUserOrder,
  getAddress,
  getUserOrders,
  removeUserAddress,
  updateUserAddress,
} from "./CheckoutApi";
import { useAuth } from "../AuthContext/AuthContext";
import { useData } from "../DataContext/DataContext";
import { SET_ADDRESS_LIST, SET_ORDER_DETAIL } from "../../Utils/Constants";

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

  const getOrders = async () => {
    try {
      const {
        data: { statusCode, data },
      } = await getUserOrders(token);

      if (statusCode === 200) {
        dispatch({ type: SET_ORDER_DETAIL, payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addOrders = async (order) => {
    try {
      const {
        data: { statusCode },
      } = await addUserOrder(token, order);

      if (statusCode === 201) {
        getOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeOrders = async (orderId) => {
    document.body.style.cursor = "progress";
    try {
      const {
        data: { statusCode },
      } = await deleteUserOrder(token, orderId);

      if (statusCode === 200) {
        getOrders();
        toast.success("Thank you for shopping with us!", {
          containerId: "A",
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
    getOrders();
  }, [token]);

  return (
    <CheckoutContext.Provider
      value={{
        addAddress,
        removeAddress,
        updateAddress,
        addOrders,
        removeOrders,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
