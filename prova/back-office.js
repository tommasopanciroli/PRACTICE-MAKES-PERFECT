const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWFhYjc5YzQ1ZjAwMTU2OWI0YjYiLCJpYXQiOjE3Mjc0MjEwOTksImV4cCI6MTcyODYzMDY5OX0.mEdvI9JTziNEoKoJdqSizba4DCziPw1XWMVfNM0bpQI"; // Inserisci il token ottenuto

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const productId = new URLSearchParams(window.location.search).get("id");
if (productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("brand").value = data.brand;
      document.getElementById("price").value = data.price;
      document.getElementById("imageUrl").value = data.imageUrl;
    })
    .catch((error) => console.error("Errore:", error));
}

let productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    price: document.getElementById("price").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  const method = productId ? "PUT" : "POST";
  const url = productId
    ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
    : "https://striveschool-api.herokuapp.com/api/product/";

  fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Prodotto salvato con successo");
      window.location.href = "index.html";
    })
    .catch((error) => console.error("Errore:", error));
});

document
  .getElementById("delete-product")
  .addEventListener("click", function () {
    if (productId) {
      const deleteModal = new bootstrap.Modal(
        document.getElementById("deleteModal")
      );
      deleteModal.show();
    }
  });

document.getElementById("confirmDelete").addEventListener("click", function () {
  if (productId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: headers,
    })
      .then(() => {
        alert("Prodotto cancellato");
        window.location.href = "index.html";
      })
      .catch((error) => console.error("Errore:", error));
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteModal")
    );
    deleteModal.hide();
  }
});

document.getElementById("resetbtn").addEventListener("click", function (event) {
  event.preventDefault();
  const resetModal = new bootstrap.Modal(document.getElementById("resetModal"));
  resetModal.show();
});

document.getElementById("confirmReset").addEventListener("click", function () {
  const productForm = document.getElementById("product-form");
  productForm.reset();
  const resetModal = bootstrap.Modal.getInstance(
    document.getElementById("resetModal")
  );
  resetModal.hide();
});