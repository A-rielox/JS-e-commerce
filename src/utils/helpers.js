export const formatPrice = number => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
   }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
   let unique = data.map(item => item[type]);

   if (type === 'colors') {
      unique = unique.flat();
   }

   return ['all', ...new Set(unique)];
};

// if (type === 'colors') {
//    let colors = data.map(item => item.colors).flat();
//    return ['all', ...new Set(colors)];
// } else {
//    let unique = data.map(item => item[type]);
//    return ['all', ...new Set(unique)];
// }
