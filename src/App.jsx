import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import OrderList from "./Pages/OrderList";

const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orderslist' element={<OrderList />} />

      </Routes>
    </BrowserRouter>

  );
};

export default App;
