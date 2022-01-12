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
   sort: 'price-lowest',
   filters: {
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
   },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
   const { products } = useProductsContext();
   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
   }, [products]);

   useEffect(() => {
      dispatch({ type: FILTER_PRODUCTS });
      dispatch({ type: SORT_PRODUCTS });
   }, [products, state.sort, state.filters]);

   const setGridView = () => {
      dispatch({ type: SET_GRIDVIEW });
   };

   const setListView = () => {
      dispatch({ type: SET_LISTVIEW });
   };

   const updateSort = e => {
      // no se necesita name en esta, pero para saber como implementarlo cuando necesite los dos parametros
      // const name = e.target.name;
      const value = e.target.value;
      dispatch({ type: UPDATE_SORT, payload: value });
   };

   const updateFilters = e => {
      let name = e.target.name;
      let value = e.target.value;

      // para filtrar categorias lo puse con botones y como los buttons no tienen value
      if (name === 'category') {
         value = e.target.textContent;
      }

      dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
   };
   const clearFilters = () => {};

   return (
      <FilterContext.Provider
         value={{
            ...state,
            setGridView,
            setListView,
            updateSort,
            updateFilters,
            clearFilters,
         }}
      >
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
