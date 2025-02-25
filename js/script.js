
 


    // script.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Element References
    const monthlyBtn = document.getElementById('monthly');
    const yearlyBtn = document.getElementById('yearly');
    const prices = document.querySelectorAll('.price');
    const saveBadges = document.querySelectorAll('.save-badge');

    // 2. Pricing Update Function
    function updatePricing(isYearly) {
        // Error handling for price elements
        if (!prices.length) {
            console.error('No price 20');
            return;
        }

        prices.forEach(price => {
            if (!price.dataset.monthly || !price.dataset.yearly) {
                console.warn('Missing data attributes on price element:', price);
                return;
            }
            price.textContent = isYearly ? price.dataset.yearly : price.dataset.monthly;
        });

        // Toggle save badges
        saveBadges.forEach(badge => {
            badge.style.display = isYearly ? 'block' : 'none';
        });

        // Update button states
        if (monthlyBtn && yearlyBtn) {
            monthlyBtn.classList.toggle('button-primary', !isYearly);
            monthlyBtn.classList.toggle('button-outline', isYearly);
            yearlyBtn.classList.toggle('button-primary', isYearly);
            yearlyBtn.classList.toggle('button-outline', !isYearly);
        }
    }

    // 3. Event Listeners with Safety Checks
    if (monthlyBtn) {
        monthlyBtn.addEventListener('click', () => {
            updatePricing(false);
            try {
                localStorage.setItem('billingInterval', 'monthly');
            } catch (e) {
                console.warn('Failed to save preference:', e);
            }
        });
    }

    if (yearlyBtn) {
        yearlyBtn.addEventListener('click', () => {
            updatePricing(true);
            try {
                localStorage.setItem('billingInterval', 'yearly');
            } catch (e) {
                console.warn('Failed to save preference:', e);
            }
        });
    }

    // 4. Initialization
    function initialize() {
        // Set current year
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Initialize pricing
        const savedInterval = getSavedPreference();
        updatePricing(savedInterval === 'yearly');
    }

    // Start the application
    initialize();
});

function getSavedPreference() {
    try {
        return localStorage.getItem('billingInterval') || 'monthly';
    } catch (e) {
        console.warn('LocalStorage access denied:', e);return 'monthly';
    }
}