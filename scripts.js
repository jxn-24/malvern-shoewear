document.addEventListener('DOMContentLoaded', displayProducts);
const productsMenu = document.getElementById('products-menu');
const newProductForm = document.getElementById('new-product');



function displayProducts() {
    fetch('http://127.0.0.1:5500/images')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(products) {
            renderProducts(products);
        })
        .catch(function(error) {
            console.error('Error fetching products:', error);
            document.getElementById('products-menu').innerHTML += 
                '<p>Error loading products. Please try again later.</p>';
        });
}


function renderProducts(products) {
    const productsMenu = document.getElementById('products-menu');
    
    
    const h2 = productsMenu.querySelector('h2');
    productsMenu.innerHTML = '';
    productsMenu.appendChild(h2);
    
    
    products.forEach(function(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image || ''}" alt="${product.name || 'Product image'}" class="product-image">
            <h3 class="product-name">${product.name || 'Product Name'}</h3>
            <h4 class="product-price">${product.price ? `$${product.price}` : '$0.00'}</h4>
            <button class="delete-btn" data-id="${product.id}">Delete</button>
        `;
        
        productsMenu.appendChild(productCard);
    });
    
    
    document.querySelectorAll('.delete-btn').forEach(function(button) {
        button.addEventListener('click', deleteProduct);
    });
}


function deleteProduct(event) {
    const productId = event.target.getAttribute('data-id');
    if (!productId) {
        console.error('No product ID found');
        return;
    }
    
    fetch(`http://127.0.0.1:5500/images/${productId}`, {
        method: 'DELETE'
    })
    .then(function(response) {
        if (response.ok) {
            
            displayProducts();
        } else {
            console.error('Failed to delete product');
        }
    })
    .catch(function(error) {
        console.error('Error deleting product:', error);
    });
}


