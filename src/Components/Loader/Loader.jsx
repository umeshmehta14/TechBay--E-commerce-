import React from "react";
import { TailSpin } from  'react-loader-spinner'
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-box">
      <TailSpin
        height="80"
        width="80"
        color="#2a7ee5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;