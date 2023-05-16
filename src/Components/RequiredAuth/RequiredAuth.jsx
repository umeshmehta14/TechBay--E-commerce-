import React from 'react'
import { useAuth } from '../../Contexts/AuthContext/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

const RequiredAuth = ({children}) => {
    const {token} = useAuth();
    const location = useLocation();
  return token ? children : <Navigate to='/login' state={{from : location}}/>
}

export default RequiredAuth