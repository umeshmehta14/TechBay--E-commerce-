import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";
import { useData } from "./Contexts";
import { Navbar, Loader, Footer, RequiredAuth, Loader2 } from "./Components";
import {
  Home,
  ProductList,
  SignUp,
  Login,
  LogOut,
  Cart,
  CheckOut,
  Error,
  Profile,
  OrderDetails,
  Addresses,
  SingleProduct,
  WishList,
} from "./Pages";

function App() {
  const {
    loading,
    state: { loader2 },
  } = useData();

  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={"A"}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        limit={2}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer
        enableMultiContainer
        containerId={"B"}
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        limit={4}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {loader2 && <Loader2 />}
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/singleProduct/:productId"
              element={<SingleProduct />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/404" element={<Error />} />
            <Route path="*" element={<Navigate to={"/404"} />} />

            <Route
              path="/wishlist"
              element={
                <RequiredAuth>
                  <WishList />
                </RequiredAuth>
              }
            />

            <Route
              path="/profile"
              element={
                <RequiredAuth>
                  <Profile />
                </RequiredAuth>
              }
            >
              <Route path="logout" element={<LogOut />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="orderDetail" element={<OrderDetails />} />
            </Route>
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
