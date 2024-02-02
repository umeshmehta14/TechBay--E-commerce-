import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addToWishList,
  deleteWishlist,
  getWishList,
  removeWishlist,
} from "./WishListApi";
import { useData, useAuth } from "../index";
import { WISHLIST, updateProductWishlist } from "../../Utils/Constants";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [wishDisable, setWishDisable] = useState(false);

  const addProductToWishList = async (productId) => {
    try {
      if (!token) {
        toast.warning(`Need To Login First`, {
          containerId: "A",
          theme: "colored",
        });
        navigate("/login", { state: { from: location } });
        return;
      }
      setWishDisable(true);

      const {
        data: {
          statusCode,
          data: { wishlist },
        },
      } = await addToWishList(productId, token);

      if (statusCode === 200) {
        dispatch({ type: WISHLIST, payload: wishlist });
        toast.success(
          `${wishlist[wishlist.length - 1].title} Added to Wishlist`,
          {
            containerId: "B",
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishDisable(false);
    }
  };

  const removeProductFromWishList = async (productId, title) => {
    try {
      setWishDisable(true);
      const {
        data: {
          statusCode,
          data: { wishlist },
        },
      } = await removeWishlist(productId, token);

      if (statusCode === 200) {
        dispatch({ type: WISHLIST, payload: wishlist });
        toast.warn(`${title} Removed from Wishlist`, {
          containerId: "B",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishDisable(false);
    }
  };

  const getWishlistProducts = async () => {
    try {
      const {
        data: {
          statusCode,
          data: { wishlist },
        },
      } = await getWishList(token);
      if (statusCode === 200) {
        dispatch({
          type: WISHLIST,
          payload: wishlist,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getWishlistProducts();
    }
  }, [token, dispatch]);

  return (
    <WishListContext.Provider
      value={{ addProductToWishList, wishDisable, removeProductFromWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
