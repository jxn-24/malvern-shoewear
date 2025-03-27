document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
  
    document
      .getElementById("add-shoe-form")
      .addEventListener("submit", addNewShoe);
    
    document
      .getElementById("search-btn")
      .addEventListener("click", searchProducts);
  
    document
      .querySelector(".product-grid")
      .addEventListener("mouseover", highlightProduct);
  
    document
      .getElementById("search-input")
      .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          searchProducts();
        }
      });
  });
  
  const BASE_URL = 'https://malvern-shoewear-json-server.vercel.app/images';
  const productsMenu = document.querySelector(".product-grid");
  
  function displayProducts() {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((products) => renderProducts(products))
      .catch((error) => {
        console.error("Error fetching products:", error);
        productsMenu.innerHTML = `
          <div style="text-align: center; width: 100%; color: red;">
            Error loading products. Please ensure the JSON server is running.
            Details: ${error.message}
          </div>
        `;
      });
  }
  
  function renderProducts(products) {
    productsMenu.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <p class="product-price">Ksh ${product.price}</p>
        <p class="product-description">${
          product.description || "No description available"
        }</p>
        <div class="actions">
          <button onclick="deleteProduct('${product.id}')">Delete</button>
          <button onclick="showEditForm('${product.id}')">Edit</button>
        </div>
      `;
      productsMenu.appendChild(productCard);
    });
  }
  
  function showEditForm(id) {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((product) => {
        const modal = document.createElement("div");
        modal.className = "edit-modal";
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Edit Shoe</h2>
            <form id="edit-shoe-form">
              <input type="hidden" id="edit-shoe-id" value="${product.id}">
              <label for="edit-shoe-name">Name:</label>
              <input type="text" id="edit-shoe-name" value="${
                product.name
              }" required>
              <label for="edit-shoe-brand">Brand:</label>
              <input type="text" id="edit-shoe-brand" value="${
                product.brand
              }" required>
              <label for="edit-shoe-image">Image URL:</label>
              <input type="url" id="edit-shoe-image" value="${
                product.image
              }" required>
              <label for="edit-shoe-price">Price:</label>
              <input type="number" id="edit-shoe-price" value="${
                product.price
              }" min="0" required>
              <label for="edit-shoe-description">Description:</label>
              <textarea id="edit-shoe-description">${
                product.description || ""
              }</textarea>
              <button type="submit">Update Shoe</button>
            </form>
          </div>
        `;
        document.body.appendChild(modal);
  
        document.querySelector(".close-button").addEventListener("click", () => {
          document.body.removeChild(modal);
        });
  
        document
          .getElementById("edit-shoe-form")
          .addEventListener("submit", updateShoe);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }
  
  function updateShoe(event) {
    event.preventDefault();
    const id = document.getElementById("edit-shoe-id").value;
    const updatedShoe = {
      name: document.getElementById("edit-shoe-name").value,
      brand: document.getElementById("edit-shoe-brand").value,
      image: document.getElementById("edit-shoe-image").value,
      price: document.getElementById("edit-shoe-price").value,
      description: document.getElementById("edit-shoe-description").value,
    };
  
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedShoe),
    })
      .then((response) => response.json())
      .then(() => {
        document.body.removeChild(document.querySelector(".edit-modal"));
        displayProducts();
      })
      .catch((error) => console.error("Error updating shoe:", error));
  }
  
  function addNewShoe(event) {
    event.preventDefault();
    const newShoe = {
      name: document.getElementById("shoe-name").value,
      brand: document.getElementById("shoe-brand").value,
      image: document.getElementById("shoe-image").value,
      price: document.getElementById("shoe-price").value,
    };
  
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShoe),
    })
      .then(() => {
        displayProducts();
        document.getElementById("add-shoe-form").reset();
      })
      .catch((error) => console.error("Error adding shoe:", error));
  }
  
  function deleteProduct(id) {
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(() => displayProducts())
      .catch((error) => console.error("Error deleting product:", error));
  }
  
  function searchProducts() {
    const query = document.getElementById("search-input").value.toLowerCase();
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((products) => {
        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
      })
      .catch((error) => console.error("Error searching products:", error));
  }
  
  function highlightProduct(event) {
    if (event.target.closest(".product-card")) {
      const card = event.target.closest(".product-card");
  
      card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
  
      document.querySelectorAll(".product-card").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }
      });
    }
  }