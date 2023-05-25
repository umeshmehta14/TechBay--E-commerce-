import { createContext, useContext, useEffect, useState } from "react";
import { useData } from "../DataContext/DataContext";
import { useAuth } from "../AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCartList,
  getCartList,
  postCartList,
  updateCartQuantity,
} from "./CartApi";
import { cart, updateProductCart } from "../../DataReducer/Constants";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useData();

  const [cartDisable, setCartDisable] = useState(false);

  useEffect(() => {
    dispatch({ type: cart, payload: [] });
    dispatch({ type: updateProductCart });
    (async () => {
      try {
        const cartResponse = await getCartList({ encodedToken: token });
        if (cartResponse.status === 200 || cartResponse.status === 201) {
          dispatch({ type: cart, payload: cartResponse.data.cart });
          dispatch({ type: updateProductCart });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  const handleCart = async (product, buyNow) => {
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
      let cartRes = null;
      if (product.inCart) {
        if (buyNow) {
          setCartDisable(false);
          navigate("/checkout", { state: { from: location } });
          return;
        }
        cartRes = await deleteCartList({
          productId: product._id,
          encodedToken: token,
        });
        toast.info(`${product.title} Removed From Cart`, {
          containerId: "B",
          theme: "colored",
        });
      } else {
        cartRes = await postCartList({ product, encodedToken: token });
        toast.success(`${product.title} Added To Cart`, {
          containerId: "B",
          theme: "colored",
        });
      }
      if (cartRes.status === 201 || cartRes.status === 200) {
        dispatch({ type: cart, payload: cartRes.data.cart });
        dispatch({ type: updateProductCart });
        if (buyNow) {
          setCartDisable(false);
          navigate("/checkout", { state: { from: location } });
          return;
        }
      }
      setCartDisable(false);
    } catch (err) {
      console.error(err);
    }
  };

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
        dispatch({ type: updateProductCart });
      }
    } catch (err) {
      console.log(err);
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

  return (
    <CartContext.Provider
      value={{
        handleCart,
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
