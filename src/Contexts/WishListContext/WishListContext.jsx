import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteWishlist, getWishList, postWishList } from "./WishListApi";
import { useData, useAuth } from "../index";
import { updateProductWishlist, wishlist } from "../../Utils/Constants";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [wishDisable, setWishDisable] = useState(false);

  useEffect(() => {
    dispatch({ type: wishlist, payload: [] });
    dispatch({ type: updateProductWishlist });
    if (token) {
      (async () => {
        try {
          const wishlistResponse = await getWishList({ encodedToken: token });
          if (wishlistResponse.status === 200) {
            dispatch({
              type: wishlist,
              payload: wishlistResponse.data.wishlist,
            });
            dispatch({ type: updateProductWishlist });
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [token, dispatch]);

  const handleWishList = async (product) => {
    setWishDisable(true);
    try {
      if (!token) {
        toast.warning(`Need To Login First`, {
          containerId: "A",
          theme: "colored",
        });
        navigate("/login", { state: { from: location } });
        return;
      }
      let wishlistRes = null;
      if (product.inWishlist) {
        wishlistRes = await deleteWishlist({
          productId: product._id,
          encodedToken: token,
        });
        toast.info(`${product.title} Removed From Wishlist`, {
          containerId: "B",
          theme: "colored",
        });
      } else {
        wishlistRes = await postWishList({ product, encodedToken: token });
        toast.success(`${product.title} Added to Wishlist`, {
          containerId: "B",
          theme: "colored",
        });
      }
      if (wishlistRes.status === 201 || wishlistRes.status === 200) {
        dispatch({ type: wishlist, payload: wishlistRes.data.wishlist });
        dispatch({ type: updateProductWishlist });
      }
      setWishDisable(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <WishListContext.Provider value={{ handleWishList, wishDisable }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
