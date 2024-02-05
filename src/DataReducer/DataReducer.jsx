import {
  CART,
  CATEGORY,
  CLEAR_FILTER,
  FEATURED_PRODUCT,
  PRODUCT_DETAIL,
  PRODUCTS,
  SELECTED_PRODUCT,
  SET_BRANDS,
  SET_FILTER_SEARCH_TEXT,
  SET_LOADER2,
  SET_PAGE,
  SET_SEARCH_LOADER,
  SET_SEARCH_PRODUCTS,
  SET_ADDRESS_LIST,
  SET_ARRANGE_TYPE,
  SET_BRAND_FILTER,
  SET_CATEGORY_FILTER,
  setDeleteAddress,
  SET_EDIT_ID,
  SET_ORDER_DETAIL,
  SET_OUT_OF_STOCK,
  SET_PRICE,
  setScreenWidth,
  SET_SEARCH_VALUE,
  SET_SELECTED_ADDRESS,
  SET_SHOW_ADDRESS_MODAL,
  SET_SHOW_BURGER,
  setShowFilter,
  setShowPassword,
  setShowSearch,
  setShowSearchedProducts,
  setShowSignUpPassword,
  SET_TRENDING,
  SORT_BY_RATING,
  UPDATE_ADDRESS,
  WISHLIST,
} from "../Utils/Constants";

export const DataReducer = (state, action) => {
  switch (action.type) {
    case PRODUCTS:
      return { ...state, products: action.payload };

    case PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };

    case FEATURED_PRODUCT:
      return { ...state, featuredProducts: action.payload };

    case SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    case WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    case CART:
      return {
        ...state,
        cart: action.payload,
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

    case SORT_BY_RATING:
      return {
        ...state,
        filters: { ...state.filters, rating: action.payload },
      };

    case SET_CATEGORY_FILTER:
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

    case SET_BRAND_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          brand: state.filters.brand.find((item) => item === action.payload)
            ? state.filters.brand?.filter((item) => item !== action.payload)
            : [...state.filters.brand, action.payload],
        },
      };

    case SET_FILTER_SEARCH_TEXT:
      return {
        ...state,
        filters: { ...state.filters, searchText: action.payload },
      };

    case SET_TRENDING:
      return {
        ...state,
        filters: { ...state.filters, trending: !state.filters.trending },
      };
    case SET_OUT_OF_STOCK:
      return {
        ...state,
        filters: {
          ...state.filters,
          includeOutStock: !state.filters.includeOutStock,
        },
      };

    case SET_PRICE:
      return {
        ...state,
        filters: { ...state.filters, price: action.payload },
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          rating: 5,
          category: [],
          brand: [],
          price: null,
          trending: false,
          includeOutStock: false,
          reqPage: 1,
        },
      };

    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };

    case SET_SEARCH_PRODUCTS:
      return { ...state, searchedProducts: action.payload };
    case SET_SHOW_BURGER:
      return {
        ...state,
        showBurger:
          action.payload !== undefined ? action.payload : !state.showBurger,
      };
    case setShowSearch:
      return { ...state, showSearch: !state.showSearch };

    case SET_ARRANGE_TYPE:
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

    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload,
      };

    case SET_SHOW_ADDRESS_MODAL:
      return { ...state, showAddressModal: !state.showAddressModal };

    case SET_SELECTED_ADDRESS:
      return { ...state, selectedAddress: action.payload };

    case SET_EDIT_ID:
      return { ...state, editId: action.payload };

    case UPDATE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList?.map((address) =>
          address.id === action.payload.id ? { ...action.payload } : address
        ),
      };

    case SET_ORDER_DETAIL:
      return {
        ...state,
        orderDetails: action.payload,
      };

    default:
      return;
  }
};
