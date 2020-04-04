import ShopItems from "../models/ShopItems.js";

export default function ShopsController() {
  const Shop = function (id, name) {
    this.id = id;
    this.name = name;
    this.items = new ShopItems();
    this.totalPrice = 0;
  }

  const data = {
    shops: [],
    currentItem: null
  }

  function addItemToShop(name, price, shop) {
    // console.log("AddItemToShop", name, price, shop);
    shop.items.addItem(name, price);
    shop.totalPrice += price;
  }

  function findShopIndex(shopName) {
    let res = -1;
    if (data.shops.length !== 0) {
      data.shops.forEach((shop, i) => {
        if (shop.name === shopName) {
          res = i;
        }
      })
    }
    return res;
  }

  function setCurerntItem(shop, id) {
    const shopIndex = findShopIndex(shop);
    const currentShop = data.shops[shopIndex];
    const item = currentShop.items.getItems()[id];
    data.currentItem = item;
    return item;
  }


  return {
    addItemToShop: (name, price, shopName) => {
      let shopIndex;
      if (data.shops.length === 0) {
        shopIndex = 0;
        const shop = new Shop(shopIndex, shopName);
        data.shops.push(shop);
      } else {
        shopIndex = findShopIndex(shopName);
        if (shopIndex < 0) {
          shopIndex = data.shops[data.shops.length - 1].id + 1;
          const shop = new Shop(shopIndex, shopName);
          data.shops.push(shop);
        }
      }
      addItemToShop(name, price, data.shops[shopIndex]);
      data.totalPrice += price;
    },
    getShops: () => data.shops,
    setItemToUpdate: (shop, id) => {
      return setCurerntItem(shop, id);
    }
  }
}