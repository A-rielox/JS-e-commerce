import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
   LOAD_PRODUCTS,
   SET_GRIDVIEW,
   SET_LISTVIEW,
   UPDATE_SORT,
   SORT_PRODUCTS,
   UPDATE_FILTERS,
   FILTER_PRODUCTS,
   CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
   filtered_products: [],
   all_products: [],
   grid_view: true,
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
   const { products } = useProductsContext();
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
   }, [products]);

   return (
      <FilterContext.Provider value={{ ...state }}>
         {children}
      </FilterContext.Provider>
   );
};
// make sure use
export const useFilterContext = () => {
   return useContext(FilterContext);
};

// el index.js <FilterProvider> DEBE IR dentro de <ProductsProvider> xq la info se pasa de <ProductsProvider> a <FilterProvider>
// los products los necesito en el filter-reducer, pero allá no puedo usar el "useProductsContext" , ya q como es un hook => solo se puede usar dentro de otros hooks o react-components ( y filter_reducer es solo una función ), xeso, los agarro acá ( para poder agarrarlos acá es q tengo q poner <FilterProvider> dentro de <ProductsProvider> ), aca dentro del dispatch mando la acción para q agarre los products del payload
