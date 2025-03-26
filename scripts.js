document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
const productsMenu = document.getElementById('products-menu');
const newProductForm = document.getElementById('new-product');


function fetchAndDisplayProducts() {
    // Show loading state
    productsMenu.innerHTML = '<h2>Product Catalog</h2><p>Loading products...</p>';
    
    fetch('http://127.0.0.1:5500/images')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            displayProducts(data.images);
        })
        .catch(error => {
            console.error('Error:', error);
            productsMenu.innerHTML = '<h2>Product Catalog</h2><p class="error">Failed to load products. Please try again later.</p>';
        });
}

function displayProducts(products) {
    // Create product grid
    const productGrid = document.createElement('div');
    productGrid.className = 'product-grid';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <h4 class="product-price">₹${product.price.toLocaleString()}</h4>
                    <button class="delete-btn" data-id="${product.id}">Delete</button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });

    productsMenu.innerHTML = '<h2>Product Catalog</h2>';
    productsMenu.appendChild(productGrid);
    
    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteProduct);
    });
}
    