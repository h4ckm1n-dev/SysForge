document.addEventListener('DOMContentLoaded', function() {
    // Système de thème
    initThemeToggle();
    
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animation hamburger
            document.querySelectorAll('.hamburger span').forEach(span => {
                span.classList.toggle('active');
            });
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Réinitialiser l'animation hamburger
            if (hamburger) {
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
    
    // Animation au défilement pour les sections
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        const elements = document.querySelectorAll('.service-card, .project-card, .skill-category');
        const windowHeight = window.innerHeight;
        
        // Animer les sections
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            
            if (sectionPosition < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
        
        // Animer les éléments à l'intérieur des sections
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Ajouter le bouton de retour en haut
    addScrollToTopButton();
    
    // Exécuter l'animation au chargement et au défilement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialiser le système de changement de thème
    function initThemeToggle() {
        // Créer le bouton de changement de thème
        const themeToggle = document.createElement('button');
        themeToggle.classList.add('theme-toggle');
        themeToggle.setAttribute('aria-label', 'Changer de thème');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);
        
        // Vérifier si le thème est déjà sauvegardé
        const savedTheme = localStorage.getItem('theme');
        
        // Appliquer le thème sauvegardé ou utiliser les préférences du système
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            // Détecter les préférences du système
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
        
        // Ajouter l'événement pour changer de thème
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('dark-theme')) {
                // Passer au thème clair
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                // Passer au thème sombre
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Écouter les changements de préférence système
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
            }
        });
    }
    
    // Ajouter le bouton de retour en haut
    function addScrollToTopButton() {
        const scrollToTop = document.createElement('button');
        scrollToTop.classList.add('scroll-to-top');
        scrollToTop.setAttribute('aria-label', 'Retour en haut');
        scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollToTop);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTop.classList.add('active');
            } else {
                scrollToTop.classList.remove('active');
            }
        });
        
        scrollToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animation des titres de section
    animateSectionHeadings();
    
    function animateSectionHeadings() {
        const headings = document.querySelectorAll('section h2');
        
        headings.forEach(heading => {
            heading.classList.add('fadeIn');
        });
    }

    // Animation des éléments au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observer les cartes de compétences
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });

    // Animation de la carte de profil
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        observer.observe(profileCard);
    }

    // Observer les sections de profil
    const profileSections = document.querySelectorAll('.profile-section');
    let sectionDelay = 0;
    profileSections.forEach(section => {
        section.style.transitionDelay = `${sectionDelay}s`;
        sectionDelay += 0.2;
        observer.observe(section);
    });

    // Observer les catégories de compétences pour une animation séquentielle
    const skillCategories = document.querySelectorAll('.skill-category');
    let delay = 0;
    skillCategories.forEach(category => {
        category.style.transitionDelay = `${delay}s`;
        delay += 0.1;
        observer.observe(category);
    });

    // Observer pour les animations au scroll
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    // Observer tous les éléments avec la classe à animer
    document.querySelectorAll('section, .service-card, .project-card, .profile-section').forEach(element => {
        scrollObserver.observe(element);
    });

    // Gestion du changement de langue
    // Initialiser la langue par défaut
    let currentLang = localStorage.getItem('language') || 'fr';
    
    // Mettre à jour l'affichage du sélecteur de langue
    function updateLanguageSelector() {
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            const activeLang = languageSelector.querySelector(`[data-lang="${currentLang}"]`);
            if (activeLang) {
                // Mettre en surbrillance la langue active
                document.querySelectorAll('.language-selector a').forEach(link => {
                    link.classList.remove('active');
                });
                activeLang.classList.add('active');
            }
        }
    }
    
    // Changer de langue
    function changeLanguage(lang) {
        if (lang === currentLang) return;
        
        // Enregistrer la préférence de langue
        localStorage.setItem('language', lang);
        currentLang = lang;
        
        // Rediriger vers la version correspondante de la page
        const currentPath = window.location.pathname;
        let newPath = '';
        
        // Obtenir le nom de la page actuelle
        const pageName = currentPath.split('/').pop() || 'index.html';
        
        // Déterminer la nouvelle URL en fonction de la langue
        if (lang === 'en') {
            // Si on est sur une page française, aller vers la version anglaise
            if (currentPath.includes('/en/')) {
                // Déjà en anglais, ne rien faire
                return;
            } else {
                // Redirection vers la version anglaise
                if (pageName === 'index.html' || pageName === '') {
                    newPath = 'en/index.html';
                } else if (pageName === 'projets.html') {
                    // Cas spécial pour projets.html qui devient projects.html
                    newPath = 'en/projects.html';
                } else if (pageName === 'mentions-legales.html') {
                    // Cas spécial pour mentions-legales.html qui devient legal.html
                    newPath = 'en/legal.html';
                } else {
                    newPath = 'en/' + pageName;
                }
            }
        } else {
            // Si on est sur une page anglaise, aller vers la version française
            if (currentPath.includes('/en/')) {
                if (pageName === 'index.html' || pageName === '') {
                    newPath = '../index.html';
                } else if (pageName === 'projects.html') {
                    // Cas spécial pour projects.html qui devient projets.html
                    newPath = '../projets.html';
                } else if (pageName === 'legal.html') {
                    // Cas spécial pour legal.html qui devient mentions-legales.html
                    newPath = '../mentions-legales.html';
                } else {
                    newPath = '../' + pageName;
                }
            } else {
                // Déjà en français, ne rien faire
                return;
            }
        }
        
        // Rediriger vers la nouvelle URL
        window.location.href = newPath;
    }
    
    // Ajouter des écouteurs d'événements pour les liens de langue
    document.addEventListener('click', function(e) {
        if (e.target.closest('.language-selector a')) {
            e.preventDefault();
            const lang = e.target.closest('.language-selector a').getAttribute('data-lang');
            changeLanguage(lang);
        }
    });
    
    // Initialiser l'affichage du sélecteur de langue
    updateLanguageSelector();
}); 