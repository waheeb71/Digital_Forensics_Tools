
let currentFilter = {
    category: '',
    license: '',
    platform: '',
    search: ''
};

let currentPage = 1;
let itemsPerPage = 6;
let isLoading = false;
let allFilteredTools = [];

let navbar, navToggle, navMenu, loadingScreen, scrollToTopBtn;


document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});


function initializeApp() {
    console.log('🚀 Initializing Digital Forensics Tools Website...');
    
    try {
     
        if (typeof forensicsTools === 'undefined' || !forensicsTools) {
            console.error('❌ البيانات غير محملة بشكل صحيح');
            setTimeout(() => {
                if (typeof forensicsTools !== 'undefined') {
                    initializeApp();
                }
            }, 1000);
            return;
        }
        
       
        cacheDOMElements();
       
        initializeNavigation();
        initializeLoadingScreen();
        initializeCounters();
        initializeSearch();
        initializeScrollEffects();
        initializeAnimations();
        
      
        loadCategories();
        loadFeaturedTools();
        
      
        initializeIntersectionObserver();
        
      
        addResultsCounter();
        
        console.log('✅ Application initialized successfully!');
        
    } catch (error) {
        console.error('❌ خطأ في تهيئة التطبيق:', error);
    }
}


function cacheDOMElements() {
    navbar = document.getElementById('navbar');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    loadingScreen = document.getElementById('loading-screen');
    scrollToTopBtn = document.getElementById('scroll-to-top');
}


function addResultsCounter() {
    const toolsSection = document.getElementById('tools');
    if (toolsSection && !document.querySelector('.results-counter')) {
        const sectionHeader = toolsSection.querySelector('.section-header');
        if (sectionHeader) {
            const resultsCounter = document.createElement('div');
            resultsCounter.className = 'results-counter';
            resultsCounter.id = 'results-counter';
            resultsCounter.style.cssText = `
                text-align: center;
                margin: 16px 0;
                padding: 8px 16px;
                background: rgba(0, 255, 136, 0.1);
                border-radius: 4px;
                color: #333;
                font-weight: 600;
            `;
            sectionHeader.appendChild(resultsCounter);
        }
    }
}


function initializeLoadingScreen() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}


function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    if (!navMenu || !navToggle) return;
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active') 
            ? getHamburgerTransform(index) 
            : 'none';
    });
}

function getHamburgerTransform(index) {
    const transforms = [
        'rotate(45deg) translate(5px, 5px)',
        'opacity: 0',
        'rotate(-45deg) translate(7px, -6px)'
    ];
    return transforms[index] || 'none';
}


function handleNavClick(e) {
    e.preventDefault();
    
    const targetSection = e.target.getAttribute('data-section');
    if (targetSection) {
        scrollToSection(targetSection);
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
        
        if (navMenu && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}


function handleNavbarScroll() {
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
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


function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        const increment = target / 50;
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


function initializeSearch() {
    const searchInput = document.getElementById('global-search');
    const categoryFilter = document.getElementById('category-filter');
    const licenseFilter = document.getElementById('license-filter');
    const platformFilter = document.getElementById('platform-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('focus', showSearchSuggestions);
        searchInput.addEventListener('blur', () => {
            setTimeout(hideSearchSuggestions, 200);
        });
    }
    
    [categoryFilter, licenseFilter, platformFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', handleFilterChange);
        }
    });
}


function handleSearch(e) {
    currentFilter.search = e.target.value.toLowerCase().trim();
    updateSearchSuggestions(e.target.value);
    resetPaginationAndFilter();
}


function handleFilterChange(e) {
    const filterType = e.target.id.replace('-filter', '');
    currentFilter[filterType] = e.target.value;
    resetPaginationAndFilter();
}


function resetPaginationAndFilter() {
    currentPage = 1;
    filterAndDisplayTools();
}


function updateSearchSuggestions(query) {
    const suggestions = document.getElementById('search-suggestions');
    
    if (!suggestions || !query.trim()) {
        if (suggestions) {
            suggestions.innerHTML = '';
            suggestions.style.display = 'none';
        }
        return;
    }
    
    try {
        const matches = forensicsTools
            .filter(tool => 
                tool.name.toLowerCase().includes(query.toLowerCase()) ||
                tool.description.toLowerCase().includes(query.toLowerCase()) ||
                (tool.tags && tool.tags.some(tag => 
                    tag.toLowerCase().includes(query.toLowerCase())
                ))
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
            suggestions.innerHTML = '<div class="suggestion-item">لم يتم العثور على نتائج</div>';
            suggestions.style.display = 'block';
        }
    } catch (error) {
        console.error('خطأ في تحديث اقتراحات البحث:', error);
    }
}


function selectSuggestion(toolName) {
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.value = toolName;
        currentFilter.search = toolName.toLowerCase();
        resetPaginationAndFilter();
        hideSearchSuggestions();
    }
}

function showSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions && suggestions.innerHTML.trim()) {
        suggestions.style.display = 'block';
    }
}

function hideSearchSuggestions() {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions) {
        suggestions.style.display = 'none';
    }
}


function loadCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid || !categories) return;
    
    try {
        const categoryCards = categories.map(category => `
            <div class="category-card fade-in" data-category="${category.id}">
                <div class="category-header">
                    <div class="category-icon" style="color: ${category.color}">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="category-info">
                        <h3 class="category-name">${category.name}</h3>
                        <p class="category-name-en">${category.nameEn || ''}</p>
                    </div>
                    <div class="category-badge">
                        <span class="tools-count">${getToolsCountByCategory(category.id)}</span>
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
                            <img src="${category.image}" alt="${category.name}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
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
    } catch (error) {
        console.error('خطأ في تحميل التصنيفات:', error);
    }
}


function loadFeaturedTools() {
    const toolsGrid = document.getElementById('featured-tools');
    if (!toolsGrid || !forensicsTools) return;
    
    try {
       
        const featuredTools = forensicsTools.slice(0, 6);
        displayToolsInGrid(featuredTools, toolsGrid);
        
    
        updateResultsCounter(featuredTools.length);
        
    } catch (error) {
        console.error('خطأ في تحميل الأدوات المميزة:', error);
    }
}


function displayToolsInGrid(tools, container) {
    if (!tools || !container) return;
    
    const toolCards = tools.map((tool, index) => `
        <div class="tool-card fade-in" data-tool="${tool.id}" style="animation-delay: ${index * 0.1}s">
            <div class="tool-header">
                <div class="tool-image">
                    <img src="${tool.image}" alt="${tool.name}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
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
                    ${(tool.tags || []).slice(0, 3).map(tag => `
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
    
    container.innerHTML = toolCards;
}


function filterAndDisplayTools() {
    const toolsGrid = document.getElementById('featured-tools');
    if (!toolsGrid || !forensicsTools) return;
    
    try {
  
        let filteredTools = [...forensicsTools];
        
    
        if (currentFilter.category) {
            filteredTools = filteredTools.filter(tool => 
                tool.category === currentFilter.category
            );
        }
        
    
        if (currentFilter.license) {
            filteredTools = filteredTools.filter(tool => {
                const licenseType = getToolLicenseType(tool.type);
                return licenseType === currentFilter.license;
            });
        }
        
   
        if (currentFilter.platform) {
            filteredTools = filteredTools.filter(tool => 
                tool.platforms && tool.platforms.some(platform => 
                    platform.toLowerCase().includes(currentFilter.platform.toLowerCase())
                )
            );
        }
        
   
        if (currentFilter.search) {
            filteredTools = filteredTools.filter(tool => 
                tool.name.toLowerCase().includes(currentFilter.search) ||
                tool.description.toLowerCase().includes(currentFilter.search) ||
                (tool.tags && tool.tags.some(tag => 
                    tag.toLowerCase().includes(currentFilter.search)
                ))
            );
        }
        
     
        allFilteredTools = filteredTools;
        
   
        displayFilteredTools();
        
    } catch (error) {
        console.error('خطأ في فلترة الأدوات:', error);
    }
}


function displayFilteredTools() {
    const toolsGrid = document.getElementById('featured-tools');
    if (!toolsGrid) return;
    
   
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const toolsToDisplay = allFilteredTools.slice(startIndex, endIndex);
    
    if (toolsToDisplay.length === 0) {
        showNoResultsMessage(toolsGrid);
        updateResultsCounter(0);
        hideLoadMoreButton();
        return;
    }
    
 
    displayToolsInGrid(toolsToDisplay, toolsGrid);
   
const cards = toolsGrid.querySelectorAll('.tool-card');
cards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
});

    
   
    updateResultsCounter(allFilteredTools.length);
    
   
    toggleLoadMoreButton();
}


function showNoResultsMessage(container) {
    container.innerHTML = `
        <div class="no-results" style="
            grid-column: 1 / -1;
            text-align: center;
            padding: 40px 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            border: 2px dashed #ccc;
        ">
            <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
            <h3 style="color: #666; margin-bottom: 8px;">لم يتم العثور على نتائج</h3>
            <p style="color: #888;">جرب البحث بكلمات مفتاحية مختلفة أو قم بتغيير المرشحات</p>
            <button onclick="clearAllFilters()" style="
                margin-top: 16px;
                padding: 8px 16px;
                background: #00ff88;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">
                مسح جميع المرشحات
            </button>
        </div>
    `;
}


function clearAllFilters() {
    
    currentFilter = {
        category: '',
        license: '',
        platform: '',
        search: ''
    };
    
   
    const searchInput = document.getElementById('global-search');
    if (searchInput) searchInput.value = '';
    
    const filters = ['category-filter', 'license-filter', 'platform-filter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) filter.value = '';
    });
    
   
    currentPage = 1;
    loadFeaturedTools();
}


function updateResultsCounter(count) {
    const counter = document.getElementById('results-counter');
    if (counter) {
        if (count === 0) {
            counter.textContent = 'لا توجد نتائج';
            counter.style.background = 'rgba(255, 71, 87, 0.1)';
            counter.style.color = '#ff4757';
        } else {
            counter.textContent = `تم العثور على ${count} أداة`;
            counter.style.background = 'rgba(0, 255, 136, 0.1)';
            counter.style.color = '#3a0fe7ff';
        }
    }
}


function toggleLoadMoreButton() {
    const loadBtn = document.querySelector('.load-more-btn');
    if (!loadBtn) return;
    
    const hasMoreTools = (currentPage * itemsPerPage) < allFilteredTools.length;
    
    if (hasMoreTools) {
        loadBtn.style.display = 'block';
        loadBtn.disabled = false;
    } else {
        loadBtn.style.display = 'none';
    }
}


function hideLoadMoreButton() {
    const loadBtn = document.querySelector('.load-more-btn');
    if (loadBtn) {
        loadBtn.style.display = 'none';
    }
}


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

// دالة استكشاف التصنيف - مُصححة
function exploreCategory(categoryId) {
    // تحديث المرشح
    currentFilter.category = categoryId;
    currentPage = 1;
    
    // تحديث قائمة التصنيفات
    const categorySelect = document.getElementById('category-filter');
    if (categorySelect) {
        categorySelect.value = categoryId;
    }
    
    // فلترة وعرض الأدوات
    filterAndDisplayTools();
    
    // التمرير إلى قسم الأدوات
    scrollToSection('tools');
}
// ✅ دالة استعراض جميع التصنيفات
function exploreAllCategories() {
    // إعادة تعيين الفلتر
    currentFilter.category = '';
    currentPage = 1;

    // إعادة قيمة القائمة المنسدلة
    const categorySelect = document.getElementById('category-filter');
    if (categorySelect) {
        categorySelect.value = '';
    }

    // عرض جميع الأدوات
    filterAndDisplayTools();

    // التمرير إلى قسم الأدوات
    scrollToSection('tools');
}
window.exploreAllCategories = exploreAllCategories;

// عرض تفاصيل الأداة
// افترض أن لديك كائنات الأدوات في forensicsTools

function showToolDetails(toolId) {
    const tool = forensicsTools.find(t => t.id === toolId);
    if (!tool) return;

    const modal = document.getElementById('tool-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
       <h2 style="color:black; text-align:center;">${tool.name}</h2>

        <img src="${tool.image}" alt="${tool.name}" style="width:100%; max-height:200px; object-fit:contain; border-radius:8px; margin-bottom:15px;">
        <p style="color:black">${tool.description}</p>
        <div style="color:black">
            <strong style="color:black">النوع:</strong> ${tool.type}<br>
            <strong style="color:black">المنصات:</strong> ${tool.platforms.join(', ')}<br>
            <strong style="color:black">التقييم:</strong> ⭐ ${tool.rating || 'N/A'}<br>
            <strong style="color:black">السعر:</strong> ${tool.price}
        </div>
        <div style="margin-top:15px;">
            <a href="${tool.downloadUrl}" target="_blank" class="download-btn primary">
                <i class="fas fa-download"></i> تحميل
            </a>
        </div>
    `;

    modal.style.display = 'block';

    // إغلاق عند الضغط على ×
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => { modal.style.display = 'none'; }

    // إغلاق عند الضغط خارج الصندوق
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}


// حساب عدد الأدوات لكل تصنيف
function getToolsCountByCategory(categoryId) {
    if (!forensicsTools) return 0;
    return forensicsTools.filter(tool => tool.category === categoryId).length;
}

// Utility Functions - مُحدثة
function getCategoryIcon(categoryId) {
    if (!categories) return 'fas fa-tools';
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
    if (!rating || isNaN(rating)) return '';
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
   
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

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


window.exploreCategory = exploreCategory;

window.loadMoreTools = loadMoreTools;
window.selectSuggestion = selectSuggestion;
window.clearAllFilters = clearAllFilters;


function initializeScrollEffects() {
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
   
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}


function initializeAnimations() {
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
    
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

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
