import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';
import { CartProvider } from './components/Context/Cartcontext.jsx';
import { PaymentProvider } from './components/Context/PaymentContext.jsx';
import { WishListProvider } from './components/Context/WishListContext.jsx';
import { SearchProvider } from './components/Context/SearchContext.jsx';
import { OrderProvider } from './components/Context/OrderContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <PaymentProvider>
            <WishListProvider>
              <SearchProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </SearchProvider>
            </WishListProvider>
          </PaymentProvider>
        </CartProvider>

      </AuthProvider>
    </BrowserRouter>
  </StrictMode >
)
