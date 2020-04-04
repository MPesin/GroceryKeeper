import ItemController from "./ItemsController.js";

export default function ShopsController() {
  const Shop = function (id, name) {
    this.id = id;
    this.name = name;
    this.items = new ItemController();
    this.totalPrice = 0;
  }

  const AddItemToShop = (name, price, shop) => {
    shop.items.AddItem(name, price);
    shop.totalPrice += price;
  }

  const ShopExists = (shopName) => {
    let res = false;
    if (data.shops.length !== 0) {
      data.shops.forEach(shop => {
        if (shop.name === shopName) {
          res = true;
        }
      })
    }
    return res;
  }

  const data = {
    shops: [],
    totalPrice: 0
  }

  return {
    AddItemToShop: (name, price, shopName) => {
      let shopIndex;
      if (data.shops.length === 0) {
        shopIndex = 0;
        const shop = new Shop(shopIndex, shopName);
        data.shops.push(shop);
      } else {
        if (ShopExists(shopName)) {
          shopIndex = data.shops.indexOf(shopName);
        } else {
          shopIndex = data.shops[data.shops.length - 1].id + 1;
          const shop = new Shop(shopIndex, shopName);
          data.shops.push(shop);
        }
      }
      AddItemToShop(name, price, data.shops[shopIndex]);
      data.totalPrice += price;
    },
    GetShops: () => data.shops,
    GetTotalPrice: () => data.totalPrice
  }
}