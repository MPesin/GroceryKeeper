export default function ShopItems(){
  
  const Item = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  
  const items = []
  
  
  return {
    getItems: () => {
      return items;
    },
    addItem: (name, price) => {
      let id; 

      if (items.length === 0){
        id = 0;
      }
      else {
        id = items[items.length - 1].id + 1;
      }

      const item = new Item(id, name, price);
      items.push(item);
    }
  };
}