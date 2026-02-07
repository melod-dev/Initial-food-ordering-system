let cart = [];
let products = [
  {name:"Pepperoni Pizza", category:"Pizza", price:250, available:true, image:"https://via.placeholder.com/150"},
  {name:"Cheese Burger", category:"Burgers", price:150, available:true, image:"https://via.placeholder.com/150"},
  {name:"Chocolate Cake", category:"Dessert", price:120, available:true, image:"https://via.placeholder.com/150"}
];

function renderProducts(category){
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  products.filter(p => p.category === category).forEach(p=>{
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>₱${p.price}</p>`;
    const btn = document.createElement('button');
    btn.textContent = "Add";
    btn.addEventListener('click', ()=>{ cart.push(p); updateCart(); });
    div.appendChild(btn);
    menu.appendChild(div);
  });
}

document.querySelectorAll('.category').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.category').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

function updateCart(){
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let subtotal = 0;
  cart.forEach((item,index)=>{
    subtotal+=item.price;
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

// Default render
renderProducts('Pizza');
