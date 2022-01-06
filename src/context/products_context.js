import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants.js';

import {
   SIDEBAR_OPEN,
   SIDEBAR_CLOSE,
   GET_PRODUCTS_BEGIN,
   GET_PRODUCTS_SUCCESS,
   GET_PRODUCTS_ERROR,
   /*GET_SINGLE_PRODUCT_BEGIN,
   GET_SINGLE_PRODUCT_SUCCESS,
   GET_SINGLE_PRODUCT_ERROR, */
} from '../actions';

const initialState = {
   isSidebarOpen: false,
   products_loading: false,
   products_error: false,
   products: [],
   featured_products: [],
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   // ============ SIDEBAR ============
   const openSidebar = () => {
      dispatch({ type: SIDEBAR_OPEN });
   };

   const closeSidebar = () => {
      dispatch({ type: SIDEBAR_CLOSE });
   };

   // ============ FETCH PRODUCTS ============
   const fetchProducts = async url => {
      dispatch({ type: GET_PRODUCTS_BEGIN });

      try {
         const response = await axios(url);
         const products = await response.data;

         dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
      } catch (error) {
         dispatch({ type: GET_PRODUCTS_ERROR });
      }
   };

   useEffect(() => {
      fetchProducts(url);
   }, []);

   return (
      <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
         {children}
      </ProductsContext.Provider>
   );
};

// make sure use
export const useProductsContext = () => {
   return useContext(ProductsContext);
};