import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import HomePage from "./pages/Home";
import CatalogPage from "./pages/Catalog";
import CheckoutModal from "./components/CheckoutModal";


export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/checkout" element={<CheckoutModal isOpen={true} onClose={() => console.log('Closed')} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

