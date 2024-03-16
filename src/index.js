import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  CartProvider,
  CartContext,
  AuthContext,
  AuthProvider,
  WishListContext,
  WishListProvider,
  DataContext,
  DataProvider,
  CheckoutProvider,
  CheckoutContext,
} from "./Contexts";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="417672979601-eua5tid3i1urmbugqjna8ol2gbapeptb.apps.googleusercontent.com">
      <Router>
        <AuthProvider>
          <DataProvider>
            <CartProvider>
              <WishListProvider>
                <CheckoutProvider>
                  <App />
                </CheckoutProvider>
              </WishListProvider>
            </CartProvider>
          </DataProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export {
  DataContext,
  AuthContext,
  WishListContext,
  CartContext,
  CheckoutContext,
};
