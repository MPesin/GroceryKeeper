import ShopsController from "./controls/ShopsController.js";
import UICotroller from "./controls/UIController.js";
import ShopsRepository from "./repo/ShopsStorageRepo.js";

// Initialize controllers and the repository for the local storage
const repo = new ShopsRepository();
const uiControl = new UICotroller(repo);
const shopsControl = new ShopsController(repo);

// subscribe the UIControler to the shopsControl for updating the UI 
// every time the local storage is changed and the table needs to be rebuild.
shopsControl.subscribe(() => uiControl.updateTable());

uiControl.init();

(function loadListeners() {
document.querySelector(uiControl.UIIdentifiers.CLEAR_ALL_BUTTON).addEventListener('click', onClearAllClicked);

  document.querySelector(uiControl.UIIdentifiers.ADD_BUTTON).addEventListener('click', onAddButtonClicked);
  
  document.querySelector(uiControl.UIIdentifiers.UPDATE_BUTTON).addEventListener('click', onUpdateItemClicked);

  document.querySelector(uiControl.UIIdentifiers.DELETE_BUTTON).addEventListener('click', onDeleteItemClicked);

  document.querySelector(uiControl.UIIdentifiers.BACK_BUTTON).addEventListener('click', onBackClicked);

  document.querySelector(uiControl.UIIdentifiers.SHOPS_TABLE_BODY).addEventListener('click', onEditItemClicked);

  document.addEventListener("keypress", disableEnterKey);
})();

function disableEnterKey(e){
  if (e.keyCode === 13){
    console.log("Enter key ignored")
    e.preventDefault();
    return false;
  }
}

function onClearAllClicked(e){
  shopsControl.clearAll();
  e.preventDefault();
}

function onAddButtonClicked(e) {
  const input = uiControl.getInputFieldsData();
  if (input.name !== '' && input.price !== '' && input.shop !== '') {
    shopsControl.addItemToShop(input.name, input.price, input.shop);
    uiControl.clearItem();
  }
  e.preventDefault();
}

function onUpdateItemClicked(e){
  const input = uiControl.getInputFieldsData(); 
  shopsControl.updateCurrentItem(input);
  // uiControl.updateItem(shopsControl.getShop(input.shop), shopsControl.getCurrentItem());
  e.preventDefault();
}

function onBackClicked(e){
  uiControl.clearItem();
  uiControl.setAddState();
  shopsControl.clearFocusedItem();
  e.preventDefault();
}

function onDeleteItemClicked(e){
  shopsControl.deleteCurrentItem();
  uiControl.clearItem();
  uiControl.setAddState();
  e.preventDefault();
}

function onEditItemClicked(e){
  if (e.target.classList.contains(uiControl.UIIdentifiers.EDIT_ITEM)){
    
    const fullId = e.target.parentNode.parentNode.id;    
    const idArray = fullId.split('-');
    const id = parseInt(idArray[2]);
    const shop = idArray[1];
    const currentItem = shopsControl.focusOnItem(shop, id);
    uiControl.setCurrentItemUI(shop, currentItem);
    uiControl.setEditState();
  }
  e.preventDefault();
}


// Testings

// shopsControl.addItemToShop("milk", 22, "Rami");
//  shopsControl.addItemToShop("milk", 22, "Shufersal");
// shopsControl.addItemToShop("bread", 22, "Shufersal");
// shopsControl.addItemToShop("bread", 22, "Rami");
// shopsControl.addItemToShop("bread", 22, "Yona");
// shopsControl.addItemToShop("Naknik", 32, "Yuda");
// uiControl.updateTable(shopsControl.shops);


// end Testing