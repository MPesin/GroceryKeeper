import Shop from '../models/Shop.js';
import ObservableObject from '../models/ObservableObject.js';

// ShopsController expends the ObservableObject to alert all it's observers that it pushed new data to the repository.
export default class ShopsController extends ObservableObject {

  // constructor recieves a repository to the local storage 
  constructor(repo) {
    super();
    this.repo = repo;
    this.data = {
      shops: this.repo.pullShops(),
      currentItem: null,
    }
  }

  // getters
  get shops() {
    return this.data.shops;
  }

  // mehtods

  updateRepository(toNotify) {
    this.repo.pushShops(this.data.shops);
    if (toNotify) {
      this.notifyAll();
    }
  }

  // returns the index of the shop named 'shopName', if it doesn't exist it returns '-1'.
  indexOfShop(shopName) {
    let index = -1;
    if (this.data.shops.length !== 0) {
      this.data.shops.forEach((shop, i) => {
        if (shopName === shop.name) {
          index = i;
        }
      });
    }
    return index;
  }

  addItemToShop(name, price, shopName) {
    let index = this.indexOfShop(shopName);
    if (index < 0) {
      // Shop doesn't exist
      index = this.data.shops.length;
      this.data.shops.push(new Shop(index, shopName));
    }
    this.data.shops[index].addItem(name, price);
    this.updateRepository(true);
  }

  focusOnItem(shopName, itemId) {
    this.data.currentItem = {
      shopName,
      itemId
    };
    const shopIndex = this.indexOfShop(shopName);
    return this.data.shops[shopIndex].getItem(itemId);
  }

  clearFocusedItem() {
    this.data.currentItem = null;
  }

  deleteCurrentItem() {
    const shopIndex = this.indexOfShop(this.data.currentItem.shopName);
    this.data.shops[shopIndex].removeItem(this.data.currentItem.itemId);
    console.log(this.data.shops.length, shopIndex);

    // If shop is empty remove it.
    if (this.data.shops[shopIndex].allItems.length === 0) {
      this.data.shops.splice(shopIndex, 1);
    }
    console.log(this.data.shops, this.data.shops.length);
    this.updateRepository(true);
    this.clearFocusedItem();
  }

  updateCurrentItem(newData) {
    if (this.data.currentItem != null) {
      const shopIndex = this.indexOfShop(this.data.currentItem.shopName);
      this.data.shops[shopIndex].updateItem(this.data.currentItem.itemId, newData.name, newData.price);
      this.updateRepository(true);
    }
  }

  clearAll() {
    this.repo.clear();
    this.data.shops = [];
    console.log(this.data.shop);

    this.notifyAll();
  }
  //end methods 
}