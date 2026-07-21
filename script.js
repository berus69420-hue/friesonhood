/* ========================================
   $FRIES — Clean Meme JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    const CONTRACT_ADDRESS = '0x297758760572121251bb7e6ee489519612d47777';

    // ---- Force Video Autoplay ----
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
        v.muted = true;
        v.play().catch(() => {
            // Retry play on first touch or scroll if browser blocked autoplay
            const playOnInteraction = () => {
                v.play();
                window.removeEventListener('touchstart', playOnInteraction);
                window.removeEventListener('click', playOnInteraction);
            };
            window.addEventListener('touchstart', playOnInteraction);
            window.addEventListener('click', playOnInteraction);
        });
    });

    // ---- Navbar scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // ---- Mobile menu ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    mobileMenuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => 
        a.addEventListener('click', () => navLinks.classList.remove('open'))
    );

    // ---- Copy CA ----
    function setupCopy(boxId, textId, btnId, tooltipId) {
        const box = document.getElementById(boxId);
        const btn = document.getElementById(btnId);
        const tooltip = document.getElementById(tooltipId);
        if (!box || !btn) return;

        const copy = () => {
            navigator.clipboard.writeText(CONTRACT_ADDRESS).catch(() => {
                const t = document.createElement('textarea');
                t.value = CONTRACT_ADDRESS;
                document.body.appendChild(t);
                t.select();
                document.execCommand('copy');
                document.body.removeChild(t);
            });
            tooltip.classList.add('show');
            setTimeout(() => tooltip.classList.remove('show'), 1800);
        };

        btn.addEventListener('click', e => { e.stopPropagation(); copy(); });
        box.addEventListener('click', copy);
    }

    setupCopy('caBox', 'caText', 'caCopyBtn', 'copyTooltip');
    setupCopy('caBox2', 'caText2', 'caCopyBtn2', 'copyTooltip2');

    // ---- Smoke Particles ----
    const smokeContainer = document.getElementById('smoke-container');

    function createSmoke() {
        const smoke = document.createElement('div');
        smoke.classList.add('smoke');
        
        const x = Math.random() * 100;
        const h = 30 + Math.random() * 80;
        const dur = 6 + Math.random() * 10;
        const delay = Math.random() * 4;
        
        smoke.style.left = x + '%';
        smoke.style.height = h + 'px';
        smoke.style.animationDuration = dur + 's';
        smoke.style.animationDelay = delay + 's';
        
        // Random green tint variation
        const opacity = 0.06 + Math.random() * 0.12;
        smoke.style.background = `linear-gradient(to top, rgba(0, 200, 5, ${opacity}), transparent)`;
        
        smokeContainer.appendChild(smoke);
        setTimeout(() => smoke.remove(), (dur + delay) * 1000 + 500);
    }

    // Initial batch
    for (let i = 0; i < 12; i++) {
        setTimeout(createSmoke, i * 300);
    }

    // Continuous
    setInterval(createSmoke, 1500);

    // ---- Scroll Animations ----
    const animEls = document.querySelectorAll(
        '.section-tag, .section-title, .about-desc, .about-media-wrap, .stat-pill, ' +
        '.menu-card, .step-item, .buy-ca-section'
    );

    animEls.forEach(el => el.classList.add('anim'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));

    // ---- Fee bar animation ----
    const feeBars = document.querySelectorAll('.fee-bar-fill');
    const feeObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const w = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => { entry.target.style.width = w; }, 200);
                feeObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    feeBars.forEach(b => feeObs.observe(b));

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    console.log('%c🍟 $FRIES', 'font-size: 24px; color: #00C805; background: #000; padding: 8px 16px; border-radius: 6px;');
});
