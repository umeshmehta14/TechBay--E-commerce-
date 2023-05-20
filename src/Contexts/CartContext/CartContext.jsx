import { createContext, useContext, useEffect, useState } from "react";
import { useData } from "../DataContext/DataContext";
import { useAuth } from "../AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCartList, getCartList, postCartList, updateCartQuantity } from "./CartApi";
import { cart, updateProductCart } from "../../DataReducer/Constants";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartDisable, setCartDisable] = useState(false);

  useEffect(() => {
    async () => {
      try {
        const cartResponse = await getCartList({ encodedToken: token });
        if (cartResponse.status === 200 || cartResponse.status === 201) {
          dispatch({ type: cart, payload: cartResponse.data.cart });
          dispatch({ type: updateProductCart });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }, [token]);

  const handleCart = async (product) => {
    setCartDisable(true);
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      }
      let cartRes = null;
      if (product.inCart) {
        cartRes = await deleteCartList({
          productId: product._id,
          encodedToken: token,
        });
      } else {
        cartRes = await postCartList({ product, encodedToken: token });
      }
      if (cartRes.status === 201 || cartRes.status === 200) {
        dispatch({ type: cart, payload: cartRes.data.cart });
        dispatch({ type: updateProductCart });
      }
      setCartDisable(false);
      if (product.inCart) {
        // successfully added
      } else {
        // deleted successfully
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCartQuantity = async (updateType, product) =>{
    console.log(updateType);
    try {
      const updatedCart = await updateCartQuantity({type:updateType, productId: product._id, encodedToken: token});
      if (updatedCart.status === 201 || updatedCart.status === 200) {
        dispatch({ type: cart, payload: updatedCart.data.cart });
        dispatch({ type: updateProductCart });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <CartContext.Provider value={{ handleCart, cartDisable, handleCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);