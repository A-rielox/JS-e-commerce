import {
   LOAD_PRODUCTS,
   SET_LISTVIEW,
   SET_GRIDVIEW,
   UPDATE_SORT,
   SORT_PRODUCTS,
   UPDATE_FILTERS,
   FILTER_PRODUCTS,
   CLEAR_FILTERS,
} from '../actions';

// ⭐❕😳📑🙀🚨🧐 HAY Q PASARLOS COMO "[...action.payload]", sino, ambos, all_p y filtered_p van a apuntar al mismo lugar en memoria y al cambiar uno TAMBIEN se cambiaria el otro
const filter_reducer = (state, action) => {
   if (action.type === LOAD_PRODUCTS) {
      return {
         ...state,
         all_products: [...action.payload],
         filtered_products: [...action.payload],
      };
   }

   throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
