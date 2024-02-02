import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useData, useAuth } from "../index";
import {
  addCartList,
  deleteCartList,
  getCartList,
  postCartList,
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
      setCartDisable(false);
    }
  };

  // const handleCart = async (product, buyNow) => {
  //   try {
  //     if (!token) {
  //       toast.warning(`Need To Login First`, {
  //         containerId: "A",
  //         theme: "colored",
  //       });
  //       navigate("/login", { state: { from: location } });
  //       return;
  //     }
  //     setCartDisable(true);
  //     let cartRes = null;
  //     if (product.inCart) {
  //       if (buyNow) {
  //         setCartDisable(false);
  //         navigate("/checkout", { state: { from: location } });
  //         return;
  //       }
  //       cartRes = await deleteCartList({
  //         productId: product._id,
  //         encodedToken: token,
  //       });
  //       toast.info(`${product.title} Removed From Cart`, {
  //         containerId: "B",
  //         theme: "colored",
  //       });
  //     } else {
  //       cartRes = await postCartList({ product, encodedToken: token });
  //       toast.success(`${product.title} Added To Cart`, {
  //         containerId: "B",
  //         theme: "colored",
  //       });
  //     }
  //     if (cartRes.status === 201 || cartRes.status === 200) {
  //       dispatch({ type: CART, payload: cartRes.data.cart });
  //       if (buyNow) {
  //         setCartDisable(false);
  //         navigate("/checkout", { state: { from: location } });
  //         return;
  //       }
  //     }
  //     setCartDisable(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleCartQuantity = async (updateType, product) => {
    setCartDisable(true);
    if (product.qty >= 10 && updateType === "increment") {
      toast.warning(
        "Oops! Quantity Exceeded: The maximum allowed quantity for this product is 10",
        { containerId: "A", theme: "colored" }
      );
      setCartDisable(false);

      return;
    }
    try {
      const updatedCart = await updateCartQuantity({
        type: updateType,
        productId: product._id,
        encodedToken: token,
      });
      if (updatedCart.status === 201 || updatedCart.status === 200) {
        dispatch({ type: cart, payload: updatedCart.data.cart });
      }
    } catch (err) {
      console.error(err);
    }
    setCartDisable(false);
  };

  const clearCart = () => {
    state.cart.forEach((element) => {
      handleCart(element);
    });
  };

  const handleCartButton = (inCart, item, buyNow) =>
    inCart && !buyNow ? navigate("/cart") : handleCart(item, buyNow);

  useEffect(() => {
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
