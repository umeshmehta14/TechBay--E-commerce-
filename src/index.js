import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";

import {
  CartProvider,
  CartContext,
  AuthContext,
  AuthProvider,
  WishListContext,
  WishListProvider,
  DataContext,
  DataProvider,
} from "./Contexts";

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
  </React.StrictMode>,
  document.getElementById("root")
);

export { DataContext, AuthContext, WishListContext, CartContext };
