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
  getAllCategory,
  getAllProduct,
  getBrands,
  searchProducts,
} from "./DataApi";
import {
  CATEGORY,
  PRODUCT_DETAIL,
  PRODUCTS,
  SET_BRANDS,
  SET_LOADER2,
  SET_SEARCH_LOADER,
  SET_SEARCH_PRODUCTS,
} from "../../Utils/Constants";

import { toast } from "react-toastify";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
    searchValue,
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
        console.log(currentPage);
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

  const getSearchProducts = async () => {
    try {
      dispatch({ type: SET_SEARCH_LOADER, payload: true });
      const {
        data: { statusCode, data },
      } = await searchProducts(searchValue);

      if (statusCode === 200) {
        dispatch({ type: SET_SEARCH_PRODUCTS, payload: data });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getCategory();
    getBrandsName();
  }, []);

  useEffect(() => {
    getProducts();
  }, [state.filters]);

  return (
    <DataContext.Provider
      value={{ state, loading, dispatch, getProducts, getSearchProducts }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
