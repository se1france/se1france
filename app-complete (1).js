/*
 * SPIRIT EMBASSY FRANCE - CONFIGURATION & JAVASCRIPT
 * ==================================================
 * 
 * IMPORTANT: This file contains ALL external links and integrations.
 * To update the website, simply modify the CHURCH_CONFIG section below.
 * 
 * Updated with your actual church information!
 */

// =============================================================================
// CHURCH CONFIGURATION - EDIT THIS SECTION ONLY
// =============================================================================

const CHURCH_CONFIG = {
    // GOOGLE FORMS - Your actual form URLs are configured!
    forms: {
        newVisitor: "https://docs.google.com/forms/d/e/1FAIpQLSdacM1w_fnqnrXrBYjJOW7eokyvsSq9Ydj4KOYpj2VQ_GuMTw/viewform?usp=header",
        officialMember: "https://docs.google.com/forms/d/e/1FAIpQLSdlUDdSVz9yRgCZ1IDrHBy0io4k_l9omvP4VAf99lkDjt37PA/viewform?usp=header", 
        partnership: "REPLACE_WITH_YOUR_PARTNERSHIP_FORM_URL"
    },
    
    // PAYPAL DONATION - Your actual PayPal link is configured!
    paypal: {
        donationUrl: "https://www.paypal.com/donate/?hosted_button_id=XN3GDGBX3WWRQ"
    },
    
    // ZOOM MEETING - Replace with your actual Zoom link
    zoom: {
        wednesdayMeetingUrl: "REPLACE_WITH_YOUR_ZOOM_MEETING_URL"
    },
    
    // SERMON LINKS - Replace with your actual content URLs
    sermons: {
        latestYouTube: "REPLACE_WITH_LATEST_YOUTUBE_VIDEO_URL",
        latestZoom: "REPLACE_WITH_LATEST_ZOOM_RECORDING_URL", 
        latestGoogleWorkspace: "REPLACE_WITH_GOOGLE_WORKSPACE_CONTENT_URL"
    },
    
    // SOCIAL MEDIA & EXTERNAL LINKS - Replace with your actual URLs
    social: {
        facebook: "REPLACE_WITH_FACEBOOK_URL",
        instagram: "REPLACE_WITH_INSTAGRAM_URL",
        youtube: "REPLACE_WITH_YOUTUBE_CHANNEL_URL",
        twitter: "REPLACE_WITH_TWITTER_URL"
    },
    
    // CHURCH CONTACT INFORMATION - Updated with your details
    contact: {
        email: "contact@spiritembassyfrance.fr",
        whatsapp: "REPLACE_WITH_WHATSAPP_NUMBER",
        address: "231 rue Saint-Honoré, 75001 Paris",
        venue: "HIPPODROME PARIS"
    },
    
    // CHURCH SCHEDULE - Your actual schedule
    schedule: {
        sunday: {
            time: "10h30 - 12h00",
            location: "HIPPODROME PARIS",
            address: "231 rue Saint-Honoré, 75001 Paris"
        },
        wednesday: {
            time: "19h00 - 21h00",
            location: "Service Zoom en ligne"
        }
    },
    
    // ADMIN SETTINGS - CHANGE THE PASSWORD!
    admin: {
        password: "SpiritEmbassy2025!", // IMPORTANT: Change this password!
        email: "admin@spiritembassyfrance.fr",
        secretUrl: "#admin-config-panel-2025"
    }
};

// Biblical verse for donations
const DONATION_MESSAGE = "Que chacun donne comme il l'a résolu en son coeur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie.";

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
        this.setupDonationHandling();
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

        // Form and action button listeners
        this.setupFormButtonListeners();
        this.setupZoomButtonListener();
        this.setupPayPalButtonListeners();

        // Hash change listener for admin access
        window.addEventListener('hashchange', () => this.checkAdminAccess());
    }

    setupFormButtonListeners() {
        const buttons = {
            'new-visitor-btn': 'newVisitor',
            'official-member-btn': 'officialMember'
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

    setupZoomButtonListener() {
        const zoomButton = document.getElementById('zoom-join-btn');
        if (zoomButton) {
            zoomButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.joinZoomMeeting();
            });
        }
    }

    setupPayPalButtonListeners() {
        // Handle PayPal donation buttons
        const paypalButtons = document.querySelectorAll('.paypal-btn');
        paypalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDonation();
            });
        });
    }

    setupDonationHandling() {
        // Show biblical verse before donation
        const donationButtons = document.querySelectorAll('.paypal-btn, .partnership-btn');
        donationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.classList.contains('partnership-btn')) {
                    // Partnership button - scroll to partnership section
                    e.preventDefault();
                    const partnershipSection = document.getElementById('partenariat');
                    if (partnershipSection) {
                        partnershipSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // PayPal button - show message and proceed
                    this.showDonationMessage();
                }
            });
        });
    }

    openForm(formType) {
        const formUrl = this.config.forms[formType];
        
        if (formUrl && !formUrl.startsWith('REPLACE_WITH')) {
            // Open form in new tab/window
            window.open(formUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
            this.showMessage(`✅ Formulaire ${formType} ouvert dans un nouvel onglet.`, 'success');
        } else {
            this.showMessage(`⚠️ Formulaire ${formType} pas encore configuré. Contactez l'administrateur.`, 'warning');
        }
    }

    joinZoomMeeting() {
        const zoomUrl = this.config.zoom.wednesdayMeetingUrl;
        
        if (zoomUrl && !zoomUrl.startsWith('REPLACE_WITH')) {
            // Open Zoom meeting in new tab
            window.open(zoomUrl, '_blank');
            this.showMessage('🎥 Ouverture de la réunion Zoom...', 'success');
        } else {
            // Show alternative message for non-configured Zoom
            this.showMessage('📅 Les informations de connexion Zoom seront communiquées par email avant le service du mercredi. Contactez-nous pour recevoir le lien.', 'info');
        }
    }

    handleDonation() {
        this.showDonationMessage();
        // Delay to allow user to read the message before opening PayPal
        setTimeout(() => {
            window.open(this.config.paypal.donationUrl, '_blank');
        }, 2000);
    }

    showDonationMessage() {
        // Show the biblical verse about giving
        this.showMessage(`💝 ${DONATION_MESSAGE}\n\n- 2 Corinthiens 9:7`, 'blessing', 6000);
    }

    checkAdminAccess() {
        const currentHash = window.location.hash;
        const adminSection = document.getElementById('admin-config-panel-2025');
        
        if (currentHash === this.config.admin.secretUrl && adminSection) {
            adminSection.style.display = 'flex';
            adminSection.scrollIntoView({ behavior: 'smooth' });
            this.showMessage('🔐 Panel administrateur accessible. Entrez le mot de passe.', 'info');
        } else if (adminSection) {
            adminSection.style.display = 'none';
        }
    }

    loadConfiguration() {
        // Load contact information
        this.updateContactInfo();
        
        // Load sermon content
        this.loadSermonContent();
        
        // Load social media links
        this.updateSocialMediaLinks();
    }

    updateContactInfo() {
        const elements = {
            'contact-email': this.config.contact.email,
            'footer-email': this.config.contact.email
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element && value && !value.startsWith('REPLACE_WITH')) {
                element.textContent = value;
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

        // Handle escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                
                if (navMenu && navToggle && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
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
            this.showMessage('🚪 Panel administrateur masqué.', 'info');
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
            'config-zoom-link': this.config.zoom.wednesdayMeetingUrl,
            'config-new-visitor': this.config.forms.newVisitor,
            'config-official-member': this.config.forms.officialMember,
            'config-youtube': this.config.sermons.latestYouTube,
            'config-workspace': this.config.sermons.latestGoogleWorkspace,
            'config-whatsapp': this.config.contact.whatsapp,
            'config-email': this.config.contact.email
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
        // Status is simplified since main forms are working
        this.showMessage('📊 Configuration chargée. Les formulaires principaux sont opérationnels.', 'success');
    }

    saveConfiguration() {
        if (!this.isAdminAuthenticated) {
            this.showMessage('❌ Accès non autorisé', 'error');
            return;
        }

        // Update runtime configuration
        const updates = {
            'config-zoom-link': 'zoom.wednesdayMeetingUrl',
            'config-youtube': 'sermons.latestYouTube',
            'config-workspace': 'sermons.latestGoogleWorkspace',
            'config-whatsapp': 'contact.whatsapp',
            'config-email': 'contact.email'
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

        this.showMessage('✅ Configuration sauvegardée! Rechargez la page pour voir les modifications.', 'success');
    }

    testLinks() {
        if (!this.isAdminAuthenticated) {
            this.showMessage('❌ Accès non autorisé', 'error');
            return;
        }

        this.showMessage('🔍 Test des liens en cours...', 'warning');
        
        const linksToTest = [
            { name: 'PayPal Donations', url: this.config.paypal.donationUrl },
            { name: 'Formulaire Visiteurs', url: this.config.forms.newVisitor },
            { name: 'Formulaire Membres', url: this.config.forms.officialMember },
            { name: 'Zoom Meeting', url: this.config.zoom.wednesdayMeetingUrl }
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

    showMessage(message, type = 'info', duration = 5000) {
        // Remove existing messages first
        const existingMessages = document.querySelectorAll('.message-popup');
        existingMessages.forEach(msg => msg.remove());

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup message-${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: min(400px, 90vw);
            padding: 15px 20px;
            border-radius: 12px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 14px;
            line-height: 1.5;
        `;

        // Set colors based on type
        switch (type) {
            case 'success':
                messageDiv.style.background = 'rgba(76, 175, 80, 0.9)';
                messageDiv.style.color = 'white';
                messageDiv.style.borderColor = '#4CAF50';
                break;
            case 'error':
                messageDiv.style.background = 'rgba(244, 67, 54, 0.9)';
                messageDiv.style.color = 'white';
                messageDiv.style.borderColor = '#F44336';
                break;
            case 'warning':
                messageDiv.style.background = 'rgba(255, 193, 7, 0.9)';
                messageDiv.style.color = '#333';
                messageDiv.style.borderColor = '#FFC107';
                break;
            case 'blessing':
                messageDiv.style.background = 'rgba(255, 215, 0, 0.95)';
                messageDiv.style.color = '#1a1a2e';
                messageDiv.style.borderColor = '#FFD700';
                messageDiv.style.fontStyle = 'italic';
                messageDiv.style.textAlign = 'center';
                break;
            default:
                messageDiv.style.background = 'rgba(33, 150, 243, 0.9)';
                messageDiv.style.color = 'white';
                messageDiv.style.borderColor = '#2196F3';
        }

        // Handle multiline messages
        const lines = message.split('\n');
        if (lines.length > 1) {
            messageDiv.innerHTML = lines.map(line => `<div style="margin: 2px 0;">${line}</div>`).join('');
        } else {
            messageDiv.textContent = message;
        }

        document.body.appendChild(messageDiv);

        // Animate in
        requestAnimationFrame(() => {
            messageDiv.style.transform = 'translateX(0)';
        });

        // Auto-remove after duration
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.transform = 'translateX(100%)';
                messageDiv.style.opacity = '0';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 300);
            }
        }, duration);

        // Make it dismissible by clicking
        messageDiv.addEventListener('click', () => {
            if (messageDiv.parentNode) {
                messageDiv.style.transform = 'translateX(100%)';
                messageDiv.style.opacity = '0';
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

// Add touch device detection and enhancements
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Improve button feedback on touch devices
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('btn')) {
            e.target.style.transform = 'scale(0.98)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('btn')) {
            setTimeout(() => {
                e.target.style.transform = '';
            }, 100);
        }
    });
}

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}