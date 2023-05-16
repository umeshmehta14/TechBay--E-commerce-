import React from 'react'
import { useAuth } from '../../../Contexts/AuthContext/AuthContext'
import {  useNavigate } from 'react-router-dom';

const LogOut = () => {
  const {logoutHandler} = useAuth();
  const navigate = useNavigate();
  return (
    <div className='container main-login top-6'>
      <div className="auth-box">
    <h1>Log Out</h1>
    <div className='auth-form d-flex'>
        <button className="btn" onClick={()=> {
          logoutHandler()
          navigate("/login");
          
          }}>Log Out</button>
    </div>
    </div>
    </div>
  )
}

export default LogOut
