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
      // let maxPrice = action.payload.map(item => item.price);
      // maxPrice = Math.max(...prices);

      let maxPrice = Math.max(...action.payload.map(item => item.price));

      return {
         ...state,
         all_products: [...action.payload],
         filtered_products: [...action.payload],
         filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
   }

   if (action.type === SET_GRIDVIEW) {
      return { ...state, grid_view: true };
   }

   if (action.type === SET_LISTVIEW) {
      return { ...state, grid_view: false };
   }

   if (action.type === UPDATE_SORT) {
      return { ...state, sort: action.payload };
   }

   if (action.type === SORT_PRODUCTS) {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];

      if (sort === 'price-lowest') {
         tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
         tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
         // tempProducts.sort((a, b) => a.name.localeCompare(b.name));
         // a la vieja
         tempProducts.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
         });
      }
      if (sort === 'name-z') {
         tempProducts.sort((a, b) => b.name.localeCompare(a.name));
      }

      return { ...state, filtered_products: tempProducts };
   }

   if (action.type === UPDATE_FILTERS) {
      let { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };
   }

   if (action.type === FILTER_PRODUCTS) {
      const { all_products } = state;
      let tempProducts = [...all_products];
      // 👆 para comenzar a filtrar siempre SIEMPRE voy a necesitar empezar con todos los productos, sino el nuevo filtro se aplicaria sobre los q quedan de la filtrada anterior, y TIENE  q ser copia "copia", x q si no al cambiar los 'tempProducts' se cambiaria tambien a 'all_products'
      // y asi, si tengo un filtro y lo borro, me vuelve a poner todos los prods

      const { text, company, category, color, shipping, price } = state.filters;

      // ====================== FILTERING ======================
      //text
      if (text) {
         tempProducts = tempProducts.filter(prod =>
            prod.name.toLowerCase().includes(text)
         );
         // el hace tempProducts = tempProducts.filter(prod => prod.name.toLowerCase().startsWith(text)) más chingon el mio
      }

      // category
      // aqui si ya estaba filtrado por text => agarra esos tempProds y filtra a partir de ese, y asi susecivamente pal resto de los filtros
      if (category !== 'all') {
         tempProducts = tempProducts.filter(prod => prod.category === category);
      }

      // company
      if (company !== 'all') {
         tempProducts = tempProducts.filter(prod => prod.company === company);
      }

      // color
      if (color !== 'all') {
         tempProducts = tempProducts.filter(prod =>
            prod.colors.includes(color)
         );
      }

      // price
      if (price !== 0) {
         tempProducts = tempProducts.filter(prod => prod.price <= price);
      }

      // shipping
      if (shipping) {
         tempProducts = tempProducts.filter(prod => prod.shipping === true);
      }

      return { ...state, filtered_products: tempProducts };
   }

   if (action.type === CLEAR_FILTERS) {
      return {
         ...state,
         filters: {
            ...state.filters,
            text: '',
            company: 'all',
            category: 'all',
            color: 'all',
            // min_price: 0,
            // max_price: 0,
            price: state.filters.max_price, // 🧐
            shipping: false,
         },
      };
   }

   throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
