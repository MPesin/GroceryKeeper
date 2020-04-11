import StorageRepository from "./StorageRepo.js";
import Shop from "../models/Shop.js";

export default function ShopsRepository() {

  this.repo = new StorageRepository();

  const KEY_SUFFIX = "Shops";

  function ConvertStorageDataToShops(object) {
    const shops = [];
    if (object) {
      object.forEach(element => {
        const shop = new Shop(element.id, element.name);
        element.items.forEach(item => {
          shop.addItem(item.name, item.price, item.id);
        });
        shops.push(shop);
      });
    }
    return shops;
  }

  return {
    pullShops: () => {
      const object = this.repo.pull(KEY_SUFFIX);
      return ConvertStorageDataToShops(object);
    },
    pushShops: (shops) => {
      this.repo.push(KEY_SUFFIX, shops);
    },
    clear: () => {
      console.log("Clearing All...");
      this.repo.clear();
    }
  }
}