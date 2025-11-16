// Navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open'); // Kept for potential non-scroll-related styling
        document.documentElement.classList.toggle('scroll-lock');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            document.documentElement.classList.remove('scroll-lock');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            document.documentElement.classList.remove('scroll-lock');
        }
    }
});

// Prevent body scroll when modal is open
function toggleModalScrollLock(forceRemove = false) {
    if (forceRemove) {
        document.documentElement.classList.remove('scroll-lock');
        return;
    }
    const modal = document.getElementById('orderModal');
    if (modal && modal.style.display === 'block') {
        document.documentElement.classList.add('scroll-lock');
    } else {
        document.documentElement.classList.remove('scroll-lock');
    }
}

// Prevent scroll function for touch events
function preventScroll(e) {
    if (document.body.classList.contains('nav-open') || document.body.classList.contains('modal-open')) {
        e.preventDefault();
        return false;
    }
}

// Load products on homepage
function loadProducts() {
    // Wait a bit to ensure data.js is loaded
    if (typeof productsData === 'undefined') {
        setTimeout(loadProducts, 100);
        return;
    }
    
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        setTimeout(loadProducts, 100);
        return;
    }

    if (!productsData || Object.keys(productsData).length === 0) {
        console.error('productsData is empty');
        setTimeout(loadProducts, 200);
        return;
    }

    // Clear existing content
    productsGrid.innerHTML = '';

    // Load all products
    try {
        Object.values(productsData).forEach(product => {
            const availability = product.availability === 'weekend' && !isWeekend() 
                ? 'unavailable' 
                : product.availability;
            
            const availabilityInfo = getAvailabilityLabel(availability);
            
            const productCard = document.createElement('a');
            productCard.href = `product.html?id=${product.id}`;
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">${product.image}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
                <span class="availability-badge ${availabilityInfo.class}">${availabilityInfo.text}</span>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        console.log('Products loaded successfully:', Object.keys(productsData).length);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load product page
function loadProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId || !productsData[productId]) {
        window.location.href = 'index.html';
        return;
    }
    
    const product = productsData[productId];
    const availability = product.availability === 'weekend' && !isWeekend() 
        ? 'unavailable' 
        : product.availability;
    
    const availabilityInfo = getAvailabilityLabel(availability);
    
    // Update page title
    document.title = `${product.name} - Doces da Clau`;
    
    // Create product page content
    const mainContent = document.querySelector('main') || document.body;
    
    if (!document.querySelector('.product-page')) {
        const productPage = document.createElement('div');
        productPage.className = 'product-page';
        productPage.innerHTML = `
            <div class="container">
                <a href="index.html#products" class="back-button">← Voltar para produtos</a>
                <div class="product-header">
                    <div class="product-image" style="width: 200px; height: 200px; margin: 0 auto 2rem;">
                        ${product.image}
                    </div>
                    <h1>${product.name}</h1>
                    <p>${product.description}</p>
                    <div class="product-price" style="margin: 1rem 0;">${product.price}</div>
                    <span class="availability-badge ${availabilityInfo.class}">${availabilityInfo.text}</span>
                </div>
                
                <div class="flavors-section">
                    <h2 class="section-title" style="font-size: 2rem; margin-bottom: 1rem;">Sabores Disponíveis</h2>
                    <div class="flavors-grid" id="flavorsGrid"></div>
                </div>
            </div>
        `;
        
        mainContent.appendChild(productPage);
    }
    
    // Load flavors
    const flavorsGrid = document.getElementById('flavorsGrid');
    if (flavorsGrid) {
        flavorsGrid.innerHTML = '';
        
        product.flavors.forEach(flavor => {
            const flavorCard = document.createElement('div');
            flavorCard.className = 'flavor-card';
            
            const flavorAvailable = flavor.available && availability !== 'unavailable';
            const flavorAvailabilityInfo = getAvailabilityLabel(
                flavorAvailable ? 'available' : 'unavailable'
            );
            
            flavorCard.innerHTML = `
                <div class="flavor-name">${flavor.name}</div>
                <span class="availability-badge ${flavorAvailabilityInfo.class}">
                    ${flavorAvailabilityInfo.text}
                </span>
                <div class="flavor-actions">
                    <button 
                        class="order-btn-small" 
                        onclick="orderProduct('${product.id}', '${flavor.name}', ${flavorAvailable})"
                        ${!flavorAvailable ? 'disabled' : ''}
                    >
                        ${flavorAvailable ? 'Pedir Agora' : 'Solicitar Especial'}
                    </button>
                </div>
            `;
            
            flavorsGrid.appendChild(flavorCard);
        });
    }
}

// Order product function
function orderProduct(productId, flavorName, isAvailable) {
    const product = productsData[productId];
    
    // Open modal with pre-filled product and flavor
    openOrderModal(product.name, flavorName);
}

// WhatsApp function
function openWhatsApp() {
    const whatsappNumber = '5511973881060';
    const message = encodeURIComponent('Olá! Gostaria de fazer um pedido de doces gourmet.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Order modal functions
function openOrderModal(preSelectedProduct = null, preSelectedFlavor = null) {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'block';
        toggleModalScrollLock();
        
        // Reset flavors container
        const flavorsContainer = document.getElementById('flavorsContainer');
        if (flavorsContainer) {
            flavorsContainer.innerHTML = '<p class="flavors-placeholder">Selecione um produto primeiro</p>';
            flavorsContainer.classList.add('disabled');
        }
        
        // Populate product select
        const productSelect = document.getElementById('selectedProduct');
        if (productSelect) {
            // Remove existing event listeners by cloning
            const newSelect = productSelect.cloneNode(true);
            productSelect.parentNode.replaceChild(newSelect, productSelect);
            
            newSelect.innerHTML = '<option value="">Selecione um produto</option>';
            Object.values(productsData).forEach(product => {
                const option = document.createElement('option');
                option.value = product.name;
                option.textContent = product.name;
                newSelect.appendChild(option);
            });
            
            // Pre-select product if provided
            if (preSelectedProduct) {
                newSelect.value = preSelectedProduct;
                updateFlavors(preSelectedFlavor);
            }
            
            // Add event listener for product change
            newSelect.addEventListener('change', function() {
                updateFlavors(null);
            });
        }
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        toggleModalScrollLock();
    }
}

function updateFlavors(preSelectedFlavors = null) {
    const productSelect = document.getElementById('selectedProduct');
    const flavorsContainer = document.getElementById('flavorsContainer');
    
    if (!productSelect || !flavorsContainer) {
        console.error('Product select or flavors container not found');
        return;
    }
    
    const selectedProductName = productSelect.value;
    
    if (!selectedProductName) {
        // No product selected, show placeholder
        flavorsContainer.innerHTML = '<p class="flavors-placeholder">Selecione um produto primeiro</p>';
        flavorsContainer.classList.add('disabled');
        return;
    }
    
    const product = Object.values(productsData).find(p => p.name === selectedProductName);
    
    if (!product) {
        console.error('Product not found:', selectedProductName);
        flavorsContainer.innerHTML = '<p class="flavors-placeholder">Produto não encontrado</p>';
        flavorsContainer.classList.add('disabled');
        return;
    }
    
    // Enable flavors container and populate checkboxes
    flavorsContainer.classList.remove('disabled');
    flavorsContainer.innerHTML = '';
    
    if (!product.flavors || product.flavors.length === 0) {
        flavorsContainer.innerHTML = '<p class="flavors-placeholder">Nenhum sabor disponível para este produto</p>';
        return;
    }
    
    product.flavors.forEach(flavor => {
        const flavorWrapper = document.createElement('div');
        flavorWrapper.className = 'flavor-checkbox-wrapper';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `flavor-${Date.now()}-${flavor.name.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.name = 'selectedFlavors';
        checkbox.value = flavor.name;
        checkbox.disabled = !flavor.available;
        checkbox.className = 'flavor-checkbox';
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.className = flavor.available ? 'flavor-label' : 'flavor-label disabled';
        label.textContent = flavor.name;
        
        if (!flavor.available) {
            label.textContent += ' (Indisponível)';
        }
        
        // Quantity input for each flavor
        const quantityWrapper = document.createElement('div');
        quantityWrapper.className = 'flavor-quantity-wrapper';
        quantityWrapper.style.display = 'none';
        
        const quantityLabel = document.createElement('label');
        quantityLabel.htmlFor = `qty-${checkbox.id}`;
        quantityLabel.className = 'flavor-quantity-label';
        quantityLabel.textContent = 'Qtd:';
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.id = `qty-${checkbox.id}`;
        quantityInput.className = 'flavor-quantity-input';
        quantityInput.min = '1';
        quantityInput.value = '1';
        quantityInput.disabled = !flavor.available;
        
        quantityWrapper.appendChild(quantityLabel);
        quantityWrapper.appendChild(quantityInput);
        
        // Show/hide quantity when checkbox is checked
        checkbox.addEventListener('change', function() {
            if (this.checked && !this.disabled) {
                quantityWrapper.style.display = 'flex';
            } else {
                quantityWrapper.style.display = 'none';
                quantityInput.value = '1';
            }
        });
        
        flavorWrapper.appendChild(checkbox);
        flavorWrapper.appendChild(label);
        flavorWrapper.appendChild(quantityWrapper);
        flavorsContainer.appendChild(flavorWrapper);
    });
    
    // Pre-select flavors if provided
    if (preSelectedFlavors) {
        const flavorsArray = Array.isArray(preSelectedFlavors) ? preSelectedFlavors : [preSelectedFlavors];
        flavorsArray.forEach(flavorName => {
            const checkbox = flavorsContainer.querySelector(`input[value="${flavorName}"]`);
            if (checkbox && !checkbox.disabled) {
                checkbox.checked = true;
                // Trigger change event to show quantity input
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    }
}

function handleOrderSubmit(event) {
    event.preventDefault();
    
    const productSelect = document.getElementById('selectedProduct');
    const flavorsContainer = document.getElementById('flavorsContainer');
    
    // Validate that product and flavors are selected
    if (!productSelect || !productSelect.value) {
        alert('Por favor, selecione um produto.');
        return;
    }
    
    if (!flavorsContainer) {
        alert('Erro ao carregar sabores. Por favor, recarregue a página.');
        return;
    }
    
    const checkedCheckboxes = Array.from(flavorsContainer.querySelectorAll('input[type="checkbox"]:checked'));
    
    if (flavorsContainer.classList.contains('disabled') || checkedCheckboxes.length === 0) {
        alert('Por favor, selecione pelo menos um sabor.');
        return;
    }
    
    // Get flavors with their individual quantities
    const flavorsWithQuantity = checkedCheckboxes.map(checkbox => {
        const quantityInput = flavorsContainer.querySelector(`#qty-${checkbox.id}`);
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
        return {
            flavor: checkbox.value,
            quantity: quantity
        };
    });
    
    // Validate all quantities
    for (let item of flavorsWithQuantity) {
        if (!item.quantity || item.quantity < 1) {
            alert(`Por favor, informe uma quantidade válida para ${item.flavor} (mínimo 1).`);
            return;
        }
    }
    
    const formData = {
        name: document.getElementById('customerName').value,
        product: productSelect.value,
        flavorsWithQuantity: flavorsWithQuantity,
        notes: document.getElementById('orderNotes').value
    };
    
    // Create WhatsApp message with beautiful formatting
    let message = `🍰 *PEDIDO - DOCES DA CLAU* 🍰\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 *Cliente:* ${formData.name}\n\n`;
    message += `📦 *Itens do Pedido:*\n\n`;
    
    flavorsWithQuantity.forEach(item => {
        const productNameLower = formData.product.toLowerCase();
        message += `${item.quantity}x ${productNameLower} de ${item.flavor}\n`;
    });
    
    message += `\n`;
    if (formData.notes && formData.notes.trim()) {
        message += `📝 *Observações:*\n${formData.notes}\n\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `✨ Aguardo confirmação! ✨`;
    
    const whatsappNumber = '5511973881060';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Close modal and reset form
    closeOrderModal();
    document.getElementById('orderForm').reset();
    // Reset flavors container
    if (flavorsContainer) {
        flavorsContainer.innerHTML = '<p class="flavors-placeholder">Selecione um produto primeiro</p>';
        flavorsContainer.classList.add('disabled');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
}

// Initialize on page load
function initializePage() {
    // Check if we're on product page
    const isProductPage = window.location.pathname.includes('product.html') || 
                          window.location.href.includes('product.html') ||
                          window.location.search.includes('id=');
    
    if (isProductPage) {
        loadProductPage();
    } else {
        // Always load products on homepage
        loadProducts();
        
        // If URL has hash (e.g., #products), scroll to it after page loads
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const targetPosition = target.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                // Account for fixed navbar height
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle links from product page to homepage with anchor
    document.querySelectorAll('a[href*="index.html#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const parts = href.split('#');
                if (parts.length === 2) {
                    // If already on index.html, just scroll
                    if (window.location.pathname.includes('index.html') || 
                        window.location.pathname === '/' || 
                        window.location.pathname.endsWith('/')) {
                        e.preventDefault();
                        const target = document.querySelector('#' + parts[1]);
                        if (target) {
                            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                            const targetPosition = target.offsetTop - navbarHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                    // Otherwise, let the browser navigate normally
                }
            }
        });
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeOrderModal();
            }
        });
    }
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('orderModal');
            if (modal && modal.style.display === 'block') {
                closeOrderModal();
            }
        }
    });
    
}

// Try multiple ways to ensure initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    // DOM is already loaded
    initializePage();
}

// Also try after a short delay as fallback
setTimeout(initializePage, 200);
setTimeout(initializePage, 500);

// Force load products if on homepage
window.addEventListener('load', () => {
    if (!window.location.pathname.includes('product.html') && 
        !window.location.href.includes('product.html') &&
        !window.location.search.includes('id=')) {
        setTimeout(loadProducts, 300);
    }
});

