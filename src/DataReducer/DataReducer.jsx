import {
  category,
  products,
  updateProductWishlist,
  wishlist,
} from "./Constants";

export const DataReducer = (state, action) => {
  switch (action.type) {
    case products:
      return { ...state, products: action.payload };

    case wishlist:
      return {
        ...state,
        wishlist: [...action.payload].map((item) => ({
          ...item,
          inWishlist: true,
        })),
      };

    case updateProductWishlist:
      return {
        ...state,
        products: state.products.map((product) => ({
          ...product,
          inWishlist: state.wishlist.some(
            (element) => element._id === product._id
          ),
        })),
      };
    case category:
      return { ...state, category: action.payload };
  }
};

export const initialState = {
  products: [],
  category: [],
  wishlist: [],
  cart: [],
};
