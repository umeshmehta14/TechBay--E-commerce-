import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext,
} from "react";
import { DataReducer } from "../../DataReducer/DataReducer";
import { initialState } from "../../DataReducer/InitialState";
import {
  featuredProducts,
  getAllCategory,
  getAllProduct,
  getBrands,
  productById,
  searchProducts,
} from "./DataApi";
import {
  CATEGORY,
  FEATURED_PRODUCT,
  PRODUCT_DETAIL,
  PRODUCTS,
  SELECTED_PRODUCT,
  SET_BRANDS,
  SET_LOADER2,
  SET_SEARCH_LOADER,
  SET_SEARCH_PRODUCTS,
} from "../../Utils/Constants";

import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loading, setLoading] = useState(true);

  const {
    filters: {
      reqPage,
      includeOutStock,
      rating,
      price,
      trending,
      brand,
      category,
      arrangeType,
      searchText,
    },
  } = state;

  const getProducts = async () => {
    try {
      loading ? null : dispatch({ type: SET_LOADER2, payload: true });

      const {
        data: {
          statusCode,
          data: { products, totalPage, currentPage, productFetched },
        },
      } = await getAllProduct(
        reqPage,
        includeOutStock,
        rating,
        price,
        trending,
        brand,
        category,
        arrangeType,
        searchText
      );
      if (statusCode === 200) {
        dispatch({ type: PRODUCTS, payload: products });
        dispatch({
          type: PRODUCT_DETAIL,
          payload: {
            totalPage,
            currentPage: Number(currentPage),
            productFetched,
          },
        });
      }
    } catch (error) {
      toast.error("Internal server Error, try after sometime", {
        containerId: "A",
        theme: "colored",
      });
      console.error(error);
    } finally {
      setLoading(false);
      dispatch({ type: SET_LOADER2, payload: false });
    }
  };

  const getSearchProducts = async (query) => {
    try {
      dispatch({ type: SET_SEARCH_LOADER, payload: true });
      const {
        data: { statusCode, data },
      } = await searchProducts(query);

      if (statusCode === 200) {
        dispatch({ type: SET_SEARCH_PRODUCTS, payload: data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: SET_SEARCH_LOADER, payload: false });
    }
  };

  const getCategory = async () => {
    try {
      const {
        data: { statusCode, data },
      } = await getAllCategory();

      if (statusCode === 200) {
        dispatch({ type: CATEGORY, payload: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getBrandsName = async () => {
    try {
      const {
        data: {
          statusCode,
          data: { brands },
        },
      } = await getBrands();

      if (statusCode === 200) {
        dispatch({ type: SET_BRANDS, payload: brands });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      const {
        data: { statusCode, data },
      } = await featuredProducts();

      if (statusCode === 200) {
        dispatch({ type: FEATURED_PRODUCT, payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProductById = async (productId) => {
    try {
      dispatch({ type: SET_LOADER2, payload: true });
      const {
        data: { statusCode, data },
      } = await productById(productId);

      if (statusCode === 200) {
        dispatch({ type: SELECTED_PRODUCT, payload: data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: SET_LOADER2, payload: false });
    }
  };

  useEffect(() => {
    getCategory();
    getFeaturedProducts();
    getBrandsName();
  }, []);

  useEffect(() => {
    getProducts();
  }, [state.filters]);

  return (
    <DataContext.Provider
      value={{
        state,
        loading,
        dispatch,
        getProducts,
        getSearchProducts,
        getProductById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
