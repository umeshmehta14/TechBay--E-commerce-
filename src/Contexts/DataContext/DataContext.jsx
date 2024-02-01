import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext,
} from "react";
import { DataReducer } from "../../DataReducer/DataReducer";
import { initialState } from "../../DataReducer/InitialState";
import { getAllCategory, getAllProduct, getBrands } from "./DataApi";
import {
  CATEGORY,
  PRODUCT_DETAIL,
  PRODUCTS,
  SET_BRANDS,
  SET_LOADER2,
} from "../../Utils/Constants";

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
    },
  } = state;

  const getProducts = async () => {
    try {
      loading ? null : dispatch({ type: SET_LOADER2, payload: true });

      console.log(brand.join(), "cat", category.join());
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
        category
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
      console.error(error);
    } finally {
      setLoading(false);
      dispatch({ type: SET_LOADER2, payload: false });
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
    <DataContext.Provider value={{ state, loading, dispatch, getProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
