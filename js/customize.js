// Customization options data
const customizationData = {
    bases: [
        { id: 'b1', name: 'Vanilla', emoji: '🤍', price: 5.99, image: 'images/flav2.jpg' },
        { id: 'b2', name: 'Chocolate', emoji: '🤎', price: 5.99, image: 'images/flav1.jpg' },
        { id: 'b3', name: 'Strawberry', emoji: '💗', price: 6.49, image: 'images/flav3.jpg' },
        { id: 'b4', name: 'Mint', emoji: '💚', price: 6.49, image: 'images/flav4.jpg' },
        { id: 'b5', name: 'Coffee', emoji: '☕', price: 6.99, image: 'images/flav5.jpg' },
        { id: 'b6', name: 'Pistachio', emoji: '💛', price: 7.49, image: 'images/flav6.jpg' }
    ],
    mixins: [
        { id: 'm1', name: 'Brownie Chunks', emoji: '🍫', price: 1.50, image: 'images/brownie.jpg' },
        { id: 'm2', name: 'Cookie Dough', emoji: '🍪', price: 1.50, image: 'images/dough.jpg' },
        { id: 'm3', name: 'Oreo Pieces', emoji: '⚫', price: 1.50, image: 'images/oreo.jpg' },
        { id: 'm4', name: 'Peanut Butter Cups', emoji: '🥜', price: 1.75, image: 'images/peanut.jpg' },
        { id: 'm5', name: 'Caramel Chunks', emoji: '🟡', price: 1.25, image: 'images/caramels.jpeg' },
        { id: 'm6', name: 'Fresh Berries', emoji: '🍓', price: 2.00, image: 'images/mixberries.jpg' }
    ],
    sauces: [
        { id: 's1', name: 'Hot Fudge', emoji: '🍫', price: 1.00, image: 'images/fudge.jpg' },
        { id: 's2', name: 'Caramel', emoji: '🍯', price: 1.00, image: 'images/carsauce.jpg' },
        { id: 's3', name: 'Strawberry', emoji: '🍓', price: 0.75, image: 'images/straw.jpg' },
        { id: 's4', name: 'Peanut Butter', emoji: '🥜', price: 1.25, image: 'images/peanuts.jpg' },
        { id: 's5', name: 'Marshmallow', emoji: '☁️', price: 0.75, image: 'images/marsh.jpg' },
        { id: 's6', name: 'Raspberry', emoji: '🫐', price: 1.00, image: 'images/rasp.jpg' }
    ],
    toppings: [
        { id: 't1', name: 'Sprinkles', emoji: '🌈', price: 0.50, image: 'images/sprinkles.jpg' },
        { id: 't2', name: 'Whipped Cream', emoji: '🍦', price: 0.75, image: 'images/whipped.jpg' },
        { id: 't3', name: 'Cherry', emoji: '🍒', price: 0.50, image: 'images/cherry.jpg' },
        { id: 't4', name: 'Crushed Nuts', emoji: '🌰', price: 0.75, image: 'images/nuts.jpg' },
        { id: 't5', name: 'Chocolate Chips', emoji: '🍫', price: 0.75, image: 'images/chips.jpg' },
        { id: 't6', name: 'Gummy Bears', emoji: '🐻', price: 0.50, image: 'images/gumy.jpg' },
        { id: 't7', name: 'M&Ms', emoji: '🔴', price: 0.75, image: 'images/mm.jpg' },
        { id: 't8', name: 'Coconut Flakes', emoji: '🥥', price: 0.50, image: 'images/coco.jpeg' }
    ],
    containers: [
        { id: 'c1', name: 'Waffle Cone', emoji: '🍦', price: 0.50, image: 'images/waffle.jpeg' },
        { id: 'c2', name: 'Sugar Cone', emoji: '🧁', price: 0.25, image: 'images/sugar.webp' },
        { id: 'c3', name: 'Cup', emoji: '🥤', price: 0.10, image: 'images/cup.jpg' },
        { id: 'c4', name: 'Waffle Bowl', emoji: '🥣', price: 1.00, image: 'images/bowl.jpg' },
        { id: 'c5', name: 'Tub', emoji: '🪣', price: 1.50, image: 'images/tub.png' }
    ]
};

// Selected options state
let selectedOptions = {
    base: null,
    mixin: null,
    sauce: null,
    toppings: [],
    container: null
};

// Initialize the page
function init() {
    renderOptions('bases', 'baseOptions', false);
    renderOptions('mixins', 'mixinOptions', false);
    renderOptions('sauces', 'sauceOptions', false);
    renderToppings();
    renderOptions('containers', 'containerOptions', false);
}

// Render single-select options
function renderOptions(category, containerId, multiSelect) {
    const container = document.getElementById(containerId);
    const items = customizationData[category];

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerHTML = `
            <div class="option-emoji" style="background-image: url('${item.image}'); background-size: cover; background-position: center; border-radius: 10px; width: 100%; height: 80px; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;"></div>
            <div class="option-name">${item.name}</div>
            <div class="option-price">+$${item.price.toFixed(2)}</div>
        `;
        
        card.addEventListener('click', () => selectOption(category, item, card, containerId));
        container.appendChild(card);
    });
}

// Render toppings (multi-select)
function renderToppings() {
    const container = document.getElementById('toppingsOptions');
    const toppings = customizationData.toppings;

    toppings.forEach(topping => {
        const card = document.createElement('div');
        card.className = 'topping-card';
        card.innerHTML = `
            <div class="topping-content">
                <div class="topping-emoji" style="background-image: url('${topping.image}'); background-size: cover; background-position: center; border-radius: 8px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;"></div>
                <div class="topping-info">
                    <div class="topping-name">${topping.name}</div>
                    <div class="topping-price">+$${topping.price.toFixed(2)}</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => toggleTopping(topping, card));
        container.appendChild(card);
    });
}

// Select single option
function selectOption(category, item, card, containerId) {
    // Remove previous selection
    const container = document.getElementById(containerId);
    container.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    
    // Add new selection
    card.classList.add('selected');
    
    // Update state based on category
    const categoryKey = category.slice(0, -1); // Remove 's' from category name
    selectedOptions[categoryKey] = item;
    
    updatePreview();
}

// Toggle topping selection
function toggleTopping(topping, card) {
    const index = selectedOptions.toppings.findIndex(t => t.id === topping.id);
    
    if (index > -1) {
        // Remove topping
        selectedOptions.toppings.splice(index, 1);
        card.classList.remove('selected');
    } else {
        // Add topping
        selectedOptions.toppings.push(topping);
        card.classList.add('selected');
    }
    
    updatePreview();
}

// Update preview panel
function updatePreview() {
    // Update selected items display
    document.getElementById('selectedBase').textContent = 
        selectedOptions.base ? selectedOptions.base.name : 'Not selected';
    
    document.getElementById('selectedMixin').textContent = 
        selectedOptions.mixin ? selectedOptions.mixin.name : 'Not selected';
    
    document.getElementById('selectedSauce').textContent = 
        selectedOptions.sauce ? selectedOptions.sauce.name : 'Not selected';
    
    document.getElementById('selectedToppings').textContent = 
        selectedOptions.toppings.length > 0 
            ? selectedOptions.toppings.map(t => t.name).join(', ') 
            : 'None';
    
    document.getElementById('selectedContainer').textContent = 
        selectedOptions.container ? selectedOptions.container.name : 'Not selected';
    
    // Update prices
    const basePrice = selectedOptions.base ? selectedOptions.base.price : 0;
    const mixinPrice = selectedOptions.mixin ? selectedOptions.mixin.price : 0;
    const saucePrice = selectedOptions.sauce ? selectedOptions.sauce.price : 0;
    const toppingsPrice = selectedOptions.toppings.reduce((sum, t) => sum + t.price, 0);
    const containerPrice = selectedOptions.container ? selectedOptions.container.price : 0;
    const total = basePrice + mixinPrice + saucePrice + toppingsPrice + containerPrice;
    
    document.getElementById('basePrice').textContent = `$${basePrice.toFixed(2)}`;
    document.getElementById('mixinPrice').textContent = `$${mixinPrice.toFixed(2)}`;
    document.getElementById('saucePrice').textContent = `$${saucePrice.toFixed(2)}`;
    document.getElementById('toppingsPrice').textContent = `$${toppingsPrice.toFixed(2)}`;
    document.getElementById('containerPrice').textContent = `$${containerPrice.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    
    // Update creation name
    if (selectedOptions.base) {
        const name = generateCreationName();
        document.getElementById('creationName').textContent = name;
    }
    
    // Update cone display with emojis
    updateConeDisplay();
    
    // Enable/disable add to cart button
    const canAddToCart = selectedOptions.base && selectedOptions.container;
    document.getElementById('addToCartBtn').disabled = !canAddToCart;
}

// Generate creative name for the ice cream
function generateCreationName() {
    const adjectives = ['Dreamy', 'Ultimate', 'Divine', 'Epic', 'Supreme', 'Heavenly', 'Legendary'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    if (selectedOptions.base && selectedOptions.mixin) {
        return `${randomAdj} ${selectedOptions.base.name} ${selectedOptions.mixin.name}`;
    } else if (selectedOptions.base) {
        return `${randomAdj} ${selectedOptions.base.name} Creation`;
    }
    
    return 'Your Custom Creation';
}

// Update cone display with visual representation
function updateConeDisplay() {
    let display = '';
    
    if (selectedOptions.toppings.length > 0) {
        display += selectedOptions.toppings.map(t => t.emoji).slice(0, 3).join('');
    }
    
    if (selectedOptions.sauce) {
        display += selectedOptions.sauce.emoji;
    }
    
    if (selectedOptions.base) {
        display += selectedOptions.base.emoji;
    }
    
    if (selectedOptions.container) {
        display += selectedOptions.container.emoji;
    }
    
    document.getElementById('coneDisplay').textContent = display || '🍦';
}

// Add to cart
document.getElementById('addToCartBtn').addEventListener('click', function() {
    if (!selectedOptions.base || !selectedOptions.container) {
        showToast('❌', 'Please select at least a base flavor and container!');
        return;
    }
    
    // Calculate total price
    const basePrice = selectedOptions.base.price;
    const mixinPrice = selectedOptions.mixin ? selectedOptions.mixin.price : 0;
    const saucePrice = selectedOptions.sauce ? selectedOptions.sauce.price : 0;
    const toppingsPrice = selectedOptions.toppings.reduce((sum, t) => sum + t.price, 0);
    const containerPrice = selectedOptions.container.price;
    const totalPrice = basePrice + mixinPrice + saucePrice + toppingsPrice + containerPrice;
    
    // Store pending item data
    window.pendingCustomItem = {
        price: totalPrice,
        customization: { ...selectedOptions }
    };
    
    // Show share modal
    const modal = document.getElementById('shareModal');
    
    // Pre-fill with generated name and description
    document.getElementById('creationNameInput').value = generateCreationName();
    document.getElementById('creationDescInput').value = buildDescription();
    document.getElementById('creatorNameInput').value = '';
    
    modal.classList.add('active');
});

// Handle share form submission (Add & Share with Community)
document.getElementById('shareForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customName = document.getElementById('creationNameInput').value.trim();
    const customDescription = document.getElementById('creationDescInput').value.trim();
    const creatorName = document.getElementById('creatorNameInput').value.trim() || 'Anonymous';
    
    if (!customName || !customDescription) {
        showToast('❌', 'Please fill in all required fields!');
        return;
    }
    
    const itemData = window.pendingCustomItem;
    
    // Create custom item
    const customItem = {
        id: 'custom-' + Date.now(),
        name: customName,
        price: itemData.price,
        category: 'custom',
        description: customDescription,
        emoji: '🎨',
        quantity: 1,
        customization: itemData.customization
    };
    
    // Save to community
    saveToCommmunity(customItem, customName, customDescription, creatorName);
    
    // Add to cart
    let cart = JSON.parse(localStorage.getItem('icecreamCart')) || [];
    cart.push(customItem);
    localStorage.setItem('icecreamCart', JSON.stringify(cart));
    
    // Close modal
    closeShareModal();
    
    // Show success toast
    showToast('🎉', 'Added to cart & shared with community!');
    
    // Reset builder after a delay
    setTimeout(() => {
        resetBuilder();
    }, 1500);
});

// Add to cart only (without sharing)
function addToCartOnly() {
    const customName = document.getElementById('creationNameInput').value.trim();
    const customDescription = document.getElementById('creationDescInput').value.trim();
    
    if (!customName || !customDescription) {
        showToast('❌', 'Please fill in name and description!');
        return;
    }
    
    const itemData = window.pendingCustomItem;
    
    // Create custom item
    const customItem = {
        id: 'custom-' + Date.now(),
        name: customName,
        price: itemData.price,
        category: 'custom',
        description: customDescription,
        emoji: '🎨',
        quantity: 1,
        customization: itemData.customization
    };
    
    // Add to cart (without sharing to community)
    let cart = JSON.parse(localStorage.getItem('icecreamCart')) || [];
    cart.push(customItem);
    localStorage.setItem('icecreamCart', JSON.stringify(cart));
    
    // Close modal
    closeShareModal();
    
    // Show success toast
    showToast('✓', 'Added to cart!');
    
    // Reset builder after a delay
    setTimeout(() => {
        resetBuilder();
    }, 1500);
}

// Close share modal
function closeShareModal() {
    document.getElementById('shareModal').classList.remove('active');
}

// Close modal on outside click
document.getElementById('shareModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeShareModal();
    }
});

// Show toast notification
function showToast(icon, message) {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    toastIcon.textContent = icon;
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Save to community creations
function saveToCommmunity(item, name, description, creator) {
    let communityCreations = JSON.parse(localStorage.getItem('communityCreations')) || [];
    
    const communityItem = {
        id: item.id,
        name: name,
        description: description,
        price: item.price,
        customization: item.customization,
        creator: creator,
        createdDate: new Date().toISOString(),
        ratings: [],
        averageRating: 0,
        orderCount: 0
    };
    
    communityCreations.unshift(communityItem);
    localStorage.setItem('communityCreations', JSON.stringify(communityCreations));
}

// Build description from selections
function buildDescription() {
    let desc = selectedOptions.base.name + ' ice cream';
    
    if (selectedOptions.mixin) {
        desc += ' with ' + selectedOptions.mixin.name;
    }
    
    if (selectedOptions.sauce) {
        desc += ', ' + selectedOptions.sauce.name + ' swirl';
    }
    
    if (selectedOptions.toppings.length > 0) {
        desc += ', topped with ' + selectedOptions.toppings.map(t => t.name).join(', ');
    }
    
    desc += ' in a ' + selectedOptions.container.name;
    
    return desc;
}

// Reset builder
function resetBuilder() {
    selectedOptions = {
        base: null,
        mixin: null,
        sauce: null,
        toppings: [],
        container: null
    };
    
    // Remove all selections
    document.querySelectorAll('.option-card, .topping-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    updatePreview();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);