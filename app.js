document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const profileLink = document.getElementById('profile-link');
    const authLinks = document.getElementById('auth-links');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close');
    const logoutBtn = document.getElementById('logout-btn');
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    // Product data
    const products = {
        tablets: [
            { id: 1, name: 'iPad Pro 12.9" (2023)', price: 1099, discount: 0, category: 'apple', stock: 15, image: 'https://via.placeholder.com/400x300?text=iPad+Pro' },
            { id: 2, name: 'Samsung Galaxy Tab S8 Ultra', price: 999, discount: 10, category: 'samsung', stock: 8, image: 'https://via.placeholder.com/400x300?text=Galaxy+Tab+S8' },
            { id: 3, name: 'Huawei MatePad Pro 12.6"', price: 799, discount: 15, category: 'huawei', stock: 5, image: 'https://via.placeholder.com/400x300?text=MatePad+Pro' },
            { id: 4, name: 'iPad Air (2022)', price: 599, discount: 5, category: 'apple', stock: 12, image: 'https://via.placeholder.com/400x300?text=iPad+Air' },
            { id: 5, name: 'Samsung Galaxy Tab S7 FE', price: 529, discount: 0, category: 'samsung', stock: 7, image: 'https://via.placeholder.com/400x300?text=Tab+S7+FE' },
            { id: 6, name: 'Lenovo Tab P12 Pro', price: 649, discount: 8, category: 'lenovo', stock: 4, image: 'https://via.placeholder.com/400x300?text=Tab+P12+Pro' }
        ],
        laptops: [
            { id: 7, name: 'MacBook Pro 16" M2 Max', price: 2499, discount: 0, category: 'apple', stock: 10, image: 'https://via.placeholder.com/400x300?text=MacBook+Pro' },
            { id: 8, name: 'Dell XPS 15', price: 1799, discount: 12, category: 'dell', stock: 6, image: 'https://via.placeholder.com/400x300?text=XPS+15' },
            { id: 9, name: 'HP Spectre x360', price: 1399, discount: 8, category: 'hp', stock: 9, image: 'https://via.placeholder.com/400x300?text=Spectre+x360' },
            { id: 10, name: 'Lenovo ThinkPad X1 Carbon', price: 1599, discount: 5, category: 'lenovo', stock: 7, image: 'https://via.placeholder.com/400x300?text=ThinkPad+X1' },
            { id: 11, name: 'MacBook Air M2', price: 1199, discount: 0, category: 'apple', stock: 15, image: 'https://via.placeholder.com/400x300?text=MacBook+Air' },
            { id: 12, name: 'ASUS ROG Zephyrus G14', price: 1499, discount: 10, category: 'asus', stock: 5, image: 'https://via.placeholder.com/400x300?text=ROG+Zephyrus' }
        ],
        desktops: [
            { id: 13, name: 'Alienware Aurora R15', price: 1999, discount: 15, category: 'gaming', stock: 4, image: 'https://via.placeholder.com/400x300?text=Alienware+Aurora' },
            { id: 14, name: 'Apple iMac 24"', price: 1299, discount: 0, category: 'all-in-one', stock: 8, image: 'https://via.placeholder.com/400x300?text=iMac+24' },
            { id: 15, name: 'Dell Precision 5860', price: 2899, discount: 8, category: 'workstation', stock: 3, image: 'https://via.placeholder.com/400x300?text=Precision+5860' },
            { id: 16, name: 'HP Envy 34" All-in-One', price: 1799, discount: 12, category: 'all-in-one', stock: 5, image: 'https://via.placeholder.com/400x300?text=Envy+34' },
            { id: 17, name: 'Corsair Vengeance i7400', price: 2299, discount: 10, category: 'gaming', stock: 6, image: 'https://via.placeholder.com/400x300?text=Vengeance+i7400' },
            { id: 18, name: 'Lenovo ThinkStation P620', price: 3499, discount: 5, category: 'workstation', stock: 2, image: 'https://via.placeholder.com/400x300?text=ThinkStation+P620' }
        ],
        phones: [
            { id: 19, name: 'iPhone 14 Pro Max', price: 1099, discount: 0, category: 'apple', stock: 20, image: 'https://via.placeholder.com/400x300?text=iPhone+14+Pro' },
            { id: 20, name: 'Samsung Galaxy S23 Ultra', price: 1199, discount: 8, category: 'samsung', stock: 15, image: 'https://via.placeholder.com/400x300?text=Galaxy+S23' },
            { id: 21, name: 'Google Pixel 7 Pro', price: 899, discount: 10, category: 'google', stock: 12, image: 'https://via.placeholder.com/400x300?text=Pixel+7+Pro' },
            { id: 22, name: 'OnePlus 11 5G', price: 799, discount: 5, category: 'oneplus', stock: 10, image: 'https://via.placeholder.com/400x300?text=OnePlus+11' },
            { id: 23, name: 'iPhone 13', price: 699, discount: 15, category: 'apple', stock: 18, image: 'https://via.placeholder.com/400x300?text=iPhone+13' },
            { id: 24, name: 'Samsung Galaxy Z Flip4', price: 999, discount: 12, category: 'samsung', stock: 7, image: 'https://via.placeholder.com/400x300?text=Galaxy+Z+Flip' }
        ]
    };

    // Cart data
    let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];
    let currentPage = 'tablets';

    // Initialize the app
    init();

    function init() {
        checkAuthStatus();
        updateCartCount();
        renderProducts('tablets');
        setupEventListeners();
        startRealTimeUpdates();
    }

    function setupEventListeners() {
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = this.dataset.page;
                showPage(currentPage);
                if (window.innerWidth <= 768) {
                    nav.classList.remove('show');
                }
            });
        });

        // Category links
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                renderProducts(currentPage, this.dataset.category);
            });
        });

        // Auth links
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });

        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'block';
        });

        // Close buttons
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Cart button
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
            renderCart();
        });

        // Login form
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                const user = {
                    name: email.split('@')[0],
                    email: email,
                    orders: []
                };
                
                localStorage.setItem('techstore_user', JSON.stringify(user));
                loginModal.style.display = 'none';
                this.reset();
                checkAuthStatus();
                showPage('profile');
            } else {
                document.getElementById('login-status').textContent = 'Please enter email and password';
                document.getElementById('login-status').className = 'error';
            }
        });

        // Register form
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            
            if (password !== confirm) {
                document.getElementById('register-status').textContent = 'Passwords do not match';
                document.getElementById('register-status').className = 'error';
                return;
            }
            
            if (name && email && password) {
                const user = {
                    name: name,
                    email: email,
                    orders: []
                };
                
                localStorage.setItem('techstore_user', JSON.stringify(user));
                registerModal.style.display = 'none';
                this.reset();
                checkAuthStatus();
                showPage('profile');
            } else {
                document.getElementById('register-status').textContent = 'Please fill all fields';
                document.getElementById('register-status').className = 'error';
            }
        });

        // Logout
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('techstore_user');
            checkAuthStatus();
            showPage('tablets');
        });

        // Checkout
        checkoutBtn.addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('techstore_user'));
            if (!user) {
                alert('Please login to checkout');
                loginModal.style.display = 'block';
                cartModal.style.display = 'none';
                return;
            }
            
            // Create order
            const order = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                items: [...cart],
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
            
            // Add to user's orders
            user.orders.push(order);
            localStorage.setItem('techstore_user', JSON.stringify(user));
            
            // Clear cart
            cart = [];
            localStorage.setItem('techstore_cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
            
            // Show success
            alert(`Order #${order.id} placed successfully! Total: $${order.total.toFixed(2)}`);
            cartModal.style.display = 'none';
            
            // Update profile if on profile page
            if (currentPage === 'profile') {
                renderUserOrders();
            }
        });
    }

    function checkAuthStatus() {
        const user = JSON.parse(localStorage.getItem('techstore_user'));
        if (user) {
            authLinks.style.display = 'none';
            profileLink.style.display = 'block';
            if (document.getElementById('profile-name')) {
                document.getElementById('profile-name').textContent = user.name;
                document.getElementById('profile-email').textContent = user.email;
            }
        } else {
            authLinks.style.display = 'block';
            profileLink.style.display = 'none';
        }
    }

    function showPage(page) {
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
        
        if (page === 'profile') {
            const user = JSON.parse(localStorage.getItem('techstore_user'));
            if (user) {
                renderUserOrders();
            } else {
                loginModal.style.display = 'block';
                showPage(currentPage);
            }
        } else {
            renderProducts(page);
        }
        
        currentPage = page;
    }

    function renderProducts(category, filter = 'all') {
        const grid = document.getElementById(`${category}-grid`);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products[category] 
            : products[category].filter(p => p.category === filter);
        
        filteredProducts.forEach(product => {
            const discountPrice = product.discount > 0 
                ? product.price * (1 - product.discount / 100) 
                : product.price;
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                ${product.discount > 0 ? `<span class="discount">-${product.discount}%</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">
                        $${discountPrice.toFixed(2)}
                        ${product.discount > 0 ? `<span style="text-decoration: line-through; color: #64748b; font-size: 14px; margin-left: 5px;">$${product.price.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </div>
                    <button class="btn add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            `;
            
            grid.appendChild(productCard);
        });
        
        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        // Find product in any category
        let product;
        for (const category in products) {
            product = products[category].find(p => p.id === productId);
            if (product) break;
        }
        
        if (!product) return;
        
        // Check if already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const discountPrice = product.discount > 0 
                ? product.price * (1 - product.discount / 100) 
                : product.price;
            
            cart.push({
                id: product.id,
                name: product.name,
                price: discountPrice,
                quantity: 1,
                image: product.image
            });
        }
        
        // Save to localStorage
        localStorage.setItem('techstore_cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        renderCart();
        
        // Show cart modal
        cartModal.style.display = 'block';
    }

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }

    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotal.textContent = 'Total: $0.00';
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeFromCart(productId);
            });
        });
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('techstore_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    function renderUserOrders() {
        const user = JSON.parse(localStorage.getItem('techstore_user'));
        const ordersList = document.getElementById('user-orders');
        
        if (!user || user.orders.length === 0) {
            ordersList.innerHTML = '<p>No orders yet</p>';
            return;
        }
        
        ordersList.innerHTML = '';
        
        user.orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <h4>Order #${order.id} - ${order.date}</h4>
                <p>Total: $${order.total.toFixed(2)}</p>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-product">
                            <img src="${item.image}" alt="${item.name}" width="50">
                            <span>${item.name} (${item.quantity} × $${item.price.toFixed(2)})</span>
                        </div>
                    `).join('')}
                </div>
            `;
            ordersList.appendChild(orderElement);
        });
    }

    function startRealTimeUpdates() {
        // Simulate real-time updates for statistics
        setInterval(() => {
            // Tablets stats
            document.getElementById('tablets-sold').textContent = 
                Math.floor(24 + Math.random() * 3);
            document.getElementById('tablets-discounts').textContent = 
                Math.floor(3 + Math.random() * 2);
            document.getElementById('tablets-new').textContent = 
                Math.floor(5 + Math.random() * 2);
            
            // Laptops stats
            document.getElementById('laptops-sold').textContent = 
                Math.floor(18 + Math.random() * 4);
            document.getElementById('laptops-discounts').textContent = 
                Math.floor(5 + Math.random() * 2);
            document.getElementById('laptops-new').textContent = 
                Math.floor(7 + Math.random() * 2);
            
            // Desktops stats
            document.getElementById('desktops-sold').textContent = 
                Math.floor(12 + Math.random() * 3);
            document.getElementById('desktops-discounts').textContent = 
                Math.floor(4 + Math.random() * 2);
            document.getElementById('desktops-custom').textContent = 
                Math.floor(9 + Math.random() * 3);
            
            // Phones stats
            document.getElementById('phones-sold').textContent = 
                Math.floor(42 + Math.random() * 5);
            document.getElementById('phones-discounts').textContent = 
                Math.floor(6 + Math.random() * 2);
            document.getElementById('phones-new').textContent = 
                Math.floor(3 + Math.random() * 2);
        }, 5000);
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});