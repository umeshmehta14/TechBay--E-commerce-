import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useData, useAuth } from "../index";
import {
  addCartList,
  clearUserCart,
  getCartList,
  removeCartList,
  updateCartQuantity,
} from "./CartApi";
import { CART } from "../../Utils/Constants";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useData();

  const [cartDisable, setCartDisable] = useState(false);

  const addProductToCart = async (productId) => {
    try {
      document.body.style.cursor = "progress";

      if (!token) {
        toast.warning(`Need To Login First`, {
          containerId: "A",
          theme: "colored",
        });
        navigate("/login", { state: { from: location } });
        return;
      }
      setCartDisable(true);

      const {
        data: {
          statusCode,
          data: { cart },
        },
      } = await addCartList(productId, token);
      if (statusCode === 200) {
        dispatch({ type: CART, payload: cart });
        toast.success(`${cart[cart.length - 1].product.title} Added to Cart`, {
          containerId: "B",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      document.body.style.cursor = "default";
      setCartDisable(false);
    }
  };
  const removeProductFromCart = async (productId, title) => {
    try {
      document.body.style.cursor = "progress";

      setCartDisable(true);
      const {
        data: {
          statusCode,
          data: { cart },
        },
      } = await removeCartList(productId, token);
      if (statusCode === 200) {
        dispatch({ type: CART, payload: cart });
        toast.success(`${title} Removed from Cart`, {
          containerId: "B",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      document.body.style.cursor = "default";
      setCartDisable(false);
    }
  };
  const handleCartQuantity = async (productId, quantity) => {
    setCartDisable(true);
    try {
      document.body.style.cursor = "progress";
      const {
        data: { statusCode, data },
      } = await updateCartQuantity(productId, quantity, token);
      if (statusCode === 200) {
        dispatch({ type: CART, payload: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      document.body.style.cursor = "default";
      setCartDisable(false);
    }
  };

  const clearCart = async () => {
    try {
      document.body.style.cursor = "progress";
      const {
        data: { statusCode, data },
      } = await clearUserCart(token);
      if (statusCode === 200) {
        dispatch({ type: CART, payload: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      document.body.style.cursor = "default";
    }
  };

  const handleCartButton = (inCart, item, buyNow) =>
    inCart && !buyNow ? navigate("/cart") : handleCart(item, buyNow);

  useEffect(() => {
    dispatch({ type: CART, payload: [] });
    if (token) {
      (async () => {
        try {
          const {
            data: {
              statusCode,
              data: { cart },
            },
          } = await getCartList(token);
          if (statusCode === 200) {
            dispatch({ type: CART, payload: cart });
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeProductFromCart,
        cartDisable,
        clearCart,
        handleCartQuantity,
        handleCartButton,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
