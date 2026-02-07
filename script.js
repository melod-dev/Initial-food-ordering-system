// ====================
// Product & Cart Setup
// ====================
let cart = [];
let products = [
  {name:"Pepperoni Pizza", category:"Pizza", price:250, available:true, image:"https://via.placeholder.com/150"},
  {name:"Cheese Burger", category:"Burgers", price:150, available:true, image:"https://via.placeholder.com/150"},
  {name:"Chocolate Cake", category:"Dessert", price:120, available:true, image:"https://via.placeholder.com/150"}
];

// Render products by category
function renderProducts(category){
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  products.filter(p => p.category === category).forEach(p=>{
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>₱${p.price}</p>`;
    const btn = document.createElement('button');
    btn.textContent = "Add";
    btn.addEventListener('click', ()=>{ 
      cart.push(p); 
      updateCart(); 
    });
    div.appendChild(btn);
    menu.appendChild(div);
  });
}

// Category buttons
document.querySelectorAll('.category').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.category').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

// Update cart UI
function updateCart(){
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let subtotal = 0;
  cart.forEach((item,index)=>{
    subtotal += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₱${item.price}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "x";
    removeBtn.addEventListener('click', ()=>{
      cart.splice(index,1);
      updateCart();
    });
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
  const tax = subtotal*0.05;
  document.getElementById('cartTax').textContent = tax.toFixed(2);
  document.getElementById('cartTotal').textContent = (subtotal+tax).toFixed(2);
}

// Place order button
document.getElementById('placeOrderBtn').addEventListener('click', ()=>{
  const customer = prompt("Enter your name:");
  if(!customer || cart.length === 0){
    alert("Name required and cart cannot be empty!");
    return;
  }
  alert(`Order placed for ${customer}!`);
  cart = [];
  updateCart();
});

// ====================
// Sidebar / Bottom Bar Active Icon
// ====================
const sidebarIcons = document.querySelectorAll('.sidebar .nav li');

sidebarIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    // Remove 'active' from all icons
    sidebarIcons.forEach(i => i.classList.remove('active'));

    // Add 'active' to clicked icon
    icon.classList.add('active');

    // Show/hide content
    switchContent(icon.title);
  });
});

// Switch content function
function switchContent(title){
  const mainContent = document.querySelector('main');
  const cartContent = document.querySelector('.cart');

  if(title === 'Menu'){
    mainContent.style.display = 'flex';
    cartContent.style.display = 'none';
  } else if(title === 'Cart'){
    mainContent.style.display = 'none';
    cartContent.style.display = 'flex';
  } else {
    // For Orders or Account (can customize later)
    mainContent.style.display = 'flex';
    cartContent.style.display = 'none';
  }
}

// ====================
// Initialization
// ====================
renderProducts('Pizza'); // default category
sidebarIcons.forEach(i => i.classList.remove('active')); // clear all
document.querySelector('.sidebar .nav li[title="Menu"]').classList.add('active'); // set default
switchContent('Menu'); // show menu by default
