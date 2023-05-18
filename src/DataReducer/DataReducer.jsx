import {
  cart,
  category,
  clearFilter,
  products,
  setArrangeType,
  setBrandFilter,
  setCategoryFilter,
  setCurrentPage,
  setOutOfStock,
  setPrice,
  setScreenWidth,
  setShowBurger,
  setShowSearch,
  setTrending,
  sortByRating,
  updateProductCart,
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
      const wishlistLookup = state.wishlist.reduce((lookup, wishlistItem) => {
        lookup[wishlistItem._id] = true;
        return lookup;
      }, {});

      return {
        ...state,
        products: state.products.map((product) => ({
          ...product,
          inWishlist: !!wishlistLookup[product._id],
        })),
      };

    case cart:
      return {
        ...state,
        cart: [...action.payload].map((item) => ({
          ...item,
          inCart: true,
        })),
      };

    case updateProductCart:
      const cartLookup = state.cart.reduce((lookup, cartItem) => {
        lookup[cartItem._id] = cartItem;
        return lookup;
      }, {});

      return {
        ...state,
        products: state.products.map((product) => ({
          ...product,
          inCart: !!cartLookup[product._id],
          qty: (cartLookup[product._id] && cartLookup[product._id].qty) || 1,
        })),
      };
    case category:
      return { ...state, category: action.payload };

    case sortByRating:
      return {
        ...state,
        filters: { ...state.filters, rating: action.payload },
      };

    case setCategoryFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          categoryFilter: state.filters.categoryFilter.find(
            (item) => item === action.payload
          )
            ? state.filters.categoryFilter.filter(
                (item) => item !== action.payload
              )
            : [...state.filters.categoryFilter, action.payload],
        },
      };

    case setBrandFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          brandFilter: state.filters.brandFilter.find(
            (item) => item === action.payload
          )
            ? state.filters.brandFilter.filter(
                (item) => item !== action.payload
              )
            : [...state.filters.brandFilter, action.payload],
        },
      };

    case setTrending:
      return {
        ...state,
        filters: { ...state.filters, trending: !state.filters.trending },
      };
    case setOutOfStock:
      return {
        ...state,
        filters: {
          ...state.filters,
          includeOutStock: !state.filters.includeOutStock,
        },
      };

    case setPrice:
      return {
        ...state,
        filters: { ...state.filters, price: action.payload },
      };

    case clearFilter:
      return {
        ...state,
        filters: {
          rating: 5,
          categoryFilter: [],
          brandFilter: [],
          price: null,
          trending: false,
          includeOutStock: false,
        },
      };

    case setShowBurger:
      return { ...state, showBurger: !state.showBurger };
    case setShowSearch:
      return { ...state, showSearch: !state.showSearch };

    case setArrangeType:
      return {
        ...state,
        filters: { ...state.filters, arrangeType: action.payload },
      };
    case setCurrentPage:
      return { ...state, currentPage: action.payload };
    case setScreenWidth:
      return { ...state, screenWidth: window.innerWidth };
  }
};

export const initialState = {
  products: [],
  category: [],
  wishlist: [],
  cart: [],
  filters: {
    rating: 5,
    categoryFilter: [],
    brandFilter: [],
    price: null,
    trending: false,
    includeOutStock: false,
    arrangeType: "",
  },
  showBurger: false,
  showSearch: false,
  currentPage: 1,
  screenWidth: window.innerWidth,
};
