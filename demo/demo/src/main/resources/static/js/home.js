// Hamburger Menu Functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebarMenu.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking a link
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    function toggleTheme() {
        body.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('click', () => {
        toggleTheme();
        themeToggle.style.transition = 'transform 0.3s ease';
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });

    themeToggleSidebar.addEventListener('click', () => {
        toggleTheme();
        themeToggleSidebar.style.transition = 'transform 0.3s ease';
        themeToggleSidebar.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggleSidebar.style.transform = 'rotate(0deg)';
        }, 300);
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.simple-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
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

// Animate feature cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effect for buttons
document.querySelectorAll('.btn-hero').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add active state to sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Hero features animation on load
window.addEventListener('load', () => {
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const rippleElement = button.getElementsByClassName('ripple')[0];
    if (rippleElement) {
        rippleElement.remove();
    }

    button.appendChild(ripple);
}

const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-hero {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.btn-primary, .btn-hero').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation for the page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Feature card click handler
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-8px)';
        }, 100);
    });
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

console.log('%c🚗 Welcome to SHU Pool! 🚗', 'font-size: 20px; color: #0072CE; font-weight: bold;');
console.log('%cRide Together. Save Together.', 'font-size: 14px; color: #666;');

// Dynamic Welcome Message
window.addEventListener("load", async () => {
    const email = localStorage.getItem("userEmail");
    const welcomeEl = document.getElementById("welcomeMessage");

    if (!email || !welcomeEl) return;

    try {
        const response = await fetch(`http://localhost:8080/api/user/info?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Failed to fetch user info");

        const user = await response.json();
        const name = user.fullName || "User";

        let i = 0;
        const text = `Welcome back, ${name}!`;
        welcomeEl.style.width = "auto";
        welcomeEl.textContent = "";

        const type = () => {
            if (i < text.length) {
                welcomeEl.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };

        type();
    } catch (err) {
        console.error("Error loading user:", err);
    }
});

// Navigation Logic
document.addEventListener("DOMContentLoaded", () => {
    console.log("Navigation logic initialized.");

    const postRideBtn = document.querySelector(".btn-hero-primary");
    const findPartnerBtn = document.querySelector(".btn-hero-secondary");

    const goTo = (page) => {
        window.location.href = `${page}.html`;
    };

    if (postRideBtn) postRideBtn.addEventListener("click", () => goTo("post-ride"));
    if (findPartnerBtn) findPartnerBtn.addEventListener("click", () => goTo("find-partner"));

    // ✅ Updated sidebar navigation (fix: allows about.html)
    document.querySelectorAll('.sidebar-link').forEach(link => {
        const href = link.getAttribute('href');

        // If link points to a real HTML file → allow normal navigation
        if (href && href.endsWith('.html')) return;

        // Otherwise use dynamic page name logic
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            goTo(pageName);
        });
    });
});
