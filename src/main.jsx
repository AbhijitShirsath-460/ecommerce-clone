import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
       <OrderProvider>
         <WishlistProvider>
           <CartProvider>
             <App />
           </CartProvider>
         </WishlistProvider>
       </OrderProvider>
     </AuthProvider>
  </StrictMode>,
)
