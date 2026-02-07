const API = "https://script.google.com/macros/s/AKfycbzumHbzqYkEv1073OwmyXBhwDqoIjd5SHbMfkxZxoFzpMZevIkEdYeeJyWUDscRMges/exec";

let cart = [];
let products = [];

// Fetch products
fetch(`${API}?action=products`)
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts('Pizza');
  });

// Render products by category
function renderProducts(category) {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  products
    .filter(p => p.available && p.category === category)
    .forEach(p => {
      const div = document.createElement('div');
      div.classList.add('product-card');
      div.innerHTML = `
        <img src="${p.image || 'https://via.placeholder.com/150'}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₱${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
      `;
      menu.appendChild(div);
    });
}

// Category button click
document.querySelectorAll('.category').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

// Add to cart
function addToCart(item) {
  cart.push(item);
  updateCart();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ₱${item.price} 
      <button onclick="removeItem(${index})">x</button>
    `;
    cartItems.appendChild(li);
  });

  document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
  const tax = subtotal * 0.05;
  document.getElementById('cartTax').textContent = tax.toFixed(2);
  document.getElementById('cartTotal').textContent = (subtotal + tax).toFixed(2);
}

// Remove from cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Place order
document.getElementById('placeOrderBtn').addEventListener('click', () => {
  const customer = prompt("Enter your name:");
  if (!customer || cart.length === 0) {
    alert("Name required and cart cannot be empty!");
    return;
  }
  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "order",
      customer,
      notes: "",
      items: cart
    })
  })
  .then(() => {
    alert("Order placed!");
    cart = [];
    updateCart();
  });
});

