import React, { createContext, useEffect, useState, useReducer, useContext } from 'react'
import { DataReducer, initialState } from '../DataReducer/DataReducer';
import { getAllProduct } from './Services/Services';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getData =async ()=>{
    try {
      const productResponse = await getAllProduct();
      dispatch({type:"products", payload: productResponse.data.products});
    } catch (err) {
      setError(error);
    }
    finally{
      setLoading(false);
    }
  }
  console.log(state.products);

  useEffect(()=>{
    getData();
  })
  return (
    <DataContext.Provider value={{state, loading, error}}>
      {children}
    </DataContext.Provider>
  )
}

export const useProducts = () => useContext(DataContext);

