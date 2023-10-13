var form = document.getElementById('addForm');

var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

form.addEventListener('submit', onAddItemSubmit);

// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);
// localStorage.clear();
// Add item
function onAddItemSubmit(e) {
  e.preventDefault();

  // Get input value
  var newItem = document.getElementById('item').value;


  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  // Append button to li
  li.appendChild(deleteBtn);

  // Append li to list
  itemList.appendChild(li);
  // addItemToLocalStorage(newItem);
  addItemToLocalStorage(newItem);
}


function addItemToLocalStorage(newItem) {

  let itemforStorage;
  if (localStorage.getItem("items") === null) {
    itemforStorage = [];
  }
  else {
    itemforStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemforStorage.push(newItem);
  localStorage.setItem("items", JSON.stringify(itemforStorage));
}
// Remove item
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// Filter Items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName('li');

  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    var itemName2 = item.nextSibling.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1 || itemName2.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    }
    else {
      item.style.display = 'none';
    }
  });

}

