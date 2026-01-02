export const transformApiDataToDropdownItems = (apiData = []) => {
  const transformedData = {};

  if (!apiData || !Array.isArray(apiData)) {
    return transformedData;
  }

  apiData.forEach((item) => {
    if (!item) return;

    const type = item.staytype;
    transformedData[type] = [];

    if (item.categories && Array.isArray(item.categories)) {
      item.categories.forEach((category) => {
        if (category && category.category_name) {
          transformedData[type].push({
            label: category.category_name,
            type: type,
            category: category.category_name,
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

  const configItem = config.find((item) => item.type === type);
  return configItem ? configItem.staticItems : [];
};
