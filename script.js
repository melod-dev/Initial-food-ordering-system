const API = "https://script.google.com/macros/s/AKfycbxLjaL8kS3nRiNRbFyDS0PhookpaL6abJ8vZBgqEG2Md0ViMQ86ZpOqZ3mIAkRp8cvs8A/exec";

let cart = [];

fetch(`${API}?action=products`)
  .then(res => res.json())
  .then(data => {
    const menu = document.getElementById("menu");
    data.forEach(p => {
      if (p.available) {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p>₱${p.price}</p>
          <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
        `;
        menu.appendChild(div);
      }
    });
  });

function addToCart(product) {
  cart.push(product);
  alert(product.name + " added");
}

function placeOrder() {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "order",
      customer: document.getElementById("name").value,
      notes: document.getElementById("notes").value,
      items: cart
    })
  }).then(() => alert("Order placed!"));
}
