import React, { createContext, useEffect, useState, useReducer, useContext } from 'react'
import { DataReducer, initialState } from '../../DataReducer/DataReducer';
import { getAllCategory, getAllProduct } from './DataApi';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getProducts =async ()=>{
    try {
      const productResponse = await getAllProduct();
      if(productResponse.status === 200)
      {
        dispatch({type:"products", payload: productResponse.data.products});
      }
    } catch (err) {
      setError(error);
    }
    finally{
      setLoading(false);
    }
  }
  const getCategory =async ()=>{
    try {
      const categoryResponse = await getAllCategory();
      if(categoryResponse.status === 200)
      {
        dispatch({type:"category", payload: categoryResponse.data.categories});
      }
    } catch (err) {
      setError(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getProducts();
    getCategory();
  },[0])
  return (
    <DataContext.Provider value={{state, loading, error}}>
      {children}
    </DataContext.Provider>
  )
}

export const useProducts = () => useContext(DataContext);

