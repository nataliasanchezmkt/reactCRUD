import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/views/Home/Home";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ProductsTable from "./components/views/ProductsTable/ProductsTable";
import ProductCreate from "./components/views/ProductCreate/ProductCreate";
import ProductEdit from "./components/views/ProductEdit/ProductEdit";
import Error404 from "./components/views/Error404/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  //state
  const [products, setProducts] = useState([]);
  // variable de entorno
  const db = process.env.REACT_APP_API_CAFETERIA;
  console.log(db);

  useEffect(() => {
    getApi();
  }, []);
  const getApi = async () => {
    try {
      const res = await fetch(db);
      const productApi = await res.json();
      setProducts(productApi);
      console.log(productApi);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route exact path="/" element={<Home products={products}/>} />
            <Route
              exact
              path="/productTable"
              element={<ProductsTable products={products} db={db} getApi={getApi} />}
            />
            <Route
              exact
              path="/productCreate"
              element={<ProductCreate db={db} getApi={getApi} />}
            />
            <Route exact path="/productEdit/:id" element={<ProductEdit db={db} getApi={getApi} />} />
            <Route exact path="/*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
