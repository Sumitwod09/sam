 // Cart functionality
 const cartIcon = document.getElementById('cartIcon');
 const cartSidebar = document.getElementById('cartSidebar');
 const closeCart = document.getElementById('closeCart');
 const addToCartBtn = document.getElementById('addToCartBtn');
 const cartItems = document.getElementById('cartItems');
 const cartTotal = document.getElementById('cartTotal');
 const cartCount = document.querySelector('.cart-count');
 const checkoutBtn = document.getElementById('checkoutBtn');

 // let cart = [];

 cartIcon.addEventListener('click', () => {
     cartSidebar.classList.add('open');
 });

 closeCart.addEventListener('click', () => {
     cartSidebar.classList.remove('open');
 });

 addToCartBtn.addEventListener('click', (e) => {
     e.preventDefault();
     addToCart({
         id: 1,
         name: 'TARA ELEGANCE Beauty Elixir',
         price: 49.99,
         image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
     });
 });

 function addToCart(product) {
     const existingItem = cart.find(item => item.id === product.id);
     if (existingItem) {
         existingItem.quantity++;
     } else {
         cart.push({ ...product, quantity: 1 });
     }
     updateCart();
 }

 function updateCart() {
     cartItems.innerHTML = '';
     let total = 0;
     cart.forEach(item => {
         const itemElement = document.createElement('div');
         itemElement.classList.add('cart-item');
         itemElement.innerHTML = `
             <img src="${item.image}" alt="${item.name}" class="cart-item-image">
             <div class="cart-item-details">
                 <h4 class="cart-item-title">${item.name}</h4>
                 <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                 <div class="cart-item-quantity">
                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                     <span>${item.quantity}</span>
                     <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                 </div>
             </div>
         `;
         cartItems.appendChild(itemElement);
         total += item.price * item.quantity;
     });
     cartTotal.textContent = `$${total.toFixed(2)}`;
     cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
 }

 function updateQuantity(id, newQuantity) {
     if (newQuantity > 0) {
         const item = cart.find(item => item.id === id);
         item.quantity = newQuantity;
     } else {
         cart = cart.filter(item => item.id !== id);
     }
     updateCart();
 }

 checkoutBtn.addEventListener('click', () => {
     alert('Thank you for your purchase! Your order has been placed.');
     cart = [];
     updateCart();
     cartSidebar.classList.remove('open');
 });



 // Navigation Toggle
 document.querySelector('.hamburger').addEventListener('click', () => {
     document.querySelector('.nav-links').classList.toggle('active');
 });

 // Cart Functionality


 // Form Submissions
 document.getElementById('contactForm').addEventListener('submit', (e) => {
     e.preventDefault();
     // Here you would typically send the form data to a server
     alert('Thank you for your message! We will get back to you soon.');
 });

 document.getElementById('checkoutForm').addEventListener('submit', (e) => {
     e.preventDefault();
     // Here you would typically process the checkout
     alert('Thank you for your order! We will process it shortly.');
     cart = [];
     updateCart();
 });

 // Smooth Scrolling
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

 // Show/Hide Cart
 document.querySelector('a[href="#cart"]').addEventListener('click', (e) => {
     e.preventDefault();
     const cartPage = document.getElementById('cart');
     const currentDisplay = cartPage.style.display;
     cartPage.style.display = currentDisplay === 'none' ? 'block' : 'none';
 });



// Cart functionality
let cart = [];
const PRODUCT = {
id: 1,
name: 'Premium Beauty Elixir',
price: 99.99,
image: '/api/placeholder/200/200'
};

// Update cart count in navbar
function updateCartCount() {
const cartCount = document.querySelector('.cart-count');
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
cartCount.textContent = totalItems;
cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Update cart display
function updateCartDisplay() {
const cartItems = document.querySelector('.cart-items');
const totalAmount = document.getElementById('cart-total-amount');

if (!cartItems) return;

if (cart.length === 0) {
 cartItems.innerHTML = `
     <div class="empty-cart">
         <i class="fas fa-shopping-basket"></i>
         <p>Your cart is empty</p>
         <a href="#featured" class="btn">Continue Shopping</a>
     </div>
 `;
 totalAmount.textContent = '$0.00';
 return;
}

cartItems.innerHTML = cart.map(item => `
 <div class="cart-item">
     <img src="${item.image}" alt="${item.name}">
     <div class="cart-item-details">
         <h3>${item.name}</h3>
         <p>$${item.price.toFixed(2)}</p>
     </div>
     <div class="cart-item-actions">
         <div class="quantity-controls">
             <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
             <span>${item.quantity}</span>
             <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
         </div>
         <button class="btn btn-outline" onclick="removeFromCart(${item.id})">Remove</button>
     </div>
 </div>
`).join('');

const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
if (totalAmount) {
 totalAmount.textContent = `$${total.toFixed(2)}`;
}
}

// Add to cart
function addToCart() {
const existingItem = cart.find(item => item.id === PRODUCT.id);
if (existingItem) {
 existingItem.quantity += 1;
} else {
 cart.push({
     ...PRODUCT,
     quantity: 1
 });
}
updateCartDisplay();
updateCartCount();

// Show success message
const toast = document.createElement('div');
toast.style.cssText = `
 position: fixed;
 bottom: 20px;
 right: 20px;
 background: var(--primary);
 color: white;
 padding: 1rem 2rem;
 border-radius: 8px;
 animation: fadeIn 0.3s ease;
`;
toast.textContent = 'Product added to cart!';
document.body.appendChild(toast);
setTimeout(() => toast.remove(), 2000);
}

// Update quantity
function updateQuantity(productId, change) {
const item = cart.find(item => item.id === productId);
if (item) {
 item.quantity = Math.max(1, item.quantity + change);
 updateCartDisplay();
 updateCartCount();
}
}

// Remove from cart
function removeFromCart(productId) {
cart = cart.filter(item => item.id !== productId);
updateCartDisplay();
updateCartCount();
}

// Handle contact form submission
function handleContactSubmit(event) {
event.preventDefault();
const formData = {
 name: document.getElementById('name').value,
 email: document.getElementById('email').value,
 message: document.getElementById('message').value
};

// Here you would typically send this data to your server
console.log('Form submitted:', formData);

// Show success message
alert('Thank you for your message! We will get back to you soon.');
event.target.reset();
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
updateCartCount();
updateCartDisplay();

// Add click handler to add-to-cart button
const addToCartBtn = document.querySelector('.add-to-cart');
if (addToCartBtn) {
 addToCartBtn.addEventListener('click', addToCart);
}
});
