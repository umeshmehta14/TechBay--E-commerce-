import {
  cart,
  CATEGORY,
  clearFilter,
  PRODUCT_DETAIL,
  PRODUCTS,
  SET_BRANDS,
  SET_LOADER2,
  SET_PAGE,
  SET_SEARCH_LOADER,
  SET_SEARCH_PRODUCTS,
  setAddressList,
  setArrangeType,
  setBrandFilter,
  setCategoryFilter,
  setDeleteAddress,
  setEditId,
  setOrderDetails,
  setOutOfStock,
  setPrice,
  setScreenWidth,
  setSearchValue,
  setSelectedAddress,
  setShowAddressModal,
  setShowBurger,
  setShowFilter,
  setShowPassword,
  setShowSearch,
  setShowSearchedProducts,
  setShowSignUpPassword,
  setTrending,
  sortByRating,
  updateAddressList,
  updateProductCart,
  updateProductWishlist,
  wishlist,
} from "../Utils/Constants";

export const DataReducer = (state, action) => {
  switch (action.type) {
    case PRODUCTS:
      return { ...state, products: action.payload };

    case PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };

    case wishlist:
      return {
        ...state,
        wishlist: [...action.payload]?.map((item) => ({
          ...item,
          inWishlist: true,
        })),
      };

    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    case updateProductWishlist:
      const wishlistLookup = state.wishlist?.reduce((lookup, wishlistItem) => {
        lookup[wishlistItem._id] = true;
        return lookup;
      }, {});

      return {
        ...state,
        products: state.products?.map((product) => ({
          ...product,
          inWishlist: !!wishlistLookup[product._id],
        })),
      };

    case cart:
      return {
        ...state,
        cart: [...action.payload]?.map((item) => ({
          ...item,
          inCart: true,
        })),
      };

    case updateProductCart:
      const cartLookup = state.cart?.reduce((lookup, cartItem) => {
        lookup[cartItem._id] = cartItem;
        return lookup;
      }, {});

      return {
        ...state,
        products: state.products?.map((product) => ({
          ...product,
          inCart: !!cartLookup[product._id],
          qty: (cartLookup[product._id] && cartLookup[product._id].qty) || 1,
        })),
      };
    case CATEGORY:
      return { ...state, category: action.payload };

    case SET_PAGE:
      return {
        ...state,
        filters: { ...state.filters, reqPage: action.payload },
      };

    case SET_LOADER2:
      return { ...state, loader2: action.payload };

    case SET_SEARCH_LOADER:
      return { ...state, searchLoader: action.payload };

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
          category: state.filters.category.find(
            (item) => item === action.payload
          )
            ? state.filters.category?.filter((item) => item !== action.payload)
            : [...state.filters.category, action.payload],
        },
      };

    case setBrandFilter:
      return {
        ...state,
        filters: {
          ...state.filters,
          brand: state.filters.brand.find((item) => item === action.payload)
            ? state.filters.brand?.filter((item) => item !== action.payload)
            : [...state.filters.brand, action.payload],
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
          category: [],
          brand: [],
          price: null,
          trending: false,
          includeOutStock: false,
        },
      };

    case setSearchValue:
      return {
        ...state,
        searchValue: action.payload,
      };

    case SET_SEARCH_PRODUCTS:
      return { ...state, searchedProducts: action.payload };
    case setShowBurger:
      return {
        ...state,
        showBurger:
          action.payload !== undefined ? action.payload : !state.showBurger,
      };
    case setShowSearch:
      return { ...state, showSearch: !state.showSearch };

    case setArrangeType:
      return {
        ...state,
        filters: { ...state.filters, arrangeType: action.payload },
      };

    case setScreenWidth:
      return { ...state, screenWidth: window.innerWidth };

    case setShowPassword:
      return { ...state, showPassword: !state.showPassword };

    case setShowSignUpPassword:
      return { ...state, showSignUpPassword: !state.showSignUpPassword };

    case setShowFilter:
      return { ...state, showFilter: !state.showFilter };

    case setShowSearchedProducts:
      return { ...state, showSearchedProducts: action.payload };

    case setAddressList:
      return {
        ...state,
        addressList: [...state.addressList, { ...action.payload }],
      };

    case setShowAddressModal:
      return { ...state, showAddressModal: !state.showAddressModal };

    case setSelectedAddress:
      return { ...state, selectedAddress: action.payload };

    case setDeleteAddress:
      return {
        ...state,
        addressList: state.addressList?.filter(
          ({ id }) => id !== action.payload
        ),
      };

    case setEditId:
      return { ...state, editId: action.payload };

    case updateAddressList:
      return {
        ...state,
        addressList: state.addressList?.map((address) =>
          address.id === action.payload.id ? { ...action.payload } : address
        ),
      };

    case setOrderDetails:
      return {
        ...state,
        orderDetails: [...state.orderDetails, { ...action.payload }],
      };

    default:
      return;
  }
};
