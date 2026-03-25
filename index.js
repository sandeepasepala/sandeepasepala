// Create animated particles for the background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-[#00ffff] rounded-full animate-float-particle opacity-30 shadow-[0_0_10px_#00ffff] pointer-events-none';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Create sparkles for proficiency bars
function createSparklesForBars() {
    const bars = document.querySelectorAll('.animate-sparkle');
    bars.forEach(bar => {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'absolute w-1 h-1 bg-white rounded-full pointer-events-none animate-ping';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.opacity = Math.random();
            bar.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, 200);
    });
}

// Nav scroll effect
function setupNavScroll() {
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-[#0a1f0a]/95', 'py-2', 'shadow-lg', 'border-cyan/50');
            nav.classList.remove('bg-[#0a1f0a]/80', 'py-4', 'border-cyan/30');
        } else {
            nav.classList.remove('bg-[#0a1f0a]/95', 'py-2', 'shadow-lg', 'border-cyan/50');
            nav.classList.add('bg-[#0a1f0a]/80', 'py-4', 'border-cyan/30');
        }
    });
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y-[30px]');
                // Trigger width animation for progress bars if needed (handled by tailwind usually, but we can ensure it here)
                if (entry.target.id === 'proficiency') {
                    createSparklesForBars();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Specifically observe the proficiency section to start sparkles
    const proficiencySection = document.getElementById('proficiency');
    if (proficiencySection) observer.observe(proficiencySection);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupSmoothScroll();
    setupScrollAnimations();
    setupNavScroll();
});
