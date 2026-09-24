import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AuthPage from './pages/AuthPages'
import ProfilePage from './pages/ProfilePage'
import SuccessPage from './pages/SuccessPage'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>

        <footer>
          <span>MARCHÉ</span>
          <span>Учебный проект / Django + React</span>
        </footer>
      </CartProvider>
    </BrowserRouter>
  )
}
