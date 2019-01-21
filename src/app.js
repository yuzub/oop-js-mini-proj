// Product constructor
function Product(name, category, idnum) {
  this.name = name;
  this.category = category;
  this.idnum = idnum;
}

// UI constructor
function UI() {}
UI.prototype.addProductToList = function(product) {
  const list = document.getElementById('product-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.category}</td>
    <td>${product.idnum}</td>
    <td><a href="#" title="Delete">X</a></td>
  `;
  list.appendChild(row);
};
UI.prototype.clearFields = function() {
  document.getElementById('name').value = '';
  document.getElementById('category').value = '';
  document.getElementById('idnum').value = '';
};
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.querySelector('#product-form');
  container.insertBefore(div, form);
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 2000);
};
UI.prototype.deleteProduct = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// Event listener for add product
document.getElementById('product-form')
  .addEventListener('submit', function (e) {
    const name = document.getElementById('name').value,
      category = document.getElementById('category').value,
      idnum = document.getElementById('idnum').value;

    // Instantiate product
    const product = new Product(name, category, idnum);
    // Instantiate UI
    const ui = new UI();
    console.log(ui);

    // Validate
    if (name === '' || category === '' || idnum === '') {
      ui.showAlert('Пожалуйста, заполните все поля', 'error');
    } else {
      // Add product to list
      ui.addProductToList(product);
      // Show success
      ui.showAlert('Продукт успешно добавлен', 'success');
      // Clear fields
      ui.clearFields();
    }

    e.preventDefault();
  });

// Event listener for delete product
document.getElementById('product-list').addEventListener('click', function(e) {
  console.log(123);
  const ui = new UI();
  ui.deleteProduct(e.target);
  ui.showAlert('Продукт успешно удален', 'success');
  e.preventDefault();
});
