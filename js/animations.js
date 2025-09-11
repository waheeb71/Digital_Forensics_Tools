// ===== ADVANCED ANIMATIONS & EFFECTS =====

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.performanceMode = this.detectPerformanceMode();
        
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.initializeScrollAnimations();
        this.setupParallaxEffects();
        this.initializeCyberEffects();
        this.setupHoverEffects();
        this.initializeLoadingAnimations();
        this.setupPerformanceOptimizations();
    }

    // Detect device performance capabilities
    detectPerformanceMode() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const deviceMemory = navigator.deviceMemory || 4;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;

        // Low-end device detection
        if (deviceMemory <= 2 || hardwareConcurrency <= 2) {
            return 'low';
        }

        // Slow connection detection
        if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
            return 'low';
        }

        // High-end device detection
        if (deviceMemory >= 8 && hardwareConcurrency >= 8) {
            return 'high';
        }

        return 'medium';
    }

    // Setup intersection observers for scroll animations
    setupIntersectionObservers() {
        // Main content observer
        const mainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: this.performanceMode === 'low' ? 0.3 : 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Staggered animation observer
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStaggeredElements(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        // Parallax observer (only for high performance devices)
        let parallaxObserver;
        if (this.performanceMode === 'high' && !this.isReducedMotion) {
            parallaxObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.enableParallax(entry.target);
                    } else {
                        this.disableParallax(entry.target);
                    }
                });
            });
        }

        this.observers.set('main', mainObserver);
        this.observers.set('stagger', staggerObserver);
        if (parallaxObserver) {
            this.observers.set('parallax', parallaxObserver);
        }

        // Observe elements
        this.observeElements();
    }

    // Observe elements for animations
    observeElements() {
        const mainObserver = this.observers.get('main');
        const staggerObserver = this.observers.get('stagger');
        const parallaxObserver = this.observers.get('parallax');

        // Elements to animate on scroll
        const animateElements = document.querySelectorAll('[data-animate], .fade-in, .slide-in-left, .slide-in-right, .scale-in');
        animateElements.forEach(el => {
            mainObserver.observe(el);
            this.prepareElement(el);
        });

        // Staggered elements
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        staggerContainers.forEach(container => {
            staggerObserver.observe(container);
        });

        // Parallax elements (high performance only)
        if (parallaxObserver) {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                parallaxObserver.observe(el);
            });
        }
    }

    // Prepare element for animation
    prepareElement(element) {
        if (this.isReducedMotion) return;

        const animationType = element.dataset.animate || this.getAnimationType(element);
        
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = this.getInitialTransform(animationType);
        element.style.transition = this.getTransition(animationType);
        element.style.willChange = 'transform, opacity';
    }

    // Get animation type from element classes
    getAnimationType(element) {
        if (element.classList.contains('slide-in-left')) return 'slideInLeft';
        if (element.classList.contains('slide-in-right')) return 'slideInRight';
        if (element.classList.contains('scale-in')) return 'scaleIn';
        return 'fadeIn';
    }

    // Get initial transform for animation type
    getInitialTransform(type) {
        const transforms = {
            fadeIn: 'translateY(30px)',
            slideInLeft: 'translateX(-50px)',
            slideInRight: 'translateX(50px)',
            scaleIn: 'scale(0.8)',
            rotateIn: 'rotate(-10deg) scale(0.8)',
            flipIn: 'rotateY(-90deg)'
        };
        return transforms[type] || 'translateY(30px)';
    }

    // Get transition for animation type
    getTransition(type) {
        const baseTransition = this.performanceMode === 'low' ? '0.3s' : '0.6s';
        const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
        
        return `opacity ${baseTransition} ${easing}, transform ${baseTransition} ${easing}`;
    }

    // Animate element
    animateElement(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return;
        }

        // Add visible class
        element.classList.add('animate-visible');
        
        // Reset transforms
        element.style.opacity = '1';
        element.style.transform = 'none';
        
        // Clean up will-change after animation
        setTimeout(() => {
            element.style.willChange = 'auto';
        }, 600);
    }

    // Animate staggered elements
    animateStaggeredElements(container) {
        const elements = container.querySelectorAll('[data-stagger-item]');
        const delay = parseInt(container.dataset.staggerDelay) || 100;

        elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * delay);
        });
    }

    // Initialize scroll animations
    initializeScrollAnimations() {
        if (this.isReducedMotion || this.performanceMode === 'low') return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Throttled scroll handler
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Update scroll-based animations
    updateScrollAnimations() {
        const scrollY = window.pageYOffset;
        
        // Update progress indicators
        this.updateScrollProgress(scrollY);
        
        // Update navbar effects
        this.updateNavbarEffects(scrollY);
        
        // Update hero parallax
        this.updateHeroParallax(scrollY);
    }

    // Update scroll progress indicator
    updateScrollProgress(scrollY) {
        const progress = document.querySelector('.scroll-progress');
        if (!progress) return;

        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollY / windowHeight) * 100;
        
        progress.style.width = `${Math.min(scrollProgress, 100)}%`;
    }

    // Update navbar effects based on scroll
    updateNavbarEffects(scrollY) {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        if (scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Update hero parallax effect
    updateHeroParallax(scrollY) {
        const heroBackground = document.querySelector('.hero-bg');
        if (!heroBackground || this.performanceMode === 'low') return;

        const speed = 0.5;
        const yPos = -(scrollY * speed);
        
        heroBackground.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }

    // Setup parallax effects
    setupParallaxEffects() {
        if (this.isReducedMotion || this.performanceMode === 'low') return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
            element._parallaxSpeed = speed;
        });
    }

    // Enable parallax for element
    enableParallax(element) {
        if (!element._parallaxEnabled) {
            element._parallaxEnabled = true;
            this.updateElementParallax(element);
        }
    }

    // Disable parallax for element
    disableParallax(element) {
        element._parallaxEnabled = false;
    }

    // Update element parallax
    updateElementParallax(element) {
        if (!element._parallaxEnabled) return;

        const rect = element.getBoundingClientRect();
        const speed = element._parallaxSpeed || 0.5;
        const yPos = rect.top * speed;
        
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;

        if (element._parallaxEnabled) {
            requestAnimationFrame(() => this.updateElementParallax(element));
        }
    }

    // Initialize cyber effects
    initializeCyberEffects() {
        if (this.performanceMode === 'low') return;

        this.createMatrixEffect();
        this.createGlitchEffect();
        this.createScanLineEffect();
        this.createParticleEffect();
    }

    // Create matrix rain effect
    createMatrixEffect() {
        const matrix = document.querySelector('.matrix-rain');
        if (!matrix) return;

        const characters = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZابتثجحخدذرزسشصضطظعغفقكلمنهوي';
        const drops = [];
        const fontSize = 14;
        const columns = Math.floor(matrix.offsetWidth / fontSize);
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = matrix.offsetWidth;
        canvas.height = matrix.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        matrix.appendChild(canvas);

        // Initialize drops
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Animation loop
        const matrixInterval = setInterval(drawMatrix, 35);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(matrixInterval);
        });
    }

    // Create glitch effect
    createGlitchEffect() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            this.applyGlitchEffect(element);
        });
    }

    // Apply glitch effect to element
    applyGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        
        const glitch = () => {
            if (Math.random() < 0.1) { // 10% chance to glitch
                let glitchedText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() < 0.1) {
                        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchedText += originalText[i];
                    }
                }
                
                element.textContent = glitchedText;
                
                setTimeout(() => {
                    element.textContent = originalText;
                }, 50);
            }
        };

        setInterval(glitch, 2000);
    }

    // Create scan line effect
    createScanLineEffect() {
        const scanElements = document.querySelectorAll('[data-scanline]');
        
        scanElements.forEach(element => {
            const scanLine = document.createElement('div');
            scanLine.className = 'scan-line-effect';
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ff88, transparent);
                animation: scanLine 3s linear infinite;
                pointer-events: none;
                z-index: 10;
            `;
            
            element.style.position = 'relative';
            element.appendChild(scanLine);
        });
    }

    // Create particle effect
    createParticleEffect() {
        const particleContainers = document.querySelectorAll('[data-particles]');
        
        particleContainers.forEach(container => {
            this.initializeParticleSystem(container);
        });
    }

    // Initialize particle system
    initializeParticleSystem(container) {
        const particleCount = parseInt(container.dataset.particleCount) || 20;
        const particles = [];
        
        // Create canvas for particles
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        
        container.style.position = 'relative';
        container.appendChild(canvas);

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        // Animation loop
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off walls
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // Setup hover effects
    setupHoverEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        magneticElements.forEach(element => {
            this.applyMagneticEffect(element);
        });

        // Tilt effect for cards
        const tiltElements = document.querySelectorAll('[data-tilt]');
        tiltElements.forEach(element => {
            this.applyTiltEffect(element);
        });

        // Glow effect on hover
        const glowElements = document.querySelectorAll('[data-glow]');
        glowElements.forEach(element => {
            this.applyGlowEffect(element);
        });
    }

    // Apply magnetic effect
    applyMagneticEffect(element) {
        if (this.performanceMode === 'low') return;

        let isHovering = false;

        element.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        element.addEventListener('mouseleave', () => {
            isHovering = false;
            element.style.transform = '';
        });

        element.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Apply tilt effect
    applyTiltEffect(element) {
        if (this.performanceMode === 'low') return;

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }

    // Apply glow effect
    applyGlowEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    }

    // Initialize loading animations
    initializeLoadingAnimations() {
        // Skeleton loading effect
        const skeletons = document.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => {
            this.applySkeletonEffect(skeleton);
        });

        // Progress bar animations
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            this.animateProgressBar(bar);
        });
    }

    // Apply skeleton loading effect
    applySkeletonEffect(element) {
        element.style.background = `
            linear-gradient(90deg, 
                rgba(255, 255, 255, 0.1) 25%, 
                rgba(255, 255, 255, 0.2) 50%, 
                rgba(255, 255, 255, 0.1) 75%
            )
        `;
        element.style.backgroundSize = '200% 100%';
        element.style.animation = 'skeleton-loading 1.5s infinite';
    }

    // Animate progress bar
    animateProgressBar(bar) {
        const targetWidth = bar.dataset.progress || '100%';
        
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
            bar.style.transition = 'width 2s ease';
        }, 100);
    }

    // Setup performance optimizations
    setupPerformanceOptimizations() {
        // Reduce animations for low performance devices
        if (this.performanceMode === 'low') {
            this.enableLowPerformanceMode();
        }

        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Preload critical animations
        this.preloadAnimations();
    }

    // Enable low performance mode
    enableLowPerformanceMode() {
        document.documentElement.classList.add('low-performance');
        
        // Disable heavy animations
        const heavyAnimations = document.querySelectorAll('.matrix-rain, [data-particles], [data-parallax]');
        heavyAnimations.forEach(element => {
            element.style.display = 'none';
        });
    }

    // Pause animations
    pauseAnimations() {
        document.documentElement.style.animationPlayState = 'paused';
    }

    // Resume animations
    resumeAnimations() {
        document.documentElement.style.animationPlayState = 'running';
    }

    // Preload animations
    preloadAnimations() {
        // Force browser to compile animations
        const testElement = document.createElement('div');
        testElement.style.animation = 'fadeIn 0.1s';
        document.body.appendChild(testElement);
        
        setTimeout(() => {
            document.body.removeChild(testElement);
        }, 100);
    }

    // Destroy animations and cleanup
    destroy() {
        // Clear all observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        
        // Clear intervals
        this.animationQueue.forEach(clearTimeout);
    }
}

// CSS Animations (injected dynamically)
const cssAnimations = `
    @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }

    @keyframes scanLine {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }

    @keyframes cyber-pulse {
        0%, 100% { 
            box-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
            border-color: rgba(0, 255, 136, 0.5);
        }
        50% { 
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
            border-color: rgba(0, 255, 136, 0.8);
        }
    }

    @keyframes matrix-digital {
        0% { opacity: 0.1; }
        50% { opacity: 0.3; }
        100% { opacity: 0.1; }
    }

    @keyframes glitch-animation {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }

    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }

    .low-performance .matrix-rain,
    .low-performance [data-particles],
    .low-performance [data-parallax] {
        display: none !important;
    }
`;

// Inject CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = cssAnimations;
document.head.appendChild(styleSheet);

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}