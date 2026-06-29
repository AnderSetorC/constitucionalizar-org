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

    // Carrossel de projetos
    initProjectsCarousel();
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
        '.check-list li, .pricing-card, .transform-text, .transform-title, .donation-content, .donation-image-frame, .donation-cta-wrapper'
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

function initProjectsCarousel() {
    const root = document.querySelector('[data-projects-carousel]');
    if (!root) return;

    const track = root.querySelector('.projects-track');
    const slides = Array.from(root.querySelectorAll('.projects-slide'));
    const dots = Array.from(root.querySelectorAll('.projects-dot'));
    const prevBtn = root.querySelector('.projects-arrow-prev');
    const nextBtn = root.querySelector('.projects-arrow-next');
    const viewport = root.querySelector('.projects-viewport');
    const status = document.getElementById('projectsStatus');
    const total = slides.length;
    if (!track || total === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const INTERVAL_MS = 5000;
    const SWIPE_THRESHOLD = 50;

    let currentIndex = 0;
    let autoTimer = null;

    function announce(message) {
        if (!status) return;
        status.textContent = '';
        setTimeout(() => { status.textContent = message; }, 50);
    }

    function goTo(index, options = {}) {
        const { announceChange = true, fromUser = false } = options;
        const next = ((index % total) + total) % total;
        currentIndex = next;
        track.style.transform = 'translateX(-' + (next * 100) + '%)';

        slides.forEach((slide, i) => {
            const isActive = i === next;
            if (isActive) {
                slide.removeAttribute('aria-hidden');
                slide.removeAttribute('inert');
            } else {
                slide.setAttribute('aria-hidden', 'true');
                slide.setAttribute('inert', '');
            }
        });

        dots.forEach((dot, i) => {
            dot.setAttribute('aria-selected', i === next ? 'true' : 'false');
        });

        if (announceChange) {
            const title = slides[next].querySelector('.project-card-title');
            const titleText = title ? title.textContent.trim() : '';
            announce('Projeto ' + (next + 1) + ' de ' + total + ': ' + titleText);
        }

        if (fromUser) startAuto();
    }

    function startAuto() {
        stopAuto();
        if (reducedMotion.matches) return;
        autoTimer = setInterval(() => {
            if (document.hidden) return;
            goTo(currentIndex + 1, { announceChange: true });
        }, INTERVAL_MS);
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // Sincroniza estado inicial
    goTo(0, { announceChange: false });

    // Auto-play inicia (respeitando prefers-reduced-motion)
    startAuto();

    // Pausa em hover/foco
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
    root.addEventListener('focusin', stopAuto);
    root.addEventListener('focusout', startAuto);

    // Pausa quando aba fica oculta
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAuto();
        } else {
            startAuto();
        }
    });

    // Setas
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goTo(currentIndex - 1, { fromUser: true }));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1, { fromUser: true }));
    }

    // Dots
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.getAttribute('data-go-to') || '0', 10);
            goTo(target, { fromUser: true });
        });
    });

    // Teclado (setas quando foco está no carrossel)
    root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(currentIndex - 1, { fromUser: true });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(currentIndex + 1, { fromUser: true });
        }
    });

    // Touch swipe (mobile)
    if (viewport) {
        let startX = 0;
        let startY = 0;
        let tracking = false;

        viewport.addEventListener('pointerdown', (e) => {
            if (e.pointerType !== 'touch') return;
            startX = e.clientX;
            startY = e.clientY;
            tracking = true;
        });

        viewport.addEventListener('pointerup', (e) => {
            if (!tracking) return;
            tracking = false;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
                goTo(currentIndex + (deltaX < 0 ? 1 : -1), { fromUser: true });
            }
        });

        viewport.addEventListener('pointercancel', () => { tracking = false; });
    }

    // Listener para mudanças em tempo real em prefers-reduced-motion
    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', () => {
            if (reducedMotion.matches) {
                stopAuto();
            } else {
                startAuto();
            }
        });
    }

    // Reaplica transform em resize (debounce leve)
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        }, 150);
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

// ============================================
// E-BOOK - Validação e gate de download
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ebookForm');
    if (!form) return;

    const nameInput = document.getElementById('ebookName');
    const whatsappInput = document.getElementById('ebookWhatsapp');
    const emailInput = document.getElementById('ebookEmail');
    const consentInput = document.getElementById('ebookConsent');
    const submitBtn = document.getElementById('ebookSubmit');
    const downloadBlock = document.getElementById('ebookDownload');

    const nameError = document.getElementById('ebookNameError');
    const whatsappError = document.getElementById('ebookWhatsappError');
    const emailError = document.getElementById('ebookEmailError');
    const consentError = document.getElementById('ebookConsentError');

    // ---- Validadores ----

    function validateName(value) {
        const trimmed = value.trim();
        if (!trimmed) return 'Informe seu nome completo.';
        if (trimmed.length < 3) return 'Nome muito curto.';
        const parts = trimmed.split(/\s+/);
        if (parts.length < 2) return 'Informe nome e sobrenome.';
        return '';
    }

    function validateWhatsapp(value) {
        // Aceita varios formatos; so importa os digitos
        const digits = value.replace(/\D/g, '');
        if (!digits) return 'Informe seu WhatsApp.';
        if (digits.length < 10) return 'WhatsApp incompleto.';
        if (digits.length > 13) return 'WhatsApp invalido.';
        // DDD brasileiro: 11 a 99 (na pratica 11-99; 10/20 nao existem)
        const ddd = digits.length === 11 ? digits.slice(0, 2) : digits.slice(0, 2);
        if (!/^([1-9][1-9])$/.test(ddd)) {
            return 'DDD invalido.';
        }
        // Celular com 9 (11 digitos) ou fixo (10 digitos)
        if (digits.length === 11 && digits[2] !== '9') {
            return 'Para celular, o 3o digito deve ser 9.';
        }
        return '';
    }

    function validateEmail(value) {
        const trimmed = value.trim();
        if (!trimmed) return 'Informe seu e-mail.';
        // Regex RFC basico - cobre 99% dos casos reais
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!re.test(trimmed)) return 'E-mail invalido.';
        return '';
    }

    function validateConsent(checked) {
        if (!checked) return 'Voce precisa aceitar os termos para continuar.';
        return '';
    }

    function setFieldError(input, errorEl, message) {
        errorEl.textContent = message;
        if (message) {
            input.classList.add('input-error');
            input.classList.remove('input-valid');
            input.setAttribute('aria-invalid', 'true');
        } else if (input.value.trim()) {
            input.classList.remove('input-error');
            input.classList.add('input-valid');
            input.removeAttribute('aria-invalid');
        } else {
            input.classList.remove('input-error', 'input-valid');
            input.removeAttribute('aria-invalid');
        }
    }

    function isFormValid() {
        return !validateName(nameInput.value)
            && !validateWhatsapp(whatsappInput.value)
            && !validateEmail(emailInput.value)
            && !validateConsent(consentInput.checked);
    }

    function updateSubmitState() {
        submitBtn.disabled = !isFormValid();
    }

    // ---- Mascara de WhatsApp ----
    function maskWhatsapp(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length === 0) return '';
        if (digits.length <= 2) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) {
            // Fixo: (14) 3232-1234
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        }
        // Celular: (14) 99999-9999
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    // ---- Listeners ----

    nameInput.addEventListener('input', function() {
        setFieldError(nameInput, nameError, validateName(this.value));
        updateSubmitState();
    });

    nameInput.addEventListener('blur', function() {
        setFieldError(nameInput, nameError, validateName(this.value));
    });

    whatsappInput.addEventListener('input', function() {
        const cursor = this.selectionStart;
        const before = this.value;
        const masked = maskWhatsapp(this.value);
        this.value = masked;
        // Reposiciona o cursor de forma simples
        const after = this.value;
        const diff = after.length - before.length;
        try {
            this.setSelectionRange(cursor + diff, cursor + diff);
        } catch (e) {
            // ignora se o campo perdeu foco
        }
        setFieldError(whatsappInput, whatsappError, validateWhatsapp(this.value));
        updateSubmitState();
    });

    whatsappInput.addEventListener('blur', function() {
        setFieldError(whatsappInput, whatsappError, validateWhatsapp(this.value));
    });

    emailInput.addEventListener('input', function() {
        setFieldError(emailInput, emailError, validateEmail(this.value));
        updateSubmitState();
    });

    emailInput.addEventListener('blur', function() {
        setFieldError(emailInput, emailError, validateEmail(this.value));
    });

    consentInput.addEventListener('change', function() {
        setFieldError(consentInput, consentError, validateConsent(this.checked));
        updateSubmitState();
    });

    // ---- Submit ----
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validacao final
        const nameErr = validateName(nameInput.value);
        const whatsappErr = validateWhatsapp(whatsappInput.value);
        const emailErr = validateEmail(emailInput.value);
        const consentErr = validateConsent(consentInput.checked);

        setFieldError(nameInput, nameError, nameErr);
        setFieldError(whatsappInput, whatsappError, whatsappErr);
        setFieldError(emailInput, emailError, emailErr);
        setFieldError(consentInput, consentError, consentErr);

        if (nameErr || whatsappErr || emailErr || consentErr) {
            // Foca no primeiro campo com erro
            if (nameErr) nameInput.focus();
            else if (whatsappErr) whatsappInput.focus();
            else if (emailErr) emailInput.focus();
            else if (consentErr) consentInput.focus();
            return;
        }

        // Sucesso: dispara eventos de tracking
        const leadData = {
            name: nameInput.value.trim(),
            whatsapp: whatsappInput.value.trim(),
            email: emailInput.value.trim()
        };

        if (typeof gtag !== 'undefined') {
            gtag('event', 'ebook_lead', {
                'event_category': 'lead',
                'event_label': 'Pílulas da Constituição',
                'value': 1
            });
            gtag('event', 'generate_lead', {
                'currency': 'BRL',
                'value': 30
            });
        }

        console.log('E-book lead captured:', leadData);

        // Esconde o formulario e mostra o bloco de download
        form.hidden = true;
        downloadBlock.hidden = false;
        downloadBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Link "termos de uso" - apenas rola ate o formulario
    const termsLink = document.getElementById('ebookTermsLink');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Como nao temos uma pagina de termos, alertamos os termos resumidos
            alert('Termos de uso e distribuicao:\n\n' +
                '- Este e-book (Pílulas da Constituicao) e fornecido gratuitamente pela Associacao Constitucionalizar.\n' +
                '- O uso e EXCLUSIVAMENTE para conhecimento pessoal.\n' +
                '- E PROIBIDA a venda, total ou parcial.\n' +
                '- E PROIBIDA a reproducao, redistribuicao ou modificacao sem autorizacao expressa.\n' +
                '- O conteudo possui direitos autorais da Associacao Constitucionalizar.');
        });
    }

    // Estado inicial
    updateSubmitState();
});