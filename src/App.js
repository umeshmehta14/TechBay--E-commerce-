import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useData } from "./Contexts/DataContext/DataContext";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import SingleProduct from "./Pages/Single Product Page/SingleProduct";
import Login from "./Pages/Authentication/Login/Login";
import SignUp from "./Pages/Authentication/SignUp/SignUp";
import LogOut from "./Pages/Authentication/LogOut/LogOut";
import RequiredAuth from "./Components/RequiredAuth/RequiredAuth";
import WishList from "./Pages/Wishlist/WishList";
import Cart from "./Pages/Cart/Cart";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Profile from "./Pages/Profile/Profile";
import Addresses from "./Pages/Profile/Addresses/Addresses";
import OrderDetails from "./Pages/Profile/OrderDetail/OrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Components/Loader/Loader";

function App() {
  const { loading } = useData();
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
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/singleProduct/:productId"
              element={<SingleProduct />}
            />
            <Route path="/error" element={<Error />} />
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
