<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mini Checkout System</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-dark bg-primary">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">🛒 Mini Checkout System</span>
  </div>
</nav>

<div class="container my-4">
  <div class="row">

    <!-- PRODUCT LIST -->
    <div class="col-lg-7">
      <h4>Products</h4>
      <div class="row" id="productList"></div>
    </div>

    <!-- CART + CHECKOUT -->
    <div class="col-lg-5">
      <h4>Cart</h4>
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="cartTableBody"></tbody>
      </table>

      <button class="btn btn-danger btn-sm mb-3" onclick="clearCart()">Clear Cart</button>

      <!-- SUMMARY -->
      <div class="card mb-3">
        <div class="card-body" id="summary"></div>
      </div>

      <!-- CHECKOUT FORM -->
      <h5>Checkout</h5>
      <form id="checkoutForm" class="needs-validation" novalidate>

        <div class="mb-2">
          <input type="text" class="form-control" id="fullName" placeholder="Full Name" required>
          <div class="invalid-feedback">Full name required</div>
        </div>

        <div class="mb-2">
          <input type="email" class="form-control" id="email" placeholder="Email" required>
          <div class="invalid-feedback">Valid email required</div>
        </div>

        <div class="mb-2">
          <select class="form-select" id="payment" required>
            <option value="">Payment Method</option>
            <option>Cash</option>
            <option>GCash</option>
            <option>Card</option>
          </select>
          <div class="invalid-feedback">Select payment method</div>
        </div>

        <div class="mb-2">
          <select class="form-select" id="delivery" required onchange="toggleAddress()">
            <option value="">Delivery Option</option>
            <option value="Pickup">Pickup</option>
            <option value="Delivery">Delivery</option>
          </select>
          <div class="invalid-feedback">Select delivery option</div>
        </div>

        <div class="mb-2 d-none" id="addressField">
          <input type="text" class="form-control" id="address" placeholder="Delivery Address">
        </div>

        <button type="submit" class="btn btn-success w-100">Place Order</button>
      </form>
    </div>

  </div>
</div>

<!-- RECEIPT MODAL -->
<div class="modal fade" id="receiptModal">
  <div class="modal-dialog">
    <div class="modal-content" id="receiptContent">
      <div class="modal-header">
        <h5 class="modal-title">Order Receipt</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="receiptBody"></div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="window.print()">Print Receipt</button>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="script.js"></script>

</body>
</html>