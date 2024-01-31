import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext,
} from "react";
import { DataReducer } from "../../DataReducer/DataReducer";
import { initialState } from "../../DataReducer/InitialState";
import { getAllCategory, getAllProduct } from "./DataApi";
import { category, PRODUCT_DETAIL, PRODUCTS } from "../../Utils/Constants";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loading, setLoading] = useState(true);

  const {
    filters: { reqPage },
  } = state;

  const getProducts = async () => {
    try {
      const {
        data: {
          statusCode,
          data: { products, totalPage, currentPage, productFetched },
        },
      } = await getAllProduct(reqPage);
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
    }
  };

  const getCategory = async () => {
    try {
      const {
        data: { statusCode, data },
      } = await getAllCategory();

      console.log(data);
      if (statusCode === 200) {
        dispatch({ type: category, payload: data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getProducts();
  }, [reqPage]);

  return (
    <DataContext.Provider value={{ state, loading, dispatch, getProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
