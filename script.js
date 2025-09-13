// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Scroll-triggered animations
const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
animateOnScroll.forEach(el => observer.observe(el));

// Particles.js initialization (disabled on mobile)
if (document.getElementById('particles-js') && window.innerWidth > 768) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#F4A300' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 2, direction: 'none', random: true }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// Copy discount code
const copyButton = document.getElementById('copy-discount');
if (copyButton) {
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText('STUDENT15OFFAT').then(() => {
            alert('Discount code copied: STUDENT15OFFAT');
        });
    });
}

// Simulated flight search with student discount
const flightSearchForm = document.getElementById('flightSearch');
if (flightSearchForm) {
    flightSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const loading = document.getElementById('loading');
        const results = document.getElementById('results');
        const discountNotice = document.getElementById('discount-notice');
        const studentCount = parseInt(document.getElementById('students').value) || 0;
        
        if (loading && results) {
            loading.classList.remove('hidden');
            results.classList.add('hidden');
            
            // Update prices based on student discount
            const priceElements = document.querySelectorAll('#flight-results span[data-base-price]');
            priceElements.forEach(el => {
                const basePrice = parseFloat(el.getAttribute('data-base-price'));
                const discountedPrice = studentCount > 0 ? (basePrice * 0.85).toFixed(0) : basePrice;
                el.textContent = `CHF ${discountedPrice}`;
            });
            
            // Show/hide discount notice
            if (studentCount > 0) {
                discountNotice.classList.remove('hidden');
            } else {
                discountNotice.classList.add('hidden');
            }
            
            setTimeout(() => {
                loading.classList.add('hidden');
                results.classList.remove('hidden');
            }, 1500);
        }
    });

    // Set default dates
    const today = new Date();
    const departure = document.getElementById('departure');
    const returnDate = document.getElementById('return');
    if (departure && returnDate) {
        departure.valueAsDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        returnDate.valueAsDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    }
}

// Comprehensive airport list, sorted alphabetically by city
const destinations = [
    { code: 'AUH', city: 'Abu Dhabi', country: 'UAE' },
    { code: 'AKL', city: 'Auckland', country: 'New Zealand' },
    { code: 'BCN', city: 'Barcelona', country: 'Spain' },
    { code: 'PEK', city: 'Beijing', country: 'China' },
    { code: 'BOG', city: 'Bogota', country: 'Colombia' },
    { code: 'EZE', city: 'Buenos Aires', country: 'Argentina' },
    { code: 'CAI', city: 'Cairo', country: 'Egypt' },
    { code: 'MAA', city: 'Chennai', country: 'India' },
    { code: 'ORD', city: 'Chicago', country: 'USA' },
    { code: 'CPH', city: 'Copenhagen', country: 'Denmark' },
    { code: 'DEL', city: 'Delhi', country: 'India' },
    { code: 'DOH', city: 'Doha', country: 'Qatar' },
    { code: 'DXB', city: 'Dubai', country: 'UAE' },
    { code: 'DUB', city: 'Dublin', country: 'Ireland' },
    { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
    { code: 'GVA', city: 'Geneva', country: 'Switzerland' },
    { code: 'HEL', city: 'Helsinki', country: 'Finland' },
    { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong' },
    { code: 'IST', city: 'Istanbul', country: 'Turkey' },
    { code: 'CGK', city: 'Jakarta', country: 'Indonesia' },
    { code: 'JNB', city: 'Johannesburg', country: 'South Africa' },
    { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia' },
    { code: 'LED', city: 'Saint Petersburg', country: 'Russia' },
    { code: 'LHR', city: 'London', country: 'UK' },
    { code: 'LAX', city: 'Los Angeles', country: 'USA' },
    { code: 'LIS', city: 'Lisbon', country: 'Portugal' },
    { code: 'MAD', city: 'Madrid', country: 'Spain' },
    { code: 'MNL', city: 'Manila', country: 'Philippines' },
    { code: 'MEL', city: 'Melbourne', country: 'Australia' },
    { code: 'MEX', city: 'Mexico City', country: 'Mexico' },
    { code: 'BOM', city: 'Mumbai', country: 'India' },
    { code: 'MUC', city: 'Munich', country: 'Germany' },
    { code: 'JFK', city: 'New York', country: 'USA' },
    { code: 'NRT', city: 'Tokyo', country: 'Japan' },
    { code: 'HND', city: 'Tokyo', country: 'Japan' },
    { code: 'OSL', city: 'Oslo', country: 'Norway' },
    { code: 'CDG', city: 'Paris', country: 'France' },
    { code: 'FCO', city: 'Rome', country: 'Italy' },
    { code: 'SFO', city: 'San Francisco', country: 'USA' },
    { code: 'GRU', city: 'Sao Paulo', country: 'Brazil' },
    { code: 'ICN', city: 'Seoul', country: 'South Korea' },
    { code: 'PVG', city: 'Shanghai', country: 'China' },
    { code: 'SIN', city: 'Singapore', country: 'Singapore' },
    { code: 'ARN', city: 'Stockholm', country: 'Sweden' },
    { code: 'SYD', city: 'Sydney', country: 'Australia' },
    { code: 'TLV', city: 'Tel Aviv', country: 'Israel' },
    { code: 'BKK', city: 'Bangkok', country: 'Thailand' },
    { code: 'YYZ', city: 'Toronto', country: 'Canada' },
    { code: 'YVR', city: 'Vancouver', country: 'Canada' },
    { code: 'ZRH', city: 'Zurich', country: 'Switzerland' },
    { code: 'SVO', city: 'Moscow', country: 'Russia' }
].sort((a, b) => a.city.localeCompare(b.city));

// Autocomplete for destinations
function showSuggestions(inputId, suggestionsId, query) {
    const suggestionsDiv = document.getElementById(suggestionsId);
    suggestionsDiv.innerHTML = '';
    const filtered = query.length > 0
        ? destinations.filter(dest => 
            dest.code.toLowerCase().includes(query.toLowerCase()) ||
            dest.city.toLowerCase().includes(query.toLowerCase()) ||
            dest.country.toLowerCase().includes(query.toLowerCase())
          )
        : destinations;
    if (filtered.length > 0) {
        filtered.slice(0, 10).forEach(dest => {
            const option = document.createElement('div');
            option.className = 'p-2 hover:bg-gray-100 cursor-pointer';
            option.textContent = `${dest.city} (${dest.code}) - ${dest.country}`;
            option.onclick = () => {
                document.getElementById(inputId).value = `${dest.city} (${dest.code})`;
                suggestionsDiv.classList.add('hidden');
            };
            suggestionsDiv.appendChild(option);
        });
        suggestionsDiv.classList.remove('hidden');
    } else {
        suggestionsDiv.classList.add('hidden');
    }
}

['from', 'to'].forEach(input => {
    const inputEl = document.getElementById(input);
    if (inputEl) {
        inputEl.addEventListener('input', (e) => {
            const suggestionsId = input === 'from' ? 'from-suggestions' : 'to-suggestions';
            showSuggestions(input, suggestionsId, e.target.value);
        });
        inputEl.addEventListener('focus', () => {
            const suggestionsId = input === 'from' ? 'from-suggestions' : 'to-suggestions';
            showSuggestions(input, suggestionsId, '');
        });
        inputEl.addEventListener('blur', () => {
            setTimeout(() => {
                document.getElementById(suggestionsId).classList.add('hidden');
            }, 200);
        });
    }
});