const getStoreValue = async (key) => {
  return await window.api.getStoreValue(key);
};

const setStoreValue = async (key, value) => {
  await window.api.setStoreValue(key, value);
};

export { getStoreValue, setStoreValue };
