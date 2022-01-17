import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

// 🚨🚨 cambiar a env variables ( con video de github users )

ReactDOM.render(
   <Auth0Provider
      domain="dev-comt47ws.us.auth0.com"
      clientId="Rck5LArzKdr7Stjk93xGiu8YY8tLyjPR"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
   >
      <UserProvider>
         <ProductsProvider>
            <FilterProvider>
               <CartProvider>
                  <App />
               </CartProvider>
            </FilterProvider>
         </ProductsProvider>
      </UserProvider>
   </Auth0Provider>,

   document.getElementById('root')
);

/* <FilterProvider> DEBE IR dentro de <ProductsProvider> xq la info se pasa de <ProductsProvider> a <FilterProvider> */

// emma@emma.com
// Emitaxx1#
