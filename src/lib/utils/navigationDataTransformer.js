// export const transformApiDataToDropdownItems = (apiData = []) => {
//   const transformedData = {};
  
//   apiData.forEach((item) => {
//     const type = item.staytype; // "hostels", "pgs", "hotels"
//     transformedData[type] = [];
    
//     if (item.categories && Array.isArray(item.categories)) {
//       item.categories.forEach((category) => {
//         transformedData[type].push({
//           label: category.category_name,
//           type: type,
//           category: category.category_name.toLowerCase().replace(/\s+/g, '-')
//         });
//       });
//     }
//   });
  
//   return transformedData;
// };

// export const getDropdownItems = (type, apiData, config) => {
//   // First try to get data from API
//   const apiTransformedData = transformApiDataToDropdownItems(apiData);
  
//   if (apiTransformedData[type] && apiTransformedData[type].length > 0) {
//     return apiTransformedData[type];
//   }
  
//   // Fallback to static config data
//   const configItem = config.find(item => item.type === type);
//   return configItem ? configItem.staticItems : [];
// };


////////////////////////////////////////////////////////////////////////////////////////////////


export const transformApiDataToDropdownItems = (apiData = []) => {
  const transformedData = {};
  
  // Check if apiData is null/undefined or not an array
  if (!apiData || !Array.isArray(apiData)) {
    return transformedData;
  }
  
  apiData.forEach((item) => {
    if (!item) return; // Skip null items
    
    const type = item.staytype; // "hostels", "pgs", "hotels"
    transformedData[type] = [];
    
    if (item.categories && Array.isArray(item.categories)) {
      item.categories.forEach((category) => {
        if (category && category.category_name) {
          transformedData[type].push({
            label: category.category_name,
            type: type,
            category: category.category_name
          });
        }
      });
    }
  });
  
  return transformedData;
};

export const getDropdownItems = (type, apiData, config) => {
  // First try to get data from API
  const apiTransformedData = transformApiDataToDropdownItems(apiData);
  
  if (apiTransformedData[type] && apiTransformedData[type].length > 0) {
    return apiTransformedData[type];
  }
  
  // Fallback to static config data
  if (!config || !Array.isArray(config)) {
    return [];
  }
  
  const configItem = config.find(item => item.type === type);
  return configItem ? configItem.staticItems : [];
};