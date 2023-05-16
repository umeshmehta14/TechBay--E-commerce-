import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useProducts } from "./Contexts/DataContext/DataContext";
import loader from "./Images-Gifs/loader.gif";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import SingleProduct from "./Pages/Single Product Page/SingleProduct";
import Login from "./Pages/Authentication/Login/Login";
import SignUp from "./Pages/Authentication/SignUp/SignUp";
import LogOut from "./Pages/Authentication/LogOut/LogOut";
import Mockman from "mockman-js";
import RequiredAuth from "./Components/RequiredAuth/RequiredAuth";
import WishList from "./Pages/Wishlist/WishList";

function App() {
  const {error,loading} = useProducts();
  return (
    <>
    {/* <Mockman/> */}
      {error ? <Error/> : <Navbar/>}
      
      {loading ? <img className="loader" src={loader} alt="Loading..."/>:<> <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/singleProduct/:productId" element={<SingleProduct/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<LogOut/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        <Route path="/wishlist" element={
        <RequiredAuth>
          <WishList/>
        </RequiredAuth>}
        />
      </Routes>
      <Footer/></>}
    </>
  );
}

export default App;
