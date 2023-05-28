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
import { category, products } from "../../DataReducer/Constants";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getData = async () => {
    try {
      const productResponse = await getAllProduct();
      if (productResponse.status === 200) {
        dispatch({ type: products, payload: productResponse.data.products });
      }
      const categoryResponse = await getAllCategory();
      if (categoryResponse.status === 200) {
        dispatch({ type: category, payload: categoryResponse.data.categories });
      }
    } catch (err) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <DataContext.Provider value={{ state, loading, error, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
