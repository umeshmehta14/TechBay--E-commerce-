import React from 'react'
import "./Error.css";
import { useNavigate } from 'react-router-dom';

const Error = () => {
  document.title = "Error/404";
  const navigate = useNavigate();
  return (
    <div className='error-container'>
      <img src="https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/screen-shot-2017-11-23-at-6.42.43-am-1.png" alt="Page Not Found" />
      <button className="btn" onClick={()=> navigate("/")}>Back To Home</button>
    </div>
  )
}

export default Error
