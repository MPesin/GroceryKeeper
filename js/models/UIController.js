export default function UICotroller() {

  const UIIdentifiers = {
    shopsTableHeader: "#shops-table-head",
    shopsTableBody: "#shops-table-body",
  }

  function PopulateTableHead(shops) {
    let head = "";
    shops.forEach(value => {
      head += `<th>${value.name}</th>`
    });
    document.querySelector(UIIdentifiers.shopsTableHeader).innerHTML = head;
  }

  function PopulateTableBodyTotalPrices(shops) {
    let body = "";
    shops.forEach(shop => {
      body += `<td><strong>Total Store Price:</strong> ${shop.totalPrice}</td>`
    });
    const tr = document.createElement("tr");
    tr.innerHTML = body;
    document.querySelector(UIIdentifiers.shopsTableBody).appendChild(tr);
  }

  function PopulateTableBodyTotalItems(shops) {
    const tr = document.createElement("tr");
    shops.forEach(shop => {
      let body = "";
      const items = shop.items.GetItems();
      if (items.length !== 0) {

        items.forEach(item => {
          body += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.price}</em>
          <a href="#!" class="secondary-content">
          <i class="material-icons">edit</i>
          </a>
          </li>`
        });
      }
      const td = document.createElement("td");
      const ul = document.createElement("ul");
      ul.innerHTML = body;
      td.appendChild(ul);
      tr.appendChild(td);
    });
    document.querySelector(UIIdentifiers.shopsTableBody).appendChild(tr);
  }

  return {
    PopulateTable: (shops) => {
      PopulateTableHead(shops);
      PopulateTableBodyTotalPrices(shops);
      PopulateTableBodyTotalItems(shops);
    }
  }
}