// Load cart and order summary from localStorage
let cart = JSON.parse(localStorage.getItem('icecreamCart')) || [];
let orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || null;
let selectedPayment = 'card';

// Initialize checkout page
function initCheckout() {
    // Check if cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'menu.html';
        return;
    }
    
    renderOrderSummary();
    setupFormValidation();
}

// Render order summary
function renderOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    summaryItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'summary-item';
        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-name-qty">${item.name}</div>
                <div class="item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        summaryItems.appendChild(itemDiv);
    });
    
    // Update totals
    if (orderSummary) {
        document.getElementById('subtotal').textContent = `$${orderSummary.subtotal}`;
        document.getElementById('deliveryFee').textContent = orderSummary.deliveryFee === '0.00' ? 'FREE' : `$${orderSummary.deliveryFee}`;
        document.getElementById('discount').textContent = `-$${orderSummary.discount}`;
        document.getElementById('totalPrice').textContent = `$${orderSummary.total}`;
    }
}

// Select payment method
function selectPayment(method) {
    selectedPayment = method;
    
    // Update UI
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.payment-option').classList.add('selected');
    
    // Show/hide card details
    const cardDetails = document.getElementById('cardDetails');
    if (method === 'card') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
    
    // Card number formatting
    const cardInput = document.getElementById('cardNumber');
    cardInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    // CVV - numbers only
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // ZIP code - numbers only
    const zipInput = document.getElementById('zip');
    zipInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
    });
}

// Validate form
function validateForm() {
    const form = document.getElementById('checkoutForm');
    
    // Basic HTML5 validation
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    
    // Additional validation for card payment
    if (selectedPayment === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Please enter expiry date in MM/YY format');
            return false;
        }
        
        if (cvv.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return false;
        }
        
        // Check expiry date is not in the past
        const [month, year] = expiry.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            alert('Card has expired');
            return false;
        }
    }
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Place order
function placeOrder() {
    if (!validateForm()) {
        return;
    }
    
    // Collect order data
    const orderData = {
        orderId: 'ORD-' + Date.now(),
        timestamp: new Date().toISOString(),
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        },
        delivery: {
            address: document.getElementById('address').value,
            apartment: document.getElementById('apartment').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            instructions: document.getElementById('instructions').value
        },
        payment: {
            method: selectedPayment,
            // Don't store actual card details in real application
            lastFourDigits: selectedPayment === 'card' 
                ? document.getElementById('cardNumber').value.slice(-4) 
                : null
        },
        items: cart,
        summary: orderSummary
    };
    
    // Store order in localStorage
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    
    // Store in order history
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Clear cart and related data
    localStorage.removeItem('icecreamCart');
    localStorage.removeItem('orderSummary');
    localStorage.removeItem('appliedPromo');
    
    // Show success message and redirect
    alert('🎉 Order placed successfully! Redirecting to confirmation...');
    window.location.href = 'confirmation.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCheckout);