import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useProducts } from "./Contexts/DataContext";
import loader from "./Images-Gifs/loader.gif";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";

function App() {
  const {error,loading} = useProducts();
  return (
    <>
      {loading && <img className="loader" src={loader} alt="Loading..."/>}
      {!error && <Error/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
