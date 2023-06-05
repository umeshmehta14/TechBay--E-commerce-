import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../Contexts';

export const RequiredAuth = ({children}) => {
    const {token} = useAuth();
    const location = useLocation();
  return token ? children : <Navigate to='/login' state={{from : location}}/>
}