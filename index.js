/**
 * Sandeepa Sepala - Portfolio Script
 * Cleaned and modularized version
 */

// Configuration Constants
const CONFIG = {
    particlesCount: 50,
    scrollThreshold: 50,
    animationDelay: 100,
    badgesScrollSpeed: '25s', // Slower, smoother scroll
};

/**
 * Background Particle System
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < CONFIG.particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-cyan rounded-full animate-float-particle opacity-30 shadow-[0_0_10px_#00ffff] pointer-events-none';
        
        const size = Math.random() * 5 + 2;
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
        });
        
        fragment.appendChild(particle);
    }
    container.appendChild(fragment);
}

/**
 * Profile Photo Unlock Logic
 */
function initProfileUnlock() {
    const elements = {
        photo: document.getElementById('profile-photo'),
        guard: document.getElementById('guard-icon'),
        text: document.getElementById('unlock-text'),
        container: document.getElementById('profile-photo-container')
    };

    if (!elements.photo || !elements.guard) return;

    let isUnlocked = false;

    elements.container.addEventListener('click', () => {
        if (isUnlocked) return;
        isUnlocked = true;

        // Visual feedback
        if (elements.text) elements.text.style.display = 'none';
        
        // Trigger Jump Animation
        elements.guard.classList.add('animate-guard-jump');
        
        // Finalize state
        setTimeout(() => {
            elements.guard.style.display = 'none';
            elements.photo.classList.remove('grayscale');
            elements.photo.classList.add('scale-100');
        }, 1000);
    });
}

/**
 * Progress Bar Sparkles
 */
function createSparkles(container) {
    const interval = setInterval(() => {
        if (!container.isConnected) {
            clearInterval(interval);
            return;
        }
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute w-1 h-1 bg-white rounded-full pointer-events-none animate-ping';
        Object.assign(sparkle.style, {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random()
        });
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }, 200);
}

/**
 * Scroll Management (Nav & Animations)
 */
function initScrollEffects() {
    const nav = document.getElementById('main-nav');
    
    // Navigation appearance
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > CONFIG.scrollThreshold;
        nav.classList.toggle('bg-[#0a1f0a]/95', isScrolled);
        nav.classList.toggle('py-2', isScrolled);
        nav.classList.toggle('shadow-lg', isScrolled);
        nav.classList.toggle('border-cyan/50', isScrolled);
        nav.classList.toggle('bg-[#0a1f0a]/80', !isScrolled);
        nav.classList.toggle('py-4', !isScrolled);
    });

    // Intersection Observer for scroll-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                
                // Specific logic for proficiency sparkles
                if (entry.target.id === 'proficiency') {
                    entry.target.querySelectorAll('.animate-sparkle').forEach(createSparkles);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/**
 * Navigation Smoothing
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initProfileUnlock();
    initScrollEffects();
    initSmoothScroll();
});
