export default class Shop {

  // contructor gets the id and name of the shop
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.items = [];
    this.totalPrice = 0;
  }

  // getters  
  get allItems() {
    return this.items;
  }
  // end getters

  //public methods

  // returns the index of the item by item id, if it doesn't exist it returns '-1'.
  indexOfItem(itemId) {
    let index = -1;
    if (this.items.length !== 0) {
      this.items.forEach((item, i) => {
        if (itemId === item.id) {
          index = i;
        }
      });
    }
    return index;
  }

  addItem(name, price, id = null) {    
    if (name && price) {
      let newId = id
      if (!newId) {
        newId = (this.items.length !== 0) ? this.items[this.items.length - 1].id + 1 : 0;
      }
      this.items.push({
        id: newId,
        name,
        price,
      });
      this.totalPrice += price;
    }
  } // end addItem

  getItem(itemId) {
    let item = null;
    const itemIndex = this.indexOfItem(itemId);
    if (itemIndex >= 0) {
      item = this.items[itemIndex];
    }
    return item;
  }

  updateItem(itemId, newName, newPrice) {
    const itemIndex = this.indexOfItem(itemId);
    this.totalPrice -= this.items[itemIndex].price;
    this.items[itemIndex].name = newName;
    this.items[itemIndex].price = newPrice;
    this.totalPrice += this.items[itemIndex].price;
  }

  removeItem(itemId) {
    const itemIndex = this.indexOfItem(itemId);
    this.totalPrice -= this.items[itemIndex].price;
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
    }
  }
  // end public methods

} // end Shop


// old school similar example:

// export default function Shop(id, name) {
//   this.id = id;
//   this.name = name;
//   this.items = [];
//   this.totalPrice = 0;
// }

// Shop.prototype.addItem = function (name, price){
//   const idNum = this.items.length;
//   this.items.push({
//     id: idNum,
//     name,
//     price
//   });
//   this.totalPrice += price;
// }

// or Module pattern:

// export default function Shop(id, name) {
//   this.id = id;
//   this.name = name;
//   this.items = [];
//   this.totalPrice = 0;
//   return {
//     addItem: function (name, price) {
//       const idNum = this.items.length;
//       this.items.push({
//         id: idNum,
//         name,
//         price
//       });
//      this.totalPrice += price;
//     }
//   }
// }