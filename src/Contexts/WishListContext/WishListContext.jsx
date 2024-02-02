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

  console.log(token);

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
        data: { statusCode },
      } = await removeWishlist(productId, token);

      if (statusCode === 200) {
        getWishlistProducts();
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

  // const handleWishList = async (product) => {
  //   try {
  //     if (!token) {
  //       toast.warning(`Need To Login First`, {
  //         containerId: "A",
  //         theme: "colored",
  //       });
  //       navigate("/login", { state: { from: location } });
  //       return;
  //     }
  //     setWishDisable(true);
  //     let wishlistRes = null;
  //     if (product.inWishlist) {
  //       wishlistRes = await deleteWishlist({
  //         productId: product._id,
  //         encodedToken: token,
  //       });
  //       toast.info(`${product.title} Removed From Wishlist`, {
  //         containerId: "B",
  //         theme: "colored",
  //       });
  //     } else {
  //       wishlistRes = await postWishList({ product, encodedToken: token });
  //       toast.success(`${product.title} Added to Wishlist`, {
  //         containerId: "B",
  //         theme: "colored",
  //       });
  //     }
  //     if (wishlistRes.status === 201 || wishlistRes.status === 200) {
  //       dispatch({ type: wishlist, payload: wishlistRes.data.wishlist });
  //       dispatch({ type: updateProductWishlist });
  //     }
  //     setWishDisable(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
