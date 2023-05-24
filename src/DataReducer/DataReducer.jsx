import {
  cart,
  category,
  clearFilter,
  products,
  setAddressList,
  setArrangeType,
  setBrandFilter,
  setCategoryFilter,
  setCurrentPage,
  setDeleteAddress,
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

    case setSearchValue:
      const searchValue = action.payload.toLowerCase();
      const searchedProducts =
        searchValue === ""
          ? []
          : state.products.filter(
              ({ title, description, price, category, brand }) =>
                title.toLowerCase().includes(searchValue) ||
                category.toLowerCase().includes(searchValue) ||
                brand.toLowerCase().includes(searchValue) ||
                description.toLowerCase().includes(searchValue) ||
                Number(action.payload) > price
            );

      return {
        ...state,
        searchValue: action.payload,
        searchedProducts,
      };
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
    case setCurrentPage:
      return { ...state, currentPage: action.payload };
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
      return { ...state, addressList: state.addressList.filter(({id})=> id !== action.payload) };
    case setOrderDetails:
      return {...state, orderDetails: [...state.orderDetails, {...action.payload}]};
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
  searchValue: "",
  searchedProducts: [],
  showBurger: false,
  showSearch: false,
  currentPage: 1,
  screenWidth: window.innerWidth,
  showPassword: false,
  showFilter: false,
  showSignUpPassword: false,
  showSearchedProducts: false,
  addressList: [
    {
      id: "2354drtgf4d-7555-49cb--4b09711yujd",
      name: "Donald Modi",
      address: "194 america main road near San Francisco",
      city: "Indore",
      mobile: 9302101111,
      alternatemobile: 123456789,
      pincode: "99988",
      state: "Moscow Pradesh",
    },
  ],
  showAddressModal: false,
  selectedAddress: "2354drtgf4d-7555-49cb--4b09711yujd",
  orderDetails:[]
};


//824686