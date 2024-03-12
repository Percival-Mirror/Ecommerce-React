import { Routes, Route, Navigate } from "react-router-dom"
import { NavBar } from "./NavBar"
import { ShopMainPage } from "../pages/ShopMainPage"
import { CartPage } from "../pages/CartPage"
import { ProductsProvider } from "../context/ProductsProvider"
import { ShopPage } from "../pages/ShopPage"
import { CartProvider } from "../context/CartProvider"
import { ProductPage } from "../pages/ProductPage"
import { AuthProvider } from "../context/AuthProvider"
import { LoginPage } from "../pages/LoginPage"
import { Footer } from "./Footer"

export const MainApp = () => {
  return (
    <>
      <div className="main-container" style={{minHeight: 100 + "vh", display:"flex", flexDirection:"column"}}>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <NavBar></NavBar>
              <Routes>
                <Route path="/" element={<ShopMainPage></ShopMainPage>}></Route>
                <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                <Route path="/shop" element={<ShopPage></ShopPage>}></Route>
                <Route path="/cart" element={<CartPage></CartPage>}></Route>
                <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
              </Routes>
              <Footer></Footer>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </div>
    </>
  )
}
