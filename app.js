/*
 * SPIRIT EMBASSY FRANCE - CONFIGURATION FILE
 * ===========================================
 * 
 * IMPORTANT: This section contains ALL external links and integrations.
 * To update the website, simply modify the values below and save this file.
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
    // GOOGLE FORMS - Replace with your actual form URLs
    forms: {
        newVisitor: "REPLACE_WITH_YOUR_NEW_VISITOR_FORM_URL",
        officialMember: "REPLACE_WITH_YOUR_OFFICIAL_MEMBER_FORM_URL", 
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
        facebook: "REPLACE_WITH_FACEBOOK_PAGE_URL",
        instagram: "REPLACE_WITH_INSTAGRAM_ACCOUNT_URL",
        youtube: "REPLACE_WITH_YOUTUBE_CHANNEL_URL",
        googleMaps: "REPLACE_WITH_GOOGLE_MAPS_LOCATION_URL"
    },
    
    // CHURCH CONTACT INFORMATION - Update with actual details
    contact: {
        email: "contact@spiritembassyfrance.fr",
        phone: "REPLACE_WITH_ACTUAL_PHONE_NUMBER",
        address: "REPLACE_WITH_ACTUAL_CHURCH_ADDRESS",
        city: "Paris",
        postalCode: "75001"
    },
    
    // EVENTS MANAGEMENT - Will be populated dynamically
    events: [
        // Example event structure:
        // {
        //     id: 1,
        //     title: "Conférence Spéciale",
        //     date: "2025-10-15",
        //     time: "19:00",
        //     description: "Une soirée exceptionnelle de louange et d'enseignement",
        //     location: "Sanctuaire principal"
        // }
    ],
    
    // ADMIN SETTINGS
    admin: {
        password: "SpiritEmbassy2025", // Change this password for security
        maintenanceMode: false
    }
};

// =============================================================================
// APPLICATION CODE - DO NOT EDIT BELOW THIS LINE
// =============================================================================

class SpiritEmbassyApp {
    constructor() {
        this.config = CHURCH_CONFIG;
        this.isAdminMode = false;
        this.init();
    }

    init() {
        this.loadStoredData();
        this.applyConfiguration();
        this.setupEventListeners();
        this.validateConfiguration();
    }

    setupEventListeners() {
        // Setup event listeners immediately if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
            });
        } else {
            // DOM is already ready
            this.bindEvents();
        }
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Mobile navigation toggle
        this.setupMobileNavigation();
        
        // Smooth scrolling for navigation
        this.setupSmoothScrolling();

        // Header transparency on scroll
        this.setupScrollEffects();

        // Admin access button
        this.setupAdminAccess();

        // Tab switching in admin panel
        this.setupAdminTabs();
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        console.log('Setting up mobile navigation:', { navToggle, navMenu });
        
        if (navToggle && navMenu) {
            // Remove any existing event listeners
            navToggle.replaceWith(navToggle.cloneNode(true));
            const newNavToggle = document.getElementById('nav-toggle');
            
            newNavToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Nav toggle clicked');
                
                newNavToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Close menu when clicking outside
                if (navMenu.classList.contains('active')) {
                    document.addEventListener('click', (event) => {
                        if (!navMenu.contains(event.target) && !newNavToggle.contains(event.target)) {
                            newNavToggle.classList.remove('active');
                            navMenu.classList.remove('active');
                        }
                    }, { once: true });
                }
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Close mobile menu if open
                    const navToggle = document.getElementById('nav-toggle');
                    const navMenu = document.getElementById('nav-menu');
                    if (navToggle && navMenu) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const header = document.querySelector('.header');
                    if (header) {
                        const scrolled = window.scrollY > 100;
                        header.style.background = scrolled 
                            ? 'rgba(26, 26, 46, 0.98)' 
                            : 'rgba(26, 26, 46, 0.95)';
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }

    setupAdminAccess() {
        const adminButtons = document.querySelectorAll('.admin-access');
        console.log('Setting up admin access for buttons:', adminButtons.length);
        
        adminButtons.forEach(button => {
            // Remove any existing event listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Admin button clicked');
                this.toggleAdmin();
            });
        });
    }

    setupAdminTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonText = e.target.textContent.toLowerCase().trim();
                const tabMap = {
                    'formulaires': 'forms',
                    'paiements': 'payments', 
                    'prédications': 'sermons',
                    'événements': 'events',
                    'liens': 'links'
                };
                const tabName = tabMap[buttonText];
                if (tabName) {
                    this.showTab(tabName);
                }
            });
        });
    }

    validateConfiguration() {
        const issues = [];
        
        // Check for placeholder values
        const checkPlaceholders = (obj, path = '') => {
            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'string' && value.includes('REPLACE_WITH_')) {
                    issues.push(`${path}${key}: Placeholder not replaced`);
                } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    checkPlaceholders(value, `${path}${key}.`);
                }
            }
        };
        
        checkPlaceholders(this.config);
        
        if (issues.length > 0 && this.isAdminMode) {
            console.warn('Configuration issues found:', issues);
            this.showConfigurationStatus(issues);
        }
    }

    showConfigurationStatus(issues) {
        if (!this.isAdminMode) return;
        
        const adminSection = document.getElementById('configuration');
        if (!adminSection) return;
        
        // Remove existing status
        const existingStatus = adminSection.querySelector('.config-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        const statusDiv = document.createElement('div');
        statusDiv.className = 'config-status';
        statusDiv.innerHTML = `
            <div style="background: rgba(255, 193, 7, 0.15); border: 1px solid rgba(255, 193, 7, 0.5); border-radius: 8px; padding: 16px; margin: 20px 0;">
                <h4 style="color: #ffc107; margin-bottom: 12px;">⚠️ Configuration incomplète</h4>
                <p style="margin-bottom: 8px;">Éléments à configurer:</p>
                <ul style="margin: 8px 0 0 20px; color: #ffc107;">
                    ${issues.slice(0, 10).map(issue => `<li style="margin: 4px 0; font-size: 14px;">${issue}</li>`).join('')}
                    ${issues.length > 10 ? `<li style="margin: 4px 0; font-style: italic;">... et ${issues.length - 10} autres</li>` : ''}
                </ul>
            </div>
        `;
        
        adminSection.insertBefore(statusDiv, adminSection.firstChild);
    }

    // Configuration Management
    applyConfiguration() {
        this.updateContactInfo();
        this.updateSocialLinks();
        this.updatePayPalButtons();
        this.updateSermons();
        this.updateEvents();
    }

    updateContactInfo() {
        // Update footer contact information
        const contactElements = document.querySelectorAll('[data-contact]');
        contactElements.forEach(element => {
            const contactType = element.getAttribute('data-contact');
            if (this.config.contact[contactType] && 
                !this.config.contact[contactType].includes('REPLACE_WITH_')) {
                element.textContent = this.config.contact[contactType];
            }
        });
    }

    updateSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            const platform = link.textContent.toLowerCase();
            if (this.config.social[platform] && 
                !this.config.social[platform].includes('REPLACE_WITH_')) {
                link.href = this.config.social[platform];
            }
        });
    }

    updatePayPalButtons() {
        if (this.config.paypal.singleDonation && 
            !this.config.paypal.singleDonation.includes('REPLACE_WITH_')) {
            const singleContainer = document.getElementById('paypal-single');
            if (singleContainer) {
                singleContainer.innerHTML = this.config.paypal.singleDonation;
            }
        }

        if (this.config.paypal.recurringDonation && 
            !this.config.paypal.recurringDonation.includes('REPLACE_WITH_')) {
            const recurringContainer = document.getElementById('paypal-recurring');
            if (recurringContainer) {
                recurringContainer.innerHTML = this.config.paypal.recurringDonation;
            }
        }
    }

    updateSermons() {
        const sermonIds = ['sermon1', 'sermon2', 'sermon3'];
        sermonIds.forEach(sermonId => {
            if (this.config.sermons[sermonId] && 
                !this.config.sermons[sermonId].includes('REPLACE_WITH_')) {
                this.displaySermon(sermonId, this.config.sermons[sermonId]);
            }
        });
    }

    displaySermon(sermonId, url) {
        const sermonCard = document.querySelector(`[data-sermon="${sermonId}"]`);
        if (!sermonCard) return;

        const playerContainer = sermonCard.querySelector('.sermon-player');
        if (!playerContainer) return;

        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = this.extractYouTubeId(url);
            if (videoId) {
                playerContainer.innerHTML = `
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                                src="https://www.youtube.com/embed/${videoId}" 
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                    </div>
                `;
            }
        } else if (url.includes('zoom.us')) {
            playerContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>📹 Enregistrement Zoom</p>
                    <a href="${url}" target="_blank" class="btn btn-primary">Regarder</a>
                </div>
            `;
        } else {
            playerContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <a href="${url}" target="_blank" class="btn btn-primary">Écouter/Regarder</a>
                </div>
            `;
        }
    }

    extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    updateEvents() {
        const eventsContainer = document.getElementById('events-list');
        if (!eventsContainer) return;

        if (this.config.events.length === 0) {
            eventsContainer.innerHTML = '<p>Aucun événement spécial programmé pour le moment.</p>';
            return;
        }

        const eventsHtml = this.config.events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => `
                <div class="event-item" style="background: rgba(26, 26, 46, 0.8); padding: 16px; margin-bottom: 16px; border-radius: 8px; border: 1px solid rgba(255, 0, 110, 0.2);">
                    <h4 style="color: #ff006e; margin-bottom: 8px;">${this.escapeHtml(event.title)}</h4>
                    <p style="color: #00d4ff; margin-bottom: 8px;">
                        ${this.formatDate(event.date)} 
                        ${event.time ? 'à ' + event.time : ''}
                        ${event.location ? ' - ' + event.location : ''}
                    </p>
                    <p style="margin-bottom: 12px;">${this.escapeHtml(event.description)}</p>
                    <button class="btn btn-secondary" onclick="app.registerForEvent('${this.escapeHtml(event.title)}')">
                        S'inscrire
                    </button>
                </div>
            `).join('');

        eventsContainer.innerHTML = eventsHtml;
    }

    // Form Management
    openForm(formType) {
        const formUrl = this.config.forms[formType];
        
        if (formUrl && this.isValidUrl(formUrl) && !formUrl.includes('REPLACE_WITH_')) {
            window.open(formUrl, '_blank', 'noopener,noreferrer');
            this.showNotification('Ouverture du formulaire...', 'info');
        } else {
            this.showNotification('Formulaire non configuré. Contactez contact@spiritembassyfrance.fr', 'warning');
        }
    }

    registerForEvent(eventTitle) {
        const registrationUrl = this.config.forms.eventRegistration;
        
        if (registrationUrl && this.isValidUrl(registrationUrl) && !registrationUrl.includes('REPLACE_WITH_')) {
            const url = `${registrationUrl}?event=${encodeURIComponent(eventTitle)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
            this.showNotification('Ouverture de l\'inscription...', 'info');
        } else {
            const phone = this.config.contact.phone.includes('REPLACE_WITH_') 
                ? 'contact@spiritembassyfrance.fr' 
                : this.config.contact.phone;
            this.showNotification(`Inscription: ${phone}`, 'info');
        }
    }

    // Admin Panel Functions
    toggleAdmin() {
        console.log('toggleAdmin called');
        const password = prompt('Mot de passe administrateur:');
        
        if (password === this.config.admin.password) {
            this.isAdminMode = !this.isAdminMode;
            const adminSection = document.getElementById('configuration');
            
            if (this.isAdminMode) {
                console.log('Activating admin mode');
                adminSection.classList.remove('hidden');
                this.showNotification('Mode administrateur activé', 'success');
                this.populateAdminFields();
                this.validateConfiguration();
                
                setTimeout(() => {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = adminSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            } else {
                console.log('Deactivating admin mode');
                adminSection.classList.add('hidden');
                this.showNotification('Mode administrateur désactivé', 'info');
            }
        } else if (password !== null) {
            this.showNotification('Mot de passe incorrect', 'error');
        }
    }

    showTab(tabName) {
        console.log('Showing tab:', tabName);
        
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Add active class to selected tab
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Activate corresponding button
        const buttonTexts = {
            'forms': 'formulaires',
            'payments': 'paiements',
            'sermons': 'prédications', 
            'events': 'événements',
            'links': 'liens'
        };
        
        document.querySelectorAll('.tab-button').forEach(button => {
            if (button.textContent.toLowerCase().trim() === buttonTexts[tabName]) {
                button.classList.add('active');
            }
        });
    }

    populateAdminFields() {
        setTimeout(() => {
            // Populate form fields with current config values
            const formMappings = {
                'config-new-visitor': 'forms.newVisitor',
                'config-official-member': 'forms.officialMember',
                'config-partnership': 'forms.partnership',
                'config-event-registration': 'forms.eventRegistration'
            };

            Object.entries(formMappings).forEach(([fieldId, configPath]) => {
                const field = document.getElementById(fieldId);
                const value = this.getNestedValue(this.config, configPath);
                if (field && value) {
                    field.value = value;
                }
            });

            // Populate PayPal fields
            const paypalField1 = document.getElementById('config-paypal-single');
            const paypalField2 = document.getElementById('config-paypal-recurring');
            
            if (paypalField1) paypalField1.value = this.config.paypal.singleDonation || '';
            if (paypalField2) paypalField2.value = this.config.paypal.recurringDonation || '';

            // Populate social media fields
            const socialFields = {
                'config-facebook': 'social.facebook',
                'config-instagram': 'social.instagram', 
                'config-youtube': 'social.youtube',
                'config-maps': 'social.googleMaps'
            };

            Object.entries(socialFields).forEach(([fieldId, configPath]) => {
                const field = document.getElementById(fieldId);
                const value = this.getNestedValue(this.config, configPath);
                if (field && value) {
                    field.value = value;
                }
            });

            // Populate sermon fields
            ['sermon1', 'sermon2', 'sermon3'].forEach(sermonId => {
                const field = document.getElementById(`config-${sermonId}`);
                if (field && this.config.sermons[sermonId]) {
                    field.value = this.config.sermons[sermonId];
                }
            });
        }, 100);
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => current[key], obj);
        target[lastKey] = value;
    }

    saveConfiguration(configPath, value) {
        this.setNestedValue(this.config, configPath, value);
        this.saveToStorage();
        this.applyConfiguration();
        this.showNotification('Configuration sauvegardée!', 'success');
    }

    addEvent() {
        const title = document.getElementById('event-title')?.value.trim();
        const date = document.getElementById('event-date')?.value;
        const time = document.getElementById('event-time')?.value;
        const description = document.getElementById('event-description')?.value.trim();
        const location = document.getElementById('event-location')?.value.trim();

        if (title && date && description) {
            const newEvent = {
                id: Date.now(),
                title,
                date,
                time: time || '',
                description,
                location: location || 'Église Spirit Embassy France',
                created: new Date().toISOString()
            };

            this.config.events.push(newEvent);
            this.saveToStorage();
            this.updateEvents();
            
            // Clear form
            ['event-title', 'event-date', 'event-time', 'event-description', 'event-location'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });

            this.showNotification('Événement ajouté!', 'success');
        } else {
            this.showNotification('Titre, date et description requis', 'error');
        }
    }

    testLink(url, type = 'generic') {
        if (!url || url.includes('REPLACE_WITH_')) {
            this.showNotification('Lien non configuré', 'warning');
            return false;
        }

        if (!this.isValidUrl(url)) {
            this.showNotification('URL invalide', 'error');
            return false;
        }

        window.open(url, '_blank', 'noopener,noreferrer');
        this.showNotification(`Test du lien ${type}...`, 'info');
        return true;
    }

    // Utility Functions
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Data Persistence
    saveToStorage() {
        try {
            const dataToStore = {
                events: this.config.events,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('spiritEmbassyConfig', JSON.stringify(dataToStore));
        } catch (error) {
            console.warn('Storage not available:', error);
        }
    }

    loadStoredData() {
        try {
            const stored = localStorage.getItem('spiritEmbassyConfig');
            if (stored) {
                const data = JSON.parse(stored);
                if (data.events) {
                    this.config.events = data.events;
                }
            }
        } catch (error) {
            console.warn('Could not load stored data:', error);
        }
    }

    // Notification System
    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#4ecdc4',
            error: '#ff6b6b',
            warning: '#ffeaa7',
            info: '#00d4ff'
        };

        notification.innerHTML = `
            <span>${this.escapeHtml(message)}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 10px; font-size: 18px;">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            background-color: ${colors[type] || colors.info};
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            font-size: 14px;
            animation: slideInRight 0.3s ease-out;
            font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        `;

        // Add CSS animation if not exists
        if (!document.querySelector('#notification-animation')) {
            const style = document.createElement('style');
            style.id = 'notification-animation';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Global function exports for HTML onclick handlers
function openForm(formType) {
    if (window.app) {
        window.app.openForm(formType);
    }
}

function registerForEvent(eventTitle) {
    if (window.app) {
        window.app.registerForEvent(eventTitle);
    }
}

function toggleAdmin() {
    if (window.app) {
        window.app.toggleAdmin();
    }
}

function addEvent() {
    if (window.app) {
        window.app.addEvent();
    }
}

function saveConfig(configPath, elementId) {
    if (window.app) {
        const element = document.getElementById(elementId);
        if (element) {
            window.app.saveConfiguration(configPath, element.value.trim());
        }
    }
}

function testLink(url, type) {
    if (window.app) {
        window.app.testLink(url, type);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Spirit Embassy App');
    window.app = new SpiritEmbassyApp();
});

// Also initialize if DOM is already loaded
if (document.readyState !== 'loading') {
    console.log('DOM Already Ready - Initializing Spirit Embassy App');
    window.app = new SpiritEmbassyApp();
}

// Service Worker Registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            console.log('Service Worker not available');
        });
    });
}
