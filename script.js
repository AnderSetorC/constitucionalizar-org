// ============================================
// ASSOCIAÇÃO CONSTITUCIONALIZAR - LANDING PAGE
// Scripts de Interatividade
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para âncoras internas
    initSmoothScroll();

    // Animação ao rolar a página
    initScrollAnimations();

    // Tracking de cliques nos CTAs (Google Ads conversion tracking)
    initCTATracking();
});

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    // Verifica se o navegador suporta IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a serem animados
    const animatedElements = document.querySelectorAll(
        '.check-list li, .pricing-card, .transform-text, .transform-title'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initCTATracking() {
    // Eventos para Google Ads Conversion Tracking
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');

            // Google Analytics / Google Ads
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'value': buttonText.includes('ASSOCIAR') ? 30 : 0
                });
            }

            // Google Ads Conversion Tracking
            if (typeof gtag_report_conversion !== 'undefined' &&
                buttonText.includes('ASSOCIAR')) {
                gtag_report_conversion(buttonHref);
            }

            console.log('CTA Click:', buttonText, buttonHref);
        });
    });
}

// CSS injetado via JS para animações
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);