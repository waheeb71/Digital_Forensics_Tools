// ===== MAIN APPLICATION LOGIC =====

// Global State
let currentFilter = {
    category: '',
    license: '',
    platform: '',
    search: ''
};

let currentPage = 1;
let itemsPerPage = 6;
let isLoading = false;

// DOM Elements
let navbar, navToggle, navMenu, loadingScreen, scrollToTopBtn;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App Function
function initializeApp() {
    console.log('🚀 Initializing Digital Forensics Tools Website...');
    
    // Cache DOM elements
    cacheDOMElements();
    
    // Initialize components
    initializeNavigation();
    initializeLoadingScreen();
    initializeCounters();
    initializeSearch();
    initializeScrollEffects();
    initializeAnimations();
    
    // Load content
    loadCategories();
    loadFeaturedTools();
    
    // Initialize intersection observer
    initializeIntersectionObserver();
    
    console.log('✅ Application initialized successfully!');
}

// Cache DOM Elements
function cacheDOMElements() {
    navbar = document.getElementById('navbar');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    loadingScreen = document.getElementById('loading-screen');
    scrollToTopBtn = document.getElementById('scroll-to-top');
}

// Initialize Loading Screen
function initializeLoadingScreen() {
    // Simulate loading time
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
}

// Initialize Navigation
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Scroll effect for navbar
    window.addEventListener('scroll', handleNavbarScroll);
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active') 
            ? getHamburgerTransform(index) 
            : 'none';
    });
}

// Get hamburger animation transform
function getHamburgerTransform(index) {
    const transforms = [
        'rotate(45deg) translate(5px, 5px)',
        'opacity: 0',
        'rotate(-45deg) translate(7px, -6px)'
    ];
    return transforms[index] || 'none';
}

// Handle Navigation Click
function handleNavClick(e) {
    e.preventDefault();
    
    const targetSection = e.target.getAttribute('data-section');
    if (targetSection) {
        scrollToSection(targetSection);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Handle Navbar Scroll
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    }
}

// Initialize Counters Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('global-search');
    const categoryFilter = document.getElementById('category-filter');
    const licenseFilter = document.getElementById('license-filter');
    const platformFilter = document.getElementById('platform-filter');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', showSearchSuggestions);
        searchInput.addEventListener('blur', hideSearchSuggestions);
    }
    
    [categoryFilter, licenseFilter, platformFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', handleFilterChange);
        }
    });
}

// Handle Search Input
function handleSearch(e) {
    currentFilter.search = e.target.value.toLowerCase();
    debounce(() => {
        updateSearchSuggestions(e.target.value);
        filterAndDisplayTools();
    }, 300)();
}

// Handle Filter Change
function handleFilterChange(e) {
    const filterType = e.target.id.replace('-filter', '');
    currentFilter[filterType] = e.target.value;
    filterAndDisplayTools();
}

// Update Search Suggestions
function updateSearchSuggestions(query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions || !query.trim()) {
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
        return;
    }
    
    const matches = forensicsTools
        .filter(tool => 
            tool.name.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches
            .map(tool => `
                <div class="suggestion-item" onclick="selectSuggestion('${tool.name}')">
                    <i class="${getCategoryIcon(tool.category)}"></i>
                    <span>${tool.name}</span>
                    <small>${tool.description.substring(0, 50)}...</small>
                </div>
            `).join('');
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}

// Select Search Suggestion
function selectSuggestion(toolName) {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.value = toolName;
        currentFilter.search = toolName.toLowerCase();
        filterAndDisplayTools();
        hideSearchSuggestions();
    }
}

// Show/Hide Search Suggestions
function showSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions && suggestions.innerHTML.trim()) {
        suggestions.style.display = 'block';
    }
}

function hideSearchSuggestions() {
    setTimeout(() => {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }, 200);
}

// Load Categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;
    
    const categoryCards = categories.map(category => `
        <div class="category-card fade-in" data-category="${category.id}">
            <div class="category-header">
                <div class="category-icon" style="color: ${category.color}">
                    <i class="${category.icon}"></i>
                </div>
                <div class="category-info">
                    <h3 class="category-name">${category.name}</h3>
                    <p class="category-name-en">${category.nameEn}</p>
                </div>
                <div class="category-badge">
                    <span class="tools-count">${category.toolsCount}</span>
                    <small>أداة</small>
                </div>
            </div>
            
            <div class="category-body">
                <p class="category-description">${category.description}</p>
                
                <div class="category-meta">
                    <div class="difficulty-badge ${getDifficultyClass(category.difficulty)}">
                        <i class="fas fa-signal"></i>
                        ${category.difficulty}
                    </div>
                    
                    <div class="category-image">
                        <img src="${category.image}" alt="${category.name}" loading="lazy">
                    </div>
                </div>
            </div>
            
            <div class="category-footer">
                <button class="explore-btn" onclick="exploreCategory('${category.id}')">
                    <i class="fas fa-arrow-left"></i>
                    استكشف الأدوات
                </button>
            </div>
        </div>
    `).join('');
    
    categoriesGrid.innerHTML = categoryCards;
}

// Load Featured Tools
function loadFeaturedTools() {
    const toolsGrid = document.getElementById('featured-tools');
    if (!toolsGrid) return;
    
    // Get featured tools (first 6 tools)
    const featuredTools = forensicsTools.slice(0, 6);
    
    const toolCards = featuredTools.map((tool, index) => `
        <div class="tool-card fade-in stagger-${(index % 6) + 1}" data-tool="${tool.id}">
            <div class="tool-header">
                <div class="tool-image">
                    <img src="${tool.image}" alt="${tool.name}" loading="lazy">
                    <div class="tool-overlay">
                        <div class="tool-type ${getTypeClass(tool.type)}">
                            ${tool.type}
                        </div>
                    </div>
                </div>
                
                <div class="tool-rating">
                    <div class="stars">
                        ${generateStars(tool.rating)}
                    </div>
                    <span class="rating-number">${tool.rating}</span>
                </div>
            </div>
            
            <div class="tool-body">
                <h3 class="tool-name">${tool.name}</h3>
                <p class="tool-description">${tool.description}</p>
                
                <div class="tool-platforms">
                    ${tool.platforms.map(platform => `
                        <span class="platform-badge">
                            <i class="${getPlatformIcon(platform)}"></i>
                            ${platform}
                        </span>
                    `).join('')}
                </div>
                
                <div class="tool-tags">
                    ${tool.tags.slice(0, 3).map(tag => `
                        <span class="tool-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="tool-footer">
                <div class="tool-meta">
                    <span class="tool-price">${tool.price}</span>
                    <span class="tool-downloads">${tool.downloads}</span>
                </div>
                
                <div class="tool-actions">
                    <a href="${tool.downloadUrl}" target="_blank" class="download-btn primary">
                        <i class="fas fa-download"></i>
                        تحميل
                    </a>
                    <button class="info-btn" onclick="showToolDetails('${tool.id}')">
                        <i class="fas fa-info-circle"></i>
                        التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    toolsGrid.innerHTML = toolCards;
}

// Filter and Display Tools
function filterAndDisplayTools() {
    const toolsGrid = document.getElementById('featured-tools');
    if (!toolsGrid) return;
    
    let filteredTools = forensicsTools;
    
    // Apply filters
    if (currentFilter.category) {
        filteredTools = filteredTools.filter(tool => 
            tool.category === currentFilter.category
        );
    }
    
    if (currentFilter.license) {
        filteredTools = filteredTools.filter(tool => 
            getToolLicenseType(tool.type) === currentFilter.license
        );
    }
    
    if (currentFilter.platform) {
        filteredTools = filteredTools.filter(tool => 
            tool.platforms.some(platform => 
                platform.toLowerCase().includes(currentFilter.platform.toLowerCase())
            )
        );
    }
    
    if (currentFilter.search) {
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(currentFilter.search) ||
            tool.description.toLowerCase().includes(currentFilter.search) ||
            tool.tags.some(tag => tag.toLowerCase().includes(currentFilter.search))
        );
    }
    
    // Display filtered tools
    displayTools(filteredTools);
    
    // Update results counter
    updateResultsCounter(filteredTools.length);
}

// Display Tools
function displayTools(tools) {
    const toolsGrid = document.getElementById('featured-tools');
    if (!toolsGrid) return;
    
    if (tools.length === 0) {
        toolsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لم يتم العثور على نتائج</h3>
                <p>جرب البحث بكلمات مفتاحية مختلفة أو قم بتغيير المرشحات</p>
            </div>
        `;
        return;
    }
    
    const toolCards = tools.slice(0, currentPage * itemsPerPage).map((tool, index) => `
        <div class="tool-card fade-in" data-tool="${tool.id}" style="animation-delay: ${index * 0.1}s">
            <div class="tool-header">
                <div class="tool-image">
                    <img src="${tool.image}" alt="${tool.name}" loading="lazy">
                    <div class="tool-overlay">
                        <div class="tool-type ${getTypeClass(tool.type)}">
                            ${tool.type}
                        </div>
                    </div>
                </div>
                
                <div class="tool-rating">
                    <div class="stars">
                        ${generateStars(tool.rating)}
                    </div>
                    <span class="rating-number">${tool.rating}</span>
                </div>
            </div>
            
            <div class="tool-body">
                <h3 class="tool-name">${tool.name}</h3>
                <p class="tool-description">${tool.description}</p>
                
                <div class="tool-platforms">
                    ${tool.platforms.map(platform => `
                        <span class="platform-badge">
                            <i class="${getPlatformIcon(platform)}"></i>
                            ${platform}
                        </span>
                    `).join('')}
                </div>
                
                <div class="tool-tags">
                    ${tool.tags.slice(0, 3).map(tag => `
                        <span class="tool-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="tool-footer">
                <div class="tool-meta">
                    <span class="tool-price">${tool.price}</span>
                    <span class="tool-downloads">${tool.downloads}</span>
                </div>
                
                <div class="tool-actions">
                    <a href="${tool.downloadUrl}" target="_blank" class="download-btn primary">
                        <i class="fas fa-download"></i>
                        تحميل
                    </a>
                    <button class="info-btn" onclick="showToolDetails('${tool.id}')">
                        <i class="fas fa-info-circle"></i>
                        التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    toolsGrid.innerHTML = toolCards;
}

// Utility Functions
function getCategoryIcon(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : 'fas fa-tools';
}

function getDifficultyClass(difficulty) {
    const classes = {
        'مبتدئ': 'difficulty-beginner',
        'متوسط': 'difficulty-intermediate', 
        'متقدم': 'difficulty-advanced',
        'متخصص': 'difficulty-expert'
    };
    return classes[difficulty] || 'difficulty-intermediate';
}

function getTypeClass(type) {
    const classes = {
        'مفتوح المصدر': 'type-open-source',
        'مجاني': 'type-free',
        'تجاري': 'type-commercial'
    };
    return classes[type] || 'type-free';
}

function getToolLicenseType(type) {
    const mapping = {
        'مفتوح المصدر': 'open-source',
        'مجاني': 'free',
        'تجاري': 'commercial'
    };
    return mapping[type] || 'free';
}

function getPlatformIcon(platform) {
    const icons = {
        'Windows': 'fab fa-windows',
        'Linux': 'fab fa-linux',
        'macOS': 'fab fa-apple',
        'Web': 'fas fa-globe',
        'Android': 'fab fa-android',
        'iOS': 'fab fa-apple'
    };
    return icons[platform] || 'fas fa-desktop';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Global Functions for HTML onclick events
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

window.exploreCategory = function(categoryId) {
    currentFilter.category = categoryId;
    filterAndDisplayTools();
    scrollToSection('tools');
    
    // Update category filter select
    const categorySelect = document.getElementById('category-filter');
    if (categorySelect) {
        categorySelect.value = categoryId;
    }
};

window.showToolDetails = function(toolId) {
    const tool = forensicsTools.find(t => t.id === toolId);
    if (tool) {
        // Create modal or redirect to detail page
        alert(`تفاصيل ${tool.name}:\n\n${tool.description}\n\nالميزات:\n${tool.features.join('\n• ')}`);
    }
};

window.loadMoreTools = function() {
    if (isLoading) return;
    
    isLoading = true;
    currentPage++;
    
    // Show loading state
    const loadBtn = document.querySelector('.load-more-btn');
    if (loadBtn) {
        loadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    }
    
    setTimeout(() => {
        filterAndDisplayTools();
        isLoading = false;
        
        if (loadBtn) {
            loadBtn.innerHTML = '<i class="fas fa-plus"></i> عرض المزيد من الأدوات';
        }
    }, 1000);
};

// Initialize Scroll Effects
function initializeScrollEffects() {
    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Initialize Animations
function initializeAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = getInitialTransform(el);
    });
}

function getInitialTransform(element) {
    if (element.classList.contains('slide-in-left')) {
        return 'translateX(-50px)';
    } else if (element.classList.contains('slide-in-right')) {
        return 'translateX(50px)';
    } else if (element.classList.contains('scale-in')) {
        return 'scale(0.8)';
    } else {
        return 'translateY(30px)';
    }
}

// Initialize Intersection Observer
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update Results Counter
function updateResultsCounter(count) {
    const counter = document.querySelector('.results-counter');
    if (counter) {
        counter.textContent = `تم العثور على ${count} أداة`;
    }
}