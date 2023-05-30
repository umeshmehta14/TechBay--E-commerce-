import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

import { DataContext, DataProvider } from "./Contexts/DataContext/DataContext";
import {
  WishListContext,
  WishListProvider,
} from "./Contexts/WishListContext/WishListContext";
import {
  AuthContext,
  AuthProvider,
} from "./Contexts/AuthContext/AuthContext.jsx";
import { CartProvider, CartContext } from "./Contexts/CartContext/CartContext";


makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <WishListProvider>
              <App />
            </WishListProvider>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
   </React.StrictMode>
  ,document.getElementById("root")
);

export { DataContext };
export { AuthContext };
export { WishListContext };
export { CartContext };
