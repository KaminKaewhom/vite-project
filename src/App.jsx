import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Sidebar from "./Components/sidebar/Sidebar";
import Products from "./pages/Products";
import SalesHistory from "./pages/SalesHistory";
import InventoryManager from "./pages/InventoryManager";
import PaymentList from "./pages/paymentList";
import "./App.css";

// สร้าง ProductContext สำหรับ products
const CartProductContext = React.createContext();
const ProductContext = React.createContext();

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]); // สำหรับจัดการ products

  return (
    <CartProductContext.Provider value={{ cartProducts, setCartProducts }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Products />} />
              {/* <Route path="/saleshistory" element={<SalesHistory />} /> */}
              <Route path="/order" element={<PaymentList />} />
              <Route path="/inventoryManager" element={<InventoryManager />} />
            </Routes>
          </div>
        </div>
      </ProductContext.Provider>
    </CartProductContext.Provider>
  );
}

export default App;
export { CartProductContext, ProductContext }; // export เพื่อให้สามารถใช้งาน Context นี้ในคอมโพเนนต์อื่น ๆ
