

class AdvancedSearch {
    constructor() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        this.searchSuggestions = [];
        this.currentResults = [];
        this.searchAnalytics = {
            totalSearches: parseInt(localStorage.getItem('totalSearches') || '0'),
            popularTerms: JSON.parse(localStorage.getItem('popularTerms') || '{}')
        };
        
        this.initializeSearch();
    }

    initializeSearch() {
        this.createSearchIndex();
        this.setupEventListeners();
        this.loadSearchHistory();
    }

    
    createSearchIndex() {
        this.searchIndex = {
            tools: {},
            categories: {},
            tags: {},
            features: {}
        };

       
        forensicsTools.forEach(tool => {
            // Index by name
            const nameTokens = this.tokenize(tool.name);
            nameTokens.forEach(token => {
                if (!this.searchIndex.tools[token]) {
                    this.searchIndex.tools[token] = [];
                }
                this.searchIndex.tools[token].push({
                    ...tool,
                    relevance: 10 
                });
            });

          
            const descTokens = this.tokenize(tool.description);
            descTokens.forEach(token => {
                if (!this.searchIndex.tools[token]) {
                    this.searchIndex.tools[token] = [];
                }
                this.searchIndex.tools[token].push({
                    ...tool,
                    relevance: 5 
                });
            });

           
            tool.tags.forEach(tag => {
                const tagTokens = this.tokenize(tag);
                tagTokens.forEach(token => {
                    if (!this.searchIndex.tags[token]) {
                        this.searchIndex.tags[token] = [];
                    }
                    this.searchIndex.tags[token].push({
                        ...tool,
                        relevance: 7 
                    });
                });
            });

          
            tool.features.forEach(feature => {
                const featureTokens = this.tokenize(feature);
                featureTokens.forEach(token => {
                    if (!this.searchIndex.features[token]) {
                        this.searchIndex.features[token] = [];
                    }
                    this.searchIndex.features[token].push({
                        ...tool,
                        relevance: 6 
                    });
                });
            });
        });

     
        categories.forEach(category => {
            const nameTokens = this.tokenize(category.name);
            const descTokens = this.tokenize(category.description);
            
            [...nameTokens, ...descTokens].forEach(token => {
                if (!this.searchIndex.categories[token]) {
                    this.searchIndex.categories[token] = [];
                }
                this.searchIndex.categories[token].push({
                    ...category,
                    type: 'category',
                    relevance: 8
                });
            });
        });
    }

   
    tokenize(text) {
        if (!text) return [];
        
        return text.toLowerCase()
            .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ') 
            .split(/\s+/)
            .filter(token => token.length > 1)
            .map(token => token.trim());
    }

    // Setup event listeners
    setupEventListeners() {
        const searchInput = document.getElementById('global-search');
        const searchSuggestions = document.getElementById('search-suggestions');
        
        if (searchInput) {
          
            searchInput.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));

            // Handle search suggestions
            searchInput.addEventListener('focus', () => {
                this.showSearchHistory();
            });

            searchInput.addEventListener('keydown', (e) => {
                this.handleKeyNavigation(e);
            });
        }

        // Voice search (if supported)
        if ('webkitSpeechRecognition' in window) {
            this.initializeVoiceSearch();
        }
    }

    // Perform advanced search
    performSearch(query, filters = {}) {
        if (!query.trim()) {
            this.hideSearchResults();
            return;
        }

        // Track search analytics
        this.trackSearch(query);

        // Tokenize search query
        const searchTokens = this.tokenize(query);
        let allResults = [];

        // Search in different indexes
        searchTokens.forEach(token => {
            // Search tools
            if (this.searchIndex.tools[token]) {
                allResults.push(...this.searchIndex.tools[token]);
            }

            // Search tags
            if (this.searchIndex.tags[token]) {
                allResults.push(...this.searchIndex.tags[token]);
            }

            // Search features
            if (this.searchIndex.features[token]) {
                allResults.push(...this.searchIndex.features[token]);
            }

            // Search categories
            if (this.searchIndex.categories[token]) {
                allResults.push(...this.searchIndex.categories[token]);
            }
        });

        // Remove duplicates and calculate relevance scores
        const uniqueResults = this.processSearchResults(allResults, query);

        // Apply additional filters
        const filteredResults = this.applyFilters(uniqueResults, filters);

        // Update search suggestions
        this.updateSearchSuggestions(query, filteredResults);

        // Display results
        this.displaySearchResults(filteredResults, query);

        // Save to search history
        this.saveToSearchHistory(query);

        this.currentResults = filteredResults;
        return filteredResults;
    }

    // Process and rank search results
    processSearchResults(results, originalQuery) {
        const resultMap = new Map();

        results.forEach(result => {
            const key = result.id || result.name;
            
            if (resultMap.has(key)) {
                // Increase relevance for multiple matches
                const existing = resultMap.get(key);
                existing.relevance += result.relevance;
                existing.matchCount = (existing.matchCount || 1) + 1;
            } else {
                resultMap.set(key, {
                    ...result,
                    matchCount: 1,
                    exactMatch: this.isExactMatch(result, originalQuery)
                });
            }
        });

        // Sort by relevance and exact matches
        return Array.from(resultMap.values())
            .sort((a, b) => {
                // Prioritize exact matches
                if (a.exactMatch && !b.exactMatch) return -1;
                if (!a.exactMatch && b.exactMatch) return 1;
                
                // Then by relevance score
                if (a.relevance !== b.relevance) {
                    return b.relevance - a.relevance;
                }
                
                // Finally by match count
                return b.matchCount - a.matchCount;
            })
            .slice(0, 20); // Limit results
    }

    // Check if result is exact match
    isExactMatch(result, query) {
        const queryLower = query.toLowerCase();
        return result.name.toLowerCase().includes(queryLower) ||
               result.description.toLowerCase().includes(queryLower);
    }

    // Apply additional filters
    applyFilters(results, filters) {
        let filtered = [...results];

        if (filters.category) {
            filtered = filtered.filter(item => 
                item.category === filters.category || 
                item.id === filters.category
            );
        }

        if (filters.type) {
            filtered = filtered.filter(item => 
                item.type === filters.type
            );
        }

        if (filters.platform) {
            filtered = filtered.filter(item => 
                item.platforms && item.platforms.some(platform => 
                    platform.toLowerCase().includes(filters.platform.toLowerCase())
                )
            );
        }

        if (filters.difficulty) {
            filtered = filtered.filter(item => 
                item.difficulty === filters.difficulty
            );
        }

        if (filters.priceRange) {
            filtered = filtered.filter(item => 
                this.isInPriceRange(item.price, filters.priceRange)
            );
        }

        return filtered;
    }

    // Check if item is in price range
    isInPriceRange(price, range) {
        if (range === 'free') {
            return price === 'مجاني' || price.includes('مجان');
        }
        if (range === 'commercial') {
            return price !== 'مجاني' && !price.includes('مجان');
        }
        return true;
    }

    // Update search suggestions
    updateSearchSuggestions(query, results) {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions) return;

        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }

        const suggestionItems = results.slice(0, 5).map(item => {
            const isCategory = item.type === 'category';
            
            return `
                <div class="suggestion-item" onclick="advancedSearch.selectSuggestion('${item.name}', '${item.id}', ${isCategory})">
                    <div class="suggestion-icon">
                        <i class="${isCategory ? item.icon : this.getCategoryIcon(item.category)}"></i>
                    </div>
                    <div class="suggestion-content">
                        <div class="suggestion-title">${item.name}</div>
                        <div class="suggestion-description">${item.description.substring(0, 60)}...</div>
                        ${!isCategory ? `<div class="suggestion-meta">
                            <span class="suggestion-type">${item.type}</span>
                            <span class="suggestion-rating">⭐ ${item.rating || 'N/A'}</span>
                        </div>` : ''}
                    </div>
                    <div class="suggestion-arrow">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                </div>
            `;
        }).join('');

        suggestions.innerHTML = `
            <div class="suggestions-header">
                <span>نتائج البحث (${results.length})</span>
                <button onclick="advancedSearch.clearSearch()" class="clear-search-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="suggestions-list">
                ${suggestionItems}
            </div>
            ${results.length > 5 ? `
                <div class="suggestions-footer">
                    <button onclick="advancedSearch.showAllResults()" class="show-all-btn">
                        عرض جميع النتائج (${results.length})
                    </button>
                </div>
            ` : ''}
        `;

        suggestions.style.display = 'block';
    }

    // Show no results message
    showNoResults(query) {
        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions) return;

        const alternativeQueries = this.generateAlternativeQueries(query);
        
        suggestions.innerHTML = `
            <div class="no-results-container">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <div class="no-results-content">
                    <h4>لم يتم العثور على نتائج</h4>
                    <p>جرب البحث عن: "${query}"</p>
                    ${alternativeQueries.length > 0 ? `
                        <div class="alternative-queries">
                            <span>اقتراحات:</span>
                            ${alternativeQueries.map(alt => `
                                <button class="alt-query-btn" onclick="advancedSearch.searchAlternative('${alt}')">
                                    ${alt}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        suggestions.style.display = 'block';
    }

    // Generate alternative search queries
    generateAlternativeQueries(query) {
        const alternatives = [];
        const synonyms = {
            'تحليل': ['فحص', 'دراسة', 'تحقيق'],
            'أدوات': ['برامج', 'تطبيقات', 'أنظمة'],
            'جنائي': ['أمني', 'قانوني', 'تحقيقي'],
            'رقمي': ['إلكتروني', 'تقني', 'حاسوبي'],
            'شبكة': ['إنترنت', 'اتصالات', 'شبكات'],
            'هاتف': ['محمول', 'جوال', 'موبايل']
        };

        const queryTokens = this.tokenize(query);
        queryTokens.forEach(token => {
            if (synonyms[token]) {
                synonyms[token].forEach(synonym => {
                    const altQuery = query.replace(token, synonym);
                    if (altQuery !== query) {
                        alternatives.push(altQuery);
                    }
                });
            }
        });

        return alternatives.slice(0, 3);
    }

    // Select search suggestion
   // تحديد اقتراح البحث عند الضغط عليه
selectSuggestion(name, id, isCategory = false) {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    // 1️⃣ ضع الاسم في خانة البحث
    searchInput.value = name;

    // 2️⃣ نفّذ البحث بعد تحديث القيمة مباشرة
    setTimeout(() => {
        const results = this.performSearch(name);
        if (results.length === 0) {
            this.showNoResults(name);
        }
    }, 50); // تأخير بسيط لضمان تحديث DOM

    // 3️⃣ إذا كان اقتراح تصنيف، اعرضه
    if (isCategory && typeof window.exploreCategory === 'function') {
        window.exploreCategory(id);
    }

    // 4️⃣ إخفاء قائمة الاقتراحات
    this.hideSearchSuggestions();
}


    // Search alternative query
    searchAlternative(query) {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.value = query;

    setTimeout(() => {
        const results = this.performSearch(query);
        if (results.length === 0) {
            this.showNoResults(query);
        }
    }, 50);

    this.hideSearchSuggestions();
}


    // Show all search results
    showAllResults() {
        this.displaySearchResults(this.currentResults, 
            document.getElementById('global-search').value, true);
        this.hideSearchSuggestions();
        window.scrollToSection('tools');
    }

    // Clear search
    clearSearch() {
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        this.hideSearchSuggestions();
        // Reset filters and show all tools
        currentFilter = { category: '', license: '', platform: '', search: '' };
        loadFeaturedTools();
    }

    // Display search results in main content area
    displaySearchResults(results, query, showAll = false) {
        const toolsGrid = document.getElementById('featured-tools');
        if (!toolsGrid) return;

        // Filter only tools (not categories)
        const toolResults = results.filter(item => item.id && !item.type);
        
        if (toolResults.length === 0) {
            toolsGrid.innerHTML = `
                <div class="no-results-main">
                    <i class="fas fa-search cyber-icon"></i>
                    <h3>لم يتم العثور على أدوات</h3>
                    <p>لم نتمكن من العثور على أدوات تطابق بحثك: "${query}"</p>
                    <button class="cta-button secondary" onclick="advancedSearch.clearSearch()">
                        <i class="fas fa-undo"></i>
                        مسح البحث
                    </button>
                </div>
            `;
            return;
        }

        const displayCount = showAll ? toolResults.length : Math.min(6, toolResults.length);
        const toolsToShow = toolResults.slice(0, displayCount);

        const toolCards = toolsToShow.map((tool, index) => `
            <div class="tool-card search-result fade-in" data-tool="${tool.id}" 
                 style="animation-delay: ${index * 0.1}s">
                <div class="search-score">
                    <span class="relevance-badge">
                        ${this.getRelevanceText(tool.relevance)}
                    </span>
                </div>
                
                <div class="tool-header">
                    <div class="tool-image">
                        <img src="${tool.image}" alt="${tool.name}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
                        <div class="tool-overlay">
                            <div class="tool-type ${this.getTypeClass(tool.type)}">
                                ${tool.type}
                            </div>
                        </div>
                    </div>
                    
                    <div class="tool-rating">
                        <div class="stars">
                            ${this.generateStars(tool.rating)}
                        </div>
                        <span class="rating-number">${tool.rating}</span>
                    </div>
                </div>
                
                <div class="tool-body">
                    <h3 class="tool-name">${this.highlightSearchTerm(tool.name, query)}</h3>
                    <p class="tool-description">${this.highlightSearchTerm(tool.description, query)}</p>
                    
                    <div class="tool-platforms">
                        ${tool.platforms.map(platform => `
                            <span class="platform-badge">
                                <i class="${this.getPlatformIcon(platform)}"></i>
                                ${platform}
                            </span>
                        `).join('')}
                    </div>
                    
                    <div class="tool-tags">
                        ${tool.tags.slice(0, 3).map(tag => `
                            <span class="tool-tag">${this.highlightSearchTerm(tag, query)}</span>
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

        // Manually trigger the animation for the new cards since they are dynamically added
        const newToolCards = toolsGrid.querySelectorAll('.tool-card');
        newToolCards.forEach(card => {
            // A small delay to ensure the browser registers the elements before adding the class
            setTimeout(() => {
                card.classList.add('visible');
            }, 10);
        });

        // Remove existing search header to prevent duplicates
        const existingHeader = document.querySelector('.search-results-header');
        if (existingHeader) {
            existingHeader.remove();
        }

        // Add search results header
        const searchHeader = `
            <div class="search-results-header">
                <h3>نتائج البحث عن: "${query}"</h3>
                <p>تم العثور على ${toolResults.length} أداة</p>
            </div>
        `;
        
        toolsGrid.insertAdjacentHTML('beforebegin', searchHeader);
    }

    // Highlight search terms in text
    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm || !text) return text;
        
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Get relevance text based on score
    getRelevanceText(relevance) {
        if (relevance >= 15) return 'مطابقة تامة';
        if (relevance >= 10) return 'مطابقة عالية';
        if (relevance >= 7) return 'مطابقة جيدة';
        return 'مطابقة متوسطة';
    }

    // Handle keyboard navigation in search
    handleKeyNavigation(e) {
        const suggestions = document.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateSuggestions(suggestions, e.key === 'ArrowDown');
        } else if (e.key === 'Enter') {
            const activeSuggestion = document.querySelector('.suggestion-item.active');
            if (activeSuggestion) {
                activeSuggestion.click();
            }
        } else if (e.key === 'Escape') {
            this.hideSearchSuggestions();
        }
    }

    // Navigate search suggestions with arrow keys
    navigateSuggestions(suggestions, isDown) {
        const active = document.querySelector('.suggestion-item.active');
        let newIndex = 0;

        if (active) {
            const currentIndex = Array.from(suggestions).indexOf(active);
            active.classList.remove('active');
            
            if (isDown) {
                newIndex = currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0;
            } else {
                newIndex = currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1;
            }
        }

        if (suggestions[newIndex]) {
            suggestions[newIndex].classList.add('active');
        }
    }

    // Initialize voice search
   
    // Start voice recognition
    startVoiceRecognition() {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'ar-SA'; // Arabic language
        recognition.continuous = false;
        recognition.interimResults = false;

        const voiceBtn = document.querySelector('.voice-search-btn');
        
        recognition.onstart = () => {
            voiceBtn.classList.add('listening');
            voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const searchInput = document.getElementById('global-search');
            
            if (searchInput) {
                searchInput.value = transcript;
                this.performSearch(transcript);
            }
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            voiceBtn.classList.remove('listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };

        recognition.start();
    }

    // Track search analytics
    trackSearch(query) {
        this.searchAnalytics.totalSearches++;
        localStorage.setItem('totalSearches', this.searchAnalytics.totalSearches.toString());

        // Track popular terms
        const tokens = this.tokenize(query);
        tokens.forEach(token => {
            this.searchAnalytics.popularTerms[token] = 
                (this.searchAnalytics.popularTerms[token] || 0) + 1;
        });

        localStorage.setItem('popularTerms', JSON.stringify(this.searchAnalytics.popularTerms));
    }

    // Save search to history
    saveToSearchHistory(query) {
        if (!query.trim()) return;

        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item.query !== query);
        
        // Add to beginning
        this.searchHistory.unshift({
            query: query,
            timestamp: Date.now(),
            results: this.currentResults.length
        });

        // Keep only last 20 searches
        this.searchHistory = this.searchHistory.slice(0, 20);
        
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }

    // Load and show search history
    loadSearchHistory() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    }

    showSearchHistory() {
        if (this.searchHistory.length === 0) return;

        const suggestions = document.getElementById('search-suggestions');
        if (!suggestions) return;

        const historyItems = this.searchHistory.slice(0, 5).map(item => `
            <div class="history-item" onclick="advancedSearch.selectHistoryItem('${item.query}')">
                <i class="fas fa-history"></i>
                <span class="history-query">${item.query}</span>
                <small class="history-meta">${item.results} نتيجة</small>
            </div>
        `).join('');

        suggestions.innerHTML = `
            <div class="search-history">
                <div class="history-header">
                    <span>عمليات البحث الأخيرة</span>
                    <button onclick="advancedSearch.clearSearchHistory()" class="clear-history-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="history-list">
                    ${historyItems}
                </div>
            </div>
        `;

        suggestions.style.display = 'block';
    }

    // Select history item
   selectHistoryItem(query) {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    // ضع النص مباشرة في شريط البحث
    searchInput.value = query;

    // نفّذ البحث فورًا
    setTimeout(() => {
        const results = this.performSearch(query);
        if (results.length === 0) {
            this.showNoResults(query);
        }
    }, 50);

    // اخفاء قائمة الاقتراحات
    this.hideSearchSuggestions();
}


    // Clear search history
    clearSearchHistory() {
        this.searchHistory = [];
        localStorage.removeItem('searchHistory');
        this.hideSearchSuggestions();
    }

    // Hide search suggestions
    hideSearchSuggestions() {
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
            suggestions.innerHTML = '';
        }
    }

    // Hide search results
    hideSearchResults() {
        this.hideSearchSuggestions();
        // Reset to show all tools
        currentFilter.search = '';
        if (typeof loadFeaturedTools === 'function') {
            loadFeaturedTools();
        }
    }

    // Utility functions
    getCategoryIcon(categoryId) {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.icon : 'fas fa-tools';
    }

    getTypeClass(type) {
        const classes = {
            'مفتوح المصدر': 'type-open-source',
            'مجاني': 'type-free',
            'تجاري': 'type-commercial'
        };
        return classes[type] || 'type-free';
    }

    getPlatformIcon(platform) {
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

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
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

    // Debounce function
    debounce(func, wait) {
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

    // Get search analytics
    getSearchAnalytics() {
        return {
            totalSearches: this.searchAnalytics.totalSearches,
            popularTerms: Object.entries(this.searchAnalytics.popularTerms)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10),
            recentSearches: this.searchHistory.slice(0, 10)
        };
    }
}

// Initialize advanced search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.advancedSearch = new AdvancedSearch();
});
// موحد لكل نقرة على أي اقتراح أو تاريخ أو اقتراح بديل
AdvancedSearch.prototype.applySearchClick = function(query, id = null, isCategory = false) {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    // ضع النص في شريط البحث
    searchInput.value = query;

    // نفّذ البحث بعد تحديث القيمة مباشرة
    setTimeout(() => {
        const results = this.performSearch(query);
        if (results.length === 0) {
            this.showNoResults(query);
        }
    }, 50);

    // إذا كان اقتراح تصنيف، استعرضه
    if (isCategory && id && typeof window.exploreCategory === 'function') {
        window.exploreCategory(id);
    }

    // أخفِ الاقتراحات
    this.hideSearchSuggestions();
};

// استبدل جميع الطرق القديمة بالمركزية الجديدة:

// 1️⃣ اقتراح البحث
AdvancedSearch.prototype.selectSuggestion = function(name, id, isCategory = false) {
    this.applySearchClick(name, id, isCategory);
};

// 2️⃣ عنصر تاريخ البحث
AdvancedSearch.prototype.selectHistoryItem = function(query) {
    this.applySearchClick(query);
};

// 3️⃣ اقتراح بديل
AdvancedSearch.prototype.searchAlternative = function(query) {
    this.applySearchClick(query);
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedSearch;
}