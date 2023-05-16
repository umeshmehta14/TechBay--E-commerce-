import { createContext, useContext, useEffect } from "react";
import { deleteWishlist, getWishList, postWishList } from "./WishListApi";
import { useData } from "../DataContext/DataContext";
import { updateProductWishlist, wishlist } from "../../DataReducer/Constants";
import { useAuth } from "../AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const { dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async () => {
      try {
        const wishlistResponse = await getWishList({encodedToken: token});
        if (wishlistResponse.status === 200) {
          dispatch({ type: wishlist, payload: wishlistResponse.data.wishlist });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }, [token]);

  const handleWishList = async (product) => {
    console.log("in whish");
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      }
      let wishlistRes = null;
      if (product.inWishlist) {
        wishlistRes = await deleteWishlist({productId: product._id,encodedToken: token});
        if (wishlistRes.status === 201 || wishlistRes.status === 200) {
          console.log("in delete  ",wishlistRes);
        }
      } else {
        wishlistRes = await postWishList({product,encodedToken: token});
        console.log(wishlistRes.data.wishlist);
      }
      dispatch({ type: wishlist, payload: wishlistRes.data.wishlist });
      dispatch({ type: updateProductWishlist });
      if (product.inWishlist) {
        // successfully added
      } else {
        // deleted successfully
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <WishListContext.Provider value={{ handleWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
