const products = [
  { id: 1, name: "Nike", price: 4500, category: "Shoes" },
  { id: 2, name: "Adidas", price: 2500, category: "Shoes" },
  { id: 3, name: "Puma", price: 1300, category: "Shoes" },
  { id: 4, name: "Vans", price: 1000, category: "Shoes" },
  { id: 5, name: "Asics", price: 1500, category: "Shoes" },
  { id: 6, name: "Jordan", price: 3500, category: "Shoes" }
];

let cart = [];

// Render Products
function renderProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="col-md-6 mb-3">
        <div class="card p-3">
          <h6>${p.name}</h6>
          <p>₱${p.price}</p>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

// Render Cart
function renderCart() {
  const tbody = document.getElementById("cartTableBody");
  tbody.innerHTML = "";

  cart.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="updateQty(${item.id}, ${item.qty - 1})">-</button>
          ${item.qty}
          <button class="btn btn-sm btn-secondary" onclick="updateQty(${item.id}, ${item.qty + 1})">+</button>
        </td>
        <td>₱${item.price}</td>
        <td>₱${item.price * item.qty}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">X</button></td>
      </tr>
    `;
  });

  computeTotals();
}

// Update Quantity
function updateQty(id, newQty) {
  if (newQty <= 0) {
    removeItem(id);
    return;
  }

  const item = cart.find(i => i.id === id);
  item.qty = newQty;
  renderCart();
}

// Remove Item
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

// Clear Cart
function clearCart() {
  cart = [];
  renderCart();
}

// Compute Totals
function computeTotals() {
  let subtotal = 0;
  cart.forEach(item => subtotal += item.price * item.qty);

  let discount = subtotal >= 1000 ? subtotal * 0.10 : 0;
  let tax = (subtotal - discount) * 0.12;
  let shipping = subtotal >= 500 ? 0 : 80;
  let grandTotal = subtotal - discount + tax + shipping;

  document.getElementById("summary").innerHTML = `
    <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
    <p>Discount: ₱${discount.toFixed(2)}</p>
    <p>Tax (12%): ₱${tax.toFixed(2)}</p>
    <p>Shipping: ₱${shipping.toFixed(2)}</p>
    <hr>
    <h5>Total: ₱${grandTotal.toFixed(2)}</h5>
  `;
}

// Toggle Address
function toggleAddress() {
  const delivery = document.getElementById("delivery").value;
  const addressField = document.getElementById("addressField");
  addressField.classList.toggle("d-none", delivery !== "Delivery");
}

// Checkout
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!this.checkValidity() || cart.length === 0) {
    this.classList.add("was-validated");
    return;
  }

  const orderId = "ORD-2026-" + Math.floor(100000 + Math.random() * 900000);

  let receiptHTML = `
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    <hr>
    <p><strong>Name:</strong> ${fullName.value}</p>
    <p><strong>Email:</strong> ${email.value}</p>
    <p><strong>Payment:</strong> ${payment.value}</p>
    <p><strong>Delivery:</strong> ${delivery.value}</p>
    <hr>
  `;

  cart.forEach(item => {
    receiptHTML += `
      <p>${item.name} x ${item.qty} = ₱${item.price * item.qty}</p>
    `;
  });

  receiptHTML += document.getElementById("summary").innerHTML;

  document.getElementById("receiptBody").innerHTML = receiptHTML;

  new bootstrap.Modal(document.getElementById("receiptModal")).show();

  clearCart();
  this.reset();
  this.classList.remove("was-validated");
});

// Initialize
renderProducts();