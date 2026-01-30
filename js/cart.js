// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('icecreamCart')) || [];
let discountAmount = 0;
const deliveryFee = 50;

// Promo codes
const promoCodes = {
    'SWEET10': 0.10,  // 10% off
    'SUMMER20': 0.20, // 20% off
    'FREESHIP': 'free_shipping',
    'FIRSTORDER': 0.15 // 15% off
};

// Initialize cart page
function initCart() {
    renderCart();
    updateSummary();
}

// Render cart items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartLayout = document.getElementById('cartLayout');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some delicious ice cream to get started!</p>
                <a href="menu.html" class="btn btn-primary">Browse Menu</a>
            </div>
        `;
        document.getElementById('orderSummary').style.display = 'none';
        return;
    }
    
    document.getElementById('orderSummary').style.display = 'block';
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        
        const itemTotal = (item.price * item.quantity).toFixed(2);
        
        itemDiv.innerHTML = `
            <div class="item-image" style="${item.image ? `background-image: url('${item.image}')` : ''}">
                ${!item.image ? item.emoji : ''}
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <span class="item-category">${item.category}</span>
                <div class="item-description">${item.description}</div>
                <div class="item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="item-actions">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; color: #333;">
                    Total: $${itemTotal}
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">🗑️ Remove</button>
            </div>
        `;
        
        cartItems.appendChild(itemDiv);
    });
    
    // Update item count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartItemCount').textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart`;
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    renderCart();
    updateSummary();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        renderCart();
        updateSummary();
    } else {
        removeItem(index);
    }
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateSummary();
    showToast('🗑️', 'Item removed from cart');
}

// Show toast notification
function showToast(icon, message) {
    // Remove existing toast if any
    const existingToast = document.getElementById('toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
    `;
    
    toast.innerHTML = `
        <span style="font-size: 2rem;">${icon}</span>
        <span style="font-weight: 600; color: #333;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('icecreamCart', JSON.stringify(cart));
}

// Update order summary
function updateSummary() {
    if (cart.length === 0) return;
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate discount
    const discount = discountAmount;
    
    // Calculate delivery fee
    let finalDeliveryFee = deliveryFee;
    const appliedPromo = localStorage.getItem('appliedPromo');
    if (appliedPromo && promoCodes[appliedPromo] === 'free_shipping') {
        finalDeliveryFee = 0;
    }
    
    // Calculate total
    const total = subtotal + finalDeliveryFee - discount;
    
    // Update DOM
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = finalDeliveryFee === 0 ? 'FREE' : `$${finalDeliveryFee.toFixed(2)}`;
    document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promoCode');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    if (!promoCode) {
        showToast('❌', 'Please enter a promo code');
        return;
    }
    
    if (promoCodes[promoCode]) {
        const promoValue = promoCodes[promoCode];
        
        if (promoValue === 'free_shipping') {
            showToast('🎉', 'Promo code applied! You got FREE SHIPPING!');
            localStorage.setItem('appliedPromo', promoCode);
            discountAmount = 0;
        } else {
            // Percentage discount
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            discountAmount = subtotal * promoValue;
            showToast('🎉', `Promo code applied! You got ${(promoValue * 100)}% off!`);
            localStorage.setItem('appliedPromo', promoCode);
        }
        
        promoInput.value = '';
        updateSummary();
    } else {
        showToast('❌', 'Invalid promo code. Try: SWEET10, SUMMER20, FREESHIP, or FIRSTORDER');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('❌', 'Your cart is empty!');
        return;
    }
    
    // Store order summary in localStorage for checkout page
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let finalDeliveryFee = deliveryFee;
    const appliedPromo = localStorage.getItem('appliedPromo');
    if (appliedPromo && promoCodes[appliedPromo] === 'free_shipping') {
        finalDeliveryFee = 0;
    }
    const total = subtotal + finalDeliveryFee - discountAmount;
    
    const orderSummary = {
        subtotal: subtotal.toFixed(2),
        deliveryFee: finalDeliveryFee.toFixed(2),
        discount: discountAmount.toFixed(2),
        total: total.toFixed(2),
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
    
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    
    // Redirect to checkout
    window.location.href = 'checkout.html';
}

// Clear cart (for testing)
function clearCart() {
    cart = [];
    discountAmount = 0;
    localStorage.removeItem('appliedPromo');
    saveCart();
    renderCart();
    updateSummary();
    showToast('🗑️', 'Cart cleared');
}

// Initialize on page load

document.addEventListener('DOMContentLoaded', initCart);
