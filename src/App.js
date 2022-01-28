import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductAPI } from "./redux/productSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Payment from "./components/Payment/Payment";
import Order from "./components/Order/Order";
import { getUserFromLocalStorage } from "./redux/userSlice";
import Filter from "./components/Filter/Filter";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductAPI());
    dispatch(getUserFromLocalStorage());
  }, []);
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Filter />
              <Products />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
