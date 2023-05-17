import { createContext, useContext, useEffect, useState } from "react";
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
  const [wishDisable, setWishDisable] = useState(false);

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
    setWishDisable(true);
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      }
      let wishlistRes = null;
      if (product.inWishlist) {
        wishlistRes = await deleteWishlist({productId: product._id,encodedToken: token});
        
      } else {
        wishlistRes = await postWishList({product,encodedToken: token});
        console.log(wishlistRes.data.wishlist);
      }
      if (wishlistRes.status === 201 || wishlistRes.status === 200) {
        dispatch({ type: wishlist, payload: wishlistRes.data.wishlist });
        dispatch({ type: updateProductWishlist });
      }
      setWishDisable(false);
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
    <WishListContext.Provider value={{ handleWishList, wishDisable }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
