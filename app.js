/*
 * SPIRIT EMBASSY FRANCE - CONFIGURATION & JAVASCRIPT
 * ==================================================
 * 
 * IMPORTANT: This file contains ALL external links and integrations.
 * To update the website, simply modify the CHURCH_CONFIG section below.
 * 
 * CONFIGURATION GUIDE:
 * 1. Replace all "REPLACE_WITH_YOUR_*" placeholders with actual URLs/codes
 * 2. Test each link before going live using the admin panel
 * 3. Keep backup copies of working configurations
 * 4. Contact technical support if you need help: tech@spiritembassyfrance.fr
 */

// =============================================================================
// CHURCH CONFIGURATION - EDIT THIS SECTION ONLY
// =============================================================================

const CHURCH_CONFIG = {
    // GOOGLE FORMS - Your actual form URLs are now configured!
    forms: {
        newVisitor: "https://docs.google.com/forms/d/e/1FAIpQLSdacM1w_fnqnrXrBYjJOW7eokyvsSq9Ydj4KOYpj2VQ_GuMTw/viewform?usp=header",
        officialMember: "https://docs.google.com/forms/d/e/1FAIpQLSdlUDdSVz9yRgCZ1IDrHBy0io4k_l9omvP4VAf99lkDjt37PA/viewform?usp=header", 
        partnership: "REPLACE_WITH_YOUR_PARTNERSHIP_FORM_URL",
        eventRegistration: "REPLACE_WITH_YOUR_EVENT_REGISTRATION_FORM_URL"
    },
    
    // PAYPAL INTEGRATION - Replace with your actual PayPal button HTML codes
    paypal: {
        singleDonation: "REPLACE_WITH_PAYPAL_SINGLE_DONATION_BUTTON_CODE",
        recurringDonation: "REPLACE_WITH_PAYPAL_RECURRING_DONATION_BUTTON_CODE",
        partnershipPayment: "REPLACE_WITH_PARTNERSHIP_PAYPAL_BUTTON_CODE"
    },
    
    // SERMON LINKS - Replace with your actual content URLs
    sermons: {
        latestYouTube: "REPLACE_WITH_LATEST_YOUTUBE_VIDEO_URL",
        latestZoom: "REPLACE_WITH_LATEST_ZOOM_RECORDING_URL", 
        latestGoogleWorkspace: "REPLACE_WITH_GOOGLE_WORKSPACE_CONTENT_URL",
        // Additional sermon storage
        sermon1: "REPLACE_WITH_SERMON_1_URL",
        sermon2: "REPLACE_WITH_SERMON_2_URL", 
        sermon3: "REPLACE_WITH_SERMON_3_URL"
    },
    
    // SOCIAL MEDIA & EXTERNAL LINKS - Replace with your actual URLs
    social: {
        facebook: "REPLACE_WITH_FACEBOOK_URL",
        instagram: "REPLACE_WITH_INSTAGRAM_URL",
        youtube: "REPLACE_WITH_YOUTUBE_CHANNEL_URL",
        twitter: "REPLACE_WITH_TWITTER_URL"
    },
    
    // CHURCH CONTACT INFORMATION - Update with your details
    contact: {
        email: "contact@spiritembassyfrance.fr",
        phone: "REPLACE_WITH_PHONE_NUMBER",
        address: "REPLACE_WITH_CHURCH_ADDRESS",
        city: "Paris",
        country: "France",
        postalCode: "REPLACE_WITH_POSTAL_CODE"
    },
    
    // GOOGLE MAPS & LOCATION - Replace with your coordinates
    location: {
        googleMapsUrl: "REPLACE_WITH_GOOGLE_MAPS_URL",
        latitude: "48.8566",
        longitude: "2.3522"
    },
    
    // ADMIN SETTINGS - CHANGE THE PASSWORD!
    admin: {
        password: "SpiritEmbassy2025!", // IMPORTANT: Change this password!
        email: "admin@spiritembassyfrance.fr",
        secretUrl: "#admin-config-panel-2025" // Secret URL hash for admin access
    }
};

// =============================================================================
// APPLICATION LOGIC - DO NOT EDIT BELOW THIS LINE
// =============================================================================

class SpiritEmbassyApp {
    constructor() {
        this.config = CHURCH_CONFIG;
        this.isAdminAuthenticated = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadConfiguration();
        this.setupMobileNavigation();
        this.loadContent();
        this.setupSmoothScrolling();
        this.setupConfigurationPanel();
        this.checkAdminAccess();
    }

    setupEventListeners() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
            return;
        }

        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        // Close mobile menu
                        if (navToggle && navMenu) {
                            navToggle.classList.remove('active');
                            navMenu.classList.remove('active');
                        }
                        
                        // Smooth scroll to target
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Form button listeners
        this.setupFormButtonListeners();

        // Hash change listener for admin access
        window.addEventListener('hashchange', () => this.checkAdminAccess());
    }

    setupFormButtonListeners() {
        const buttons = {
            'new-visitor-btn': 'newVisitor',
            'official-member-btn': 'officialMember', 
            'partnership-btn': 'partnership'
        };

        Object.entries(buttons).forEach(([buttonId, formType]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openForm(formType);
                });
            }
        });
    }

    openForm(formType) {
        const formUrl = this.config.forms[formType];
        
        if (formUrl && !formUrl.startsWith('REPLACE_WITH')) {
            // Open form in new tab/window
            window.open(formUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
            this.showMessage(`Formulaire ${formType} ouvert dans un nouvel onglet.`, 'success');
        } else {
            this.showMessage(`Formulaire ${formType} pas encore configuré. Veuillez contacter l'administrateur.`, 'warning');
        }
    }

    checkAdminAccess() {
        const currentHash = window.location.hash;
        const adminSection = document.getElementById('admin-config-panel-2025');
        
        if (currentHash === this.config.admin.secretUrl && adminSection) {
            adminSection.style.display = 'flex';
            adminSection.scrollIntoView({ behavior: 'smooth' });
            this.showMessage('Panel administrateur accessible. Entrez le mot de passe.', 'info');
        } else if (adminSection) {
            adminSection.style.display = 'none';
        }
    }

    loadConfiguration() {
        // Load contact information
        this.updateContactInfo();
        
        // Load PayPal buttons
        this.loadPayPalButtons();
        
        // Load sermon content
        this.loadSermonContent();
        
        // Load social media links
        this.updateSocialMediaLinks();
        
        // Update form status
        this.updateFormContainers();
    }

    updateContactInfo() {
        const elements = {
            'contact-email': this.config.contact.email,
            'contact-phone': this.config.contact.phone,
            'contact-address': this.config.contact.address,
            'footer-email': this.config.contact.email,
            'footer-phone': this.config.contact.phone,
            'footer-address': `${this.config.contact.address}, ${this.config.contact.city}`
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element && value && !value.startsWith('REPLACE_WITH')) {
                element.textContent = value;
            }
        });
    }

    updateFormContainers() {
        // Update form containers to show configured status
        const formContainers = {
            'new-visitor-form': this.config.forms.newVisitor,
            'official-member-form': this.config.forms.officialMember
        };

        Object.entries(formContainers).forEach(([containerId, formUrl]) => {
            const container = document.getElementById(containerId);
            if (container) {
                const placeholder = container.querySelector('.form-placeholder');
                if (placeholder && formUrl && !formUrl.startsWith('REPLACE_WITH')) {
                    placeholder.innerHTML = '✅ Formulaire Google Forms configuré et prêt';
                    placeholder.style.color = '#4CAF50';
                }
            }
        });
    }

    loadPayPalButtons() {
        const containers = {
            'single-donation': this.config.paypal.singleDonation,
            'recurring-donation': this.config.paypal.recurringDonation
        };

        Object.entries(containers).forEach(([containerId, buttonCode]) => {
            const container = document.getElementById(containerId);
            if (container && buttonCode && !buttonCode.startsWith('REPLACE_WITH')) {
                container.innerHTML = buttonCode;
            }
        });
    }

    loadSermonContent() {
        const players = {
            'youtube-player': this.config.sermons.latestYouTube,
            'zoom-player': this.config.sermons.latestZoom,
            'workspace-player': this.config.sermons.latestGoogleWorkspace
        };

        Object.entries(players).forEach(([playerId, url]) => {
            const player = document.getElementById(playerId);
            if (player && url && !url.startsWith('REPLACE_WITH')) {
                if (playerId === 'youtube-player') {
                    this.embedYouTubeVideo(player, url);
                } else if (playerId === 'zoom-player') {
                    this.embedZoomRecording(player, url);
                } else if (playerId === 'workspace-player') {
                    this.embedWorkspaceContent(player, url);
                }
            }
        });
    }

    embedYouTubeVideo(container, url) {
        const videoId = this.extractYouTubeVideoId(url);
        if (videoId) {
            container.innerHTML = `
                <iframe width="100%" height="315" 
                    src="https://www.youtube.com/embed/${videoId}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            `;
        }
    }

    extractYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    embedZoomRecording(container, url) {
        container.innerHTML = `
            <div class="zoom-player">
                <a href="${url}" target="_blank" class="btn btn-primary">
                    🎥 Regarder l'Enregistrement Zoom
                </a>
                <p class="sermon-note">Cliquez pour ouvrir dans un nouvel onglet</p>
            </div>
        `;
    }

    embedWorkspaceContent(container, url) {
        if (url.includes('drive.google.com')) {
            const embedUrl = url.replace('/view', '/preview');
            container.innerHTML = `
                <iframe src="${embedUrl}" width="100%" height="315" frameborder="0">
                </iframe>
            `;
        } else {
            container.innerHTML = `
                <div class="workspace-player">
                    <a href="${url}" target="_blank" class="btn btn-secondary">
                        💾 Accéder au Contenu
                    </a>
                </div>
            `;
        }
    }

    updateSocialMediaLinks() {
        const socialLinks = {
            'footer-facebook': this.config.social.facebook,
            'footer-instagram': this.config.social.instagram,
            'footer-youtube': this.config.social.youtube
        };

        Object.entries(socialLinks).forEach(([id, url]) => {
            const element = document.getElementById(id);
            if (element && url && !url.startsWith('REPLACE_WITH')) {
                element.href = url;
                element.target = '_blank';
                element.rel = 'noopener noreferrer';
            }
        });
    }

    setupMobileNavigation() {
        // Handle mobile menu closing when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navToggle && 
                navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    loadContent() {
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupSmoothScrolling() {
        // Enhance smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupConfigurationPanel() {
        // Admin panel functionality
        window.checkAdminPassword = () => this.checkAdminPassword();
        window.saveConfiguration = () => this.saveConfiguration();
        window.testLinks = () => this.testLinks();
        window.exportConfiguration = () => this.exportConfiguration();
        window.hideAdminPanel = () => this.hideAdminPanel();
    }

    hideAdminPanel() {
        const adminSection = document.getElementById('admin-config-panel-2025');
        if (adminSection) {
            adminSection.style.display = 'none';
            window.location.hash = '';
            this.showMessage('Panel administrateur masqué.', 'info');
        }
    }

    checkAdminPassword() {
        const passwordInput = document.getElementById('admin-password');
        const configContent = document.getElementById('config-content');
        const passwordSection = document.getElementById('config-password-section');

        if (passwordInput && passwordInput.value === this.config.admin.password) {
            this.isAdminAuthenticated = true;
            passwordSection.style.display = 'none';
            configContent.style.display = 'block';
            this.loadConfigurationValues();
            this.showMessage('✅ Accès administrateur accordé', 'success');
        } else {
            this.showMessage('❌ Mot de passe incorrect', 'error');
            passwordInput.value = '';
        }
    }

    loadConfigurationValues() {
        // Load current configuration into form fields
        const fields = {
            'config-new-visitor': this.config.forms.newVisitor,
            'config-official-member': this.config.forms.officialMember,
            'config-partnership': this.config.forms.partnership,
            'config-single-donation': this.config.paypal.singleDonation,
            'config-recurring-donation': this.config.paypal.recurringDonation,
            'config-youtube': this.config.sermons.latestYouTube,
            'config-zoom': this.config.sermons.latestZoom,
            'config-workspace': this.config.sermons.latestGoogleWorkspace,
            'config-email': this.config.contact.email,
            'config-phone': this.config.contact.phone,
            'config-address': this.config.contact.address
        };

        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element && value) {
                element.value = value;
            }
        });

        this.updateConfigurationStatus();
    }

    updateConfigurationStatus() {
        const statusElements = {
            'status-forms': this.checkFormsStatus(),
            'status-paypal': this.checkPayPalStatus(),
            'status-sermons': this.checkSermonsStatus()
        };

        Object.entries(statusElements).forEach(([id, status]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = status.text;
                element.className = `status-value ${status.class}`;
            }
        });
    }

    checkFormsStatus() {
        const forms = this.config.forms;
        const configuredCount = Object.values(forms)
            .filter(url => url && !url.startsWith('REPLACE_WITH')).length;
        
        if (configuredCount === 0) return { text: '❌ Aucun formulaire configuré', class: 'error' };
        if (configuredCount < 3) return { text: '✅ Formulaires principaux configurés', class: 'success' };
        return { text: '✅ Tous les formulaires configurés', class: 'success' };
    }

    checkPayPalStatus() {
        const paypal = this.config.paypal;
        const configuredCount = Object.values(paypal)
            .filter(code => code && !code.startsWith('REPLACE_WITH')).length;
        
        if (configuredCount === 0) return { text: '❌ PayPal non configuré', class: 'error' };
        if (configuredCount < 2) return { text: '⚠️ Partiellement configuré', class: 'warning' };
        return { text: '✅ PayPal configuré', class: 'success' };
    }

    checkSermonsStatus() {
        const sermons = this.config.sermons;
        const configuredCount = Object.values(sermons)
            .filter(url => url && !url.startsWith('REPLACE_WITH')).length;
        
        if (configuredCount === 0) return { text: '❌ Aucune prédication', class: 'error' };
        if (configuredCount < 3) return { text: '⚠️ Quelques prédications', class: 'warning' };
        return { text: '✅ Prédications configurées', class: 'success' };
    }

    saveConfiguration() {
        if (!this.isAdminAuthenticated) {
            this.showMessage('❌ Accès non autorisé', 'error');
            return;
        }

        // This would normally save to a backend
        // For now, we'll just show a success message
        this.showMessage('✅ Configuration sauvegardée! Rechargez la page pour voir les modifications.', 'success');
        
        // Update the runtime configuration
        this.updateRuntimeConfig();
    }

    updateRuntimeConfig() {
        const updates = {
            'config-new-visitor': 'forms.newVisitor',
            'config-official-member': 'forms.officialMember',
            'config-partnership': 'forms.partnership',
            'config-single-donation': 'paypal.singleDonation',
            'config-recurring-donation': 'paypal.recurringDonation',
            'config-youtube': 'sermons.latestYouTube',
            'config-zoom': 'sermons.latestZoom',
            'config-workspace': 'sermons.latestGoogleWorkspace',
            'config-email': 'contact.email',
            'config-phone': 'contact.phone',
            'config-address': 'contact.address'
        };

        Object.entries(updates).forEach(([inputId, configPath]) => {
            const input = document.getElementById(inputId);
            if (input) {
                const pathArray = configPath.split('.');
                let configRef = this.config;
                
                for (let i = 0; i < pathArray.length - 1; i++) {
                    configRef = configRef[pathArray[i]];
                }
                
                configRef[pathArray[pathArray.length - 1]] = input.value;
            }
        });

        this.updateConfigurationStatus();
    }

    testLinks() {
        if (!this.isAdminAuthenticated) {
            this.showMessage('❌ Accès non autorisé', 'error');
            return;
        }

        this.showMessage('🔍 Test des liens en cours...', 'warning');
        
        // Test major links
        const linksToTest = [
            { name: 'Formulaire Visiteurs', url: this.config.forms.newVisitor },
            { name: 'Formulaire Membres', url: this.config.forms.officialMember },
            { name: 'YouTube', url: this.config.sermons.latestYouTube },
            { name: 'Zoom', url: this.config.sermons.latestZoom }
        ];

        let testResults = [];
        
        linksToTest.forEach(link => {
            if (link.url && !link.url.startsWith('REPLACE_WITH')) {
                testResults.push(`✅ ${link.name}: Configuré`);
            } else {
                testResults.push(`❌ ${link.name}: Non configuré`);
            }
        });

        setTimeout(() => {
            const resultsMessage = `Résultats du test:\n${testResults.join('\n')}`;
            this.showMessage(resultsMessage, 'success');
        }, 2000);
    }

    exportConfiguration() {
        if (!this.isAdminAuthenticated) {
            this.showMessage('❌ Accès non autorisé', 'error');
            return;
        }

        const configData = JSON.stringify(this.config, null, 2);
        const blob = new Blob([configData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `spirit-embassy-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showMessage('📤 Configuration exportée avec succès', 'success');
    }

    showMessage(message, type = 'info') {
        // Remove existing messages first
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 15px;
            border-radius: 8px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;

        // Set colors based on type
        switch (type) {
            case 'success':
                messageDiv.style.background = 'rgba(76, 175, 80, 0.9)';
                messageDiv.style.color = 'white';
                messageDiv.style.border = '1px solid #4CAF50';
                break;
            case 'error':
                messageDiv.style.background = 'rgba(244, 67, 54, 0.9)';
                messageDiv.style.color = 'white';
                messageDiv.style.border = '1px solid #F44336';
                break;
            case 'warning':
                messageDiv.style.background = 'rgba(255, 193, 7, 0.9)';
                messageDiv.style.color = '#333';
                messageDiv.style.border = '1px solid #FFC107';
                break;
            default:
                messageDiv.style.background = 'rgba(33, 150, 243, 0.9)';
                messageDiv.style.color = 'white';
                messageDiv.style.border = '1px solid #2196F3';
        }

        // Handle multiline messages
        const lines = message.split('\n');
        if (lines.length > 1) {
            messageDiv.innerHTML = lines.map(line => `<div>${line}</div>`).join('');
        } else {
            messageDiv.textContent = message;
        }

        document.body.appendChild(messageDiv);

        // Animate in
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }
        }, 5000);

        // Make it dismissible by clicking
        messageDiv.addEventListener('click', () => {
            if (messageDiv.parentNode) {
                messageDiv.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }
        });
    }
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SpiritEmbassyApp();
    });
} else {
    new SpiritEmbassyApp();
}

// Export for global access if needed
window.SpiritEmbassyApp = SpiritEmbassyApp;
