import React, { useEffect } from 'react'
import { useAuth } from '../../../Contexts/AuthContext/AuthContext'
import {  useNavigate } from 'react-router-dom';

const LogOut = () => {
  const {token} = useAuth();
  const {logoutHandler, currentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/');
    }
  },[token]);
  return (
    <div className='container main-login top-6'>
      <div className="auth-box">
        <div className='login-box'>

    <h1>Log Out</h1>
    <div className='auth-form d-flex'>
      <h2>Name:{currentUser?.firstName+" " +currentUser?.lastName}</h2>
      <h2>Email:{currentUser?.email}</h2>
        <button className="btn" onClick={()=> {
          logoutHandler()
          navigate("/login");
        }}>Log Out</button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default LogOut
