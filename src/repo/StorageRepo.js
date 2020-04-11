export default function StorageRepository() {
  const STORAGE_KEY_PREFIX = "GroceryJS_MPesin_mikelpesin@gmail.com";

  return {
    pull: (keySuffix) => {
      const key = `${STORAGE_KEY_PREFIX}_${keySuffix}`;
      const json = localStorage.getItem(key);
      let object = JSON.parse(json);
      return object;
    },
    push: (keySuffix, data) => {
      const key = `${STORAGE_KEY_PREFIX}_${keySuffix}`;
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    },
    clear: () => {      
      localStorage.clear();
    }
  }
}