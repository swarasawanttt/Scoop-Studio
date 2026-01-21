// Ice cream menu data
const menuData = [
    {
        id: 1,
        name: "Classic Vanilla Bean",
        price: 6.99,
        category: "classic",
        description: "Rich Madagascar vanilla with real bean specks. A timeless favorite.",
        emoji: "🍦",
        image: "images/vanilaa.jpg",
        badge: "Popular"
    },
    {
        id: 2,
        name: "Chocolate Fudge Brownie",
        price: 7.99,
        category: "classic",
        description: "Decadent chocolate ice cream with chunks of fudgy brownies.",
        emoji: "🍫",
        image: "images/chocolate.jpg",
        badge: null
    },
    {
        id: 3,
        name: "Strawberry Cheesecake",
        price: 8.49,
        category: "premium",
        description: "Creamy cheesecake ice cream swirled with fresh strawberry compote.",
        emoji: "🍓",
        image: "images/strawberry.jpg",
        badge: "New"
    },
    {
        id: 4,
        name: "Salted Caramel Pretzel",
        price: 8.99,
        category: "classic",
        description: "Sweet and salty perfection with caramel swirls and pretzel pieces.",
        emoji: "🥨",
        image: "images/caramel.jpg",
        badge: "Popular"
    },
    {
        id: 5,
        name: "Mint Chocolate Chip",
        price: 7.49,
        category: "classic",
        description: "Cool peppermint ice cream loaded with dark chocolate chips.",
        emoji: "🌿",
        image: "images/mint.jpg",
        badge: null
    },
    {
        id: 6,
        name: "Coconut Mango Bliss",
        price: 9.49,
        category: "vegan",
        description: "Dairy-free coconut base with sweet mango chunks. 100% plant-based.",
        emoji: "🥥",
        image: "images/coconut.jpg",
        badge: "Vegan"
    },
    {
        id: 7,
        name: "Cookie Dough Delight",
        price: 8.99,
        category: "classic",
        description: "Vanilla ice cream packed with edible cookie dough pieces.",
        emoji: "🍪",
        image: "images/cookie.jpg",
        badge: "Popular"
    },
    {
        id: 8,
        name: "Pistachio Dream",
        price: 9.99,
        category: "premium",
        description: "Authentic Sicilian pistachio ice cream made with real nuts.",
        emoji: "🌰",
        image: "images/pistachio.jpg",
        badge: null
    },
    {
        id: 9,
        name: "Pumpkin Spice Latte",
        price: 8.49,
        category: "seasonal",
        description: "Fall favorite with pumpkin, cinnamon, and espresso swirls.",
        emoji: "🎃",
        image: "images/pumpkin.jpg",
        badge: "Seasonal"
    },
    {
        id: 10,
        name: "Berry Sorbet",
        price: 7.99,
        category: "vegan",
        description: "Refreshing blend of strawberries, blueberries, and raspberries.",
        emoji: "🫐",
        image: "images/berry.jpg",
        badge: "Vegan"
    },
    {
        id: 11,
        name: "Coffee Toffee Crunch",
        price: 8.49,
        category: "premium",
        description: "Espresso ice cream with crunchy toffee bits throughout.",
        emoji: "☕",
        image: "images/coffee.jpg",
        badge: null
    },
    {
        id: 12,
        name: "Lavender Honey",
        price: 9.99,
        category: "premium",
        description: "Delicate lavender infused with organic wildflower honey.",
        emoji: "💜",
        image: "images/lavender.webp",
        badge: "New"
    },

    {
        id: 13,
        name: "Matcha & White Chocolate",
        price: 10.99,
        category: "premium",
        description: "Earthy matcha with a smooth white chocolate sweetness.",
        emoji: "💜",
        image: "images/matcha.webp",
        badge: "New"
    },

    {
        id: 14,
        name: "Cherry Fudge Swirl",
        price: 9.99,
        category: "premium",
        description: "Sweet cherry ice cream folded with thick chocolate fudge swirls.",
        emoji: "💜",
        image: "images/cherry2.webp",
        badge: null
    },

    {
        id: 15,
        name: "Classic Blackcurrant",
        price: 8.99,
        category: "classic",
        description: "Rich blackcurrant ice cream with a bold, tangy berry taste.",
        emoji: "💜",
        image: "images/blackcurrant.jpg",
        badge: null
    }
];

// Container options
const containerOptions = [
    { id: 'cone', name: 'Waffle Cone', emoji: '🍦', price: 50 },
    { id: 'sugar-cone', name: 'Sugar Cone', emoji: '🧁', price: 25 },
    { id: 'cup', name: 'Cup', emoji: '🥤', price: 10 },
    { id: 'bowl', name: 'Waffle Bowl', emoji: '🥣', price: 100 },
    { id: 'tub', name: 'Tub', emoji: '🪣', price: 150 }
];

// Initialize cart from localStorage or create new
let cart = JSON.parse(localStorage.getItem('icecreamCart')) || [];
let quantities = {};

// Initialize quantities for each item
menuData.forEach(item => {
    quantities[item.id] = 0;
});

// Render menu items
function renderMenu(filter = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filteredItems = filter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === filter);

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
                ${item.badge ? `<div class="item-badge">${item.badge}</div>` : ''}
            </div>
            <div class="item-details">
                <div class="item-header">
                    <div>
                        <h3>${item.name}</h3>
                        <span class="item-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                    </div>
                    <div class="item-price">₹${item.price.toFixed(2)}</div>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-footer">
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
                        <span class="qty-display" id="qty-${item.id}">0</span>
                        <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="showContainerModal(${item.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Quantity controls
function increaseQty(itemId) {
    quantities[itemId]++;
    document.getElementById(`qty-${itemId}`).textContent = quantities[itemId];
}

function decreaseQty(itemId) {
    if (quantities[itemId] > 0) {
        quantities[itemId]--;
        document.getElementById(`qty-${itemId}`).textContent = quantities[itemId];
    }
}

// Show container selection modal
function showContainerModal(itemId) {
    const quantity = quantities[itemId];

    if (quantity === 0) {
        showToast('❌', 'Please select a quantity first!');
        return;
    }

    const item = menuData.find(i => i.id === itemId);
    
    const existingModal = document.getElementById('containerModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'containerModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); display: flex; justify-content: center;
        align-items: center; z-index: 10000; padding: 2rem;
    `;

    const modalContent = `
        <div style="background: white; border-radius: 20px; padding: 2.5rem; max-width: 500px; width: 100%;">
            <h2 style="color: #333; margin-bottom: 1rem; text-align: center;">Choose Your Container</h2>
            <p style="color: #666; text-align: center; margin-bottom: 2rem;">Select how you'd like your ${item.name}</p>
            
            <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                ${containerOptions.map(container => `
                    <div class="container-option" data-container-id="${container.id}" 
                         style="padding: 1rem; border: 2px solid #e0e0e0; border-radius: 15px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 2rem;">${container.emoji}</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: #333;">${container.name}</div>
                            <div style="color: #ff6b9d; font-weight: 600;">+₹${container.price}</div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <button onclick="closeContainerModal()" 
                    style="width: 100%; padding: 1rem; background: #e0e0e0; color: #666; border: none; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 1rem;">
                Cancel
            </button>
        </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    document.querySelectorAll('.container-option').forEach(option => {
        option.addEventListener('click', function() {
            const containerId = this.getAttribute('data-container-id');
            addToCart(itemId, containerId);
        });

        option.addEventListener('mouseenter', function() {
            this.style.borderColor = '#ff6b9d';
            this.style.background = 'linear-gradient(135deg, #fff0f6, #ffe8f0)';
            this.style.transform = 'scale(1.02)';
        });

        option.addEventListener('mouseleave', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.background = 'white';
            this.style.transform = 'scale(1)';
        });
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeContainerModal();
    });
}

function closeContainerModal() {
    const modal = document.getElementById('containerModal');
    if (modal) modal.remove();
}

// Add to cart with container
function addToCart(itemId, containerId) {
    const item = menuData.find(i => i.id === itemId);
    const container = containerOptions.find(c => c.id === containerId);
    const quantity = quantities[itemId];

    const totalPrice = item.price + container.price;

    const existingItem = cart.find(i => i.id === itemId && i.container?.id === containerId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity,
            container: container,
            totalPrice: totalPrice
        });
    }

    localStorage.setItem('icecreamCart', JSON.stringify(cart));

    quantities[itemId] = 0;
    document.getElementById(`qty-${itemId}`).textContent = 0;

    closeContainerModal();
    updateCartSummary();

    showToast('✓', `${item.name} in ${container.name} added to cart!`);
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

// Update cart summary
function updateCartSummary() {
    const cartSummary = document.getElementById('cartSummary');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartSummary.classList.add('hidden');
        return;
    }

    cartSummary.classList.remove('hidden');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = item.totalPrice || item.price;
    return sum + (itemPrice * item.quantity);
    }, 0);

    cartItems.textContent = totalItems;
    cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter menu
        const filter = this.getAttribute('data-filter');
        renderMenu(filter);
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    updateCartSummary();
});