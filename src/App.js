import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useProducts } from "./Contexts/DataContext";
import loader from "./Images-Gifs/loader.gif";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import ProductList from "./Pages/ProductList/ProductList";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  const {error,loading} = useProducts();
  return (
    <>
      {loading && <img className="loader" src={loader} alt="Loading..."/>}
      {error ? <Error/> : <Navbar/>}
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/error" element={<Error/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
