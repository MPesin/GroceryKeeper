import ShopsController from "./models/ShopsController.js";
import UICotroller from "./models/UIController.js";

// console.log("Starting");

const shopsControl = new ShopsController();

// console.log("Shops Initialized");

const uiControl = new UICotroller();

// console.log("UI Initialized");

// Testing:

shopsControl.AddItemToShop("milk", 22, "Rami");
shopsControl.AddItemToShop("milk", 22, "Shufersal");
uiControl.PopulateTable(shopsControl.GetShops());

// end Testing

// const obj = {
//   a: 4,
//   b: [4]
// }

// const test = (function(obj) {
//   obj.b.forEach(val => {});
// })(obj)

// console.log(obj.b)