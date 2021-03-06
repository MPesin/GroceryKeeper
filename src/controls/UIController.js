import StateController from './StateController.js';

export default function UICotroller(repo) {

  this.repo = repo;

  // UIIdentifiers holds constats used to identify html elements 
  // @enum
  const UIIdentifiers = {
    SHOPS_TABLE_HEADER: "#shops-table-head",
    SHOPS_TABLE_BODY: "#shops-table-body",
    ITEM_NAME_ID: "#item-name",
    ITEM_PRICE_ID: "#item-price",
    ITEM_SHOP_ID: "#item-store",
    ADD_BUTTON: ".add-btn",
    UPDATE_BUTTON: ".update-btn",
    DELETE_BUTTON: ".delete-btn",
    CLEAR_ALL_BUTTON: ".clear-all-btn",
    BACK_BUTTON: ".back-btn",
    EDIT_ITEM: "edit-item",
  }

  const stateControlle = new StateController(UIIdentifiers);

  function generateItemHtml(item) {
    return `<strong>${item.name}: </strong> <em>${item.price} &#8362</em>
    <a href="#!" class="secondary-content">
      <i class="edit-item material-icons">edit</i>
    </a>`
  }

  function generateTotalPriceHtml(shop) {
    return `<strong>Total Store Price:</strong> ${shop.totalPrice} &#8362`;
  }

  function populateTableHead(shops) {
    let head = "";
    shops.forEach(value => {
      head += `<th>${value.name}</th>`
    });
    document.querySelector(UIIdentifiers.SHOPS_TABLE_HEADER).innerHTML = head;
  }

  function maxInventoryLength(shops) {
    let maxLength = 0;
    shops.forEach(shop => {
      const currentLength = shop.allItems.length;
      if (maxLength < currentLength) {
        maxLength = currentLength;
      }
    });
    return maxLength;
  }

  function populateTableBodyTotalPrices(shops) {
    let body = "";
    shops.forEach(shop => {
      body += `<td id="total-price-${shop.name}">${generateTotalPriceHtml(shop)}</td>`
    });
    const tr = document.createElement("tr");
    tr.innerHTML = body;
    document.querySelector(UIIdentifiers.SHOPS_TABLE_BODY).appendChild(tr);
  }

  function populateTableBodyTotalItems(shops) {
    const maxLength = maxInventoryLength(shops);
    // i - iterator over items
    for (let i = 0; i < maxLength; i++) {
      const tr = document.createElement("tr");
      let html = "";
      // Create a cell for each shop
      // j - iterator over shops
      for (let j = 0; j < shops.length; j++) {
        const items = shops[j].allItems;
        //if item exists add him
        if (items[i] != null) {
          html += `<td id="item-${shops[j].name}-${items[i].id}">
            ${generateItemHtml(items[i])}
            </td>
            `
        }
        // else add a blank td 
        else {
          html += `<td></td>
          `
        }
      }
      tr.innerHTML = html;
      document.querySelector(UIIdentifiers.SHOPS_TABLE_BODY).appendChild(tr);
    }
  }

  function setItemFieldsValues(name = '', price = null, shop = '') {
    document.querySelector(UIIdentifiers.ITEM_NAME_ID).value = name;
    document.querySelector(UIIdentifiers.ITEM_PRICE_ID).value = price;
    document.querySelector(UIIdentifiers.ITEM_SHOP_ID).value = shop;
  }

  function clearTable() {
    document.querySelector(UIIdentifiers.SHOPS_TABLE_HEADER).innerHTML = "";
    document.querySelector(UIIdentifiers.SHOPS_TABLE_BODY).innerHTML = "";
  }

  function populateTable(shops) {
    populateTableHead(shops);
    populateTableBodyTotalPrices(shops);
    populateTableBodyTotalItems(shops);
  }

  return {
    UIIdentifiers: UIIdentifiers,
    getInputFieldsData: () => {
      return {
        name: document.querySelector(UIIdentifiers.ITEM_NAME_ID).value,
        price: parseInt(document.querySelector(UIIdentifiers.ITEM_PRICE_ID).value),
        shop: document.querySelector(UIIdentifiers.ITEM_SHOP_ID).value
      }
    },
    updateTable: () => {
      console.log("Updating Table");
      clearTable();
      const shops = this.repo.pullShops();
      populateTable(shops);
    },
    clearTable: () => {
      document.querySelector(UIIdentifiers.SHOPS_TABLE_HEADER).innerHTML = "";
      document.querySelector(UIIdentifiers.SHOPS_TABLE_BODY).innerHTML = "";
    },
    clearItem: () => {
      setItemFieldsValues();
    },
    setCurrentItemUI: (shop, item) => {
      setItemFieldsValues(item.name, item.price, shop);
    },
    setAddState: () => {
      stateControlle.setAddState();
    },
    setEditState: () => {
      stateControlle.setEditState();
    },
    init: () => {
      stateControlle.setAddState();
      const shops = this.repo.pullShops();
      populateTable(shops);
    }
  }
}