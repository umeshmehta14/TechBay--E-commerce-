import React from "react";
import { TailSpin, Oval } from "react-loader-spinner";
import "./Loader.css";

export const Loader = () => {
  return (
    <main className="loader-box">
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
    </main>
  );
};

export const Loader2 = () => {
  return (
    <main className="loader2">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#2a7ee5"
        secondaryColor="#9dc9ff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        strokeWidth="4"
        strokeWidthSecondary="4"
      />
    </main>
  );
};
