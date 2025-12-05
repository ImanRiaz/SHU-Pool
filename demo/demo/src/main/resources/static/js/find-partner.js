// Sample data store
let posts = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@shu.edu.pk",
        role: "driver",
        pickup: "Downtown",
        destination: "SHU Campus",
        time: "8:00 AM",
        date: "Today",
        seats: 3,
        gender: "any",
        contact: "",
        note: "Happy to share the ride! Regular commuter.",
        timestamp: new Date()
    },
    {
        id: 2,
        name: "Mike Chen",
        email: "mike@shu.edu.pk",
        role: "passenger",
        pickup: "Gulshan",
        destination: "SHU Campus",
        time: "2:00 PM",
        date: "Tomorrow",
        seats: null,
        gender: "any",
        contact: "",
        note: "Need a ride to campus for a class.",
        timestamp: new Date(Date.now() + 86400000)
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderPosts(posts);
    initializeFormHandlers();
    initializeFilterHandlers();
    setDefaultDateTime();
});

// Set default date and time
function setDefaultDateTime() {
    const dateInput = document.getElementById('pickupDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Form handlers
function initializeFormHandlers() {
    const form = document.getElementById('postForm');
    const clearBtn = document.getElementById('clearBtn');
    const roleSelect = document.getElementById('roleSelect');
    const seatsInput = document.getElementById('seats');

    // Handle role change
    roleSelect.addEventListener('change', function() {
        if (this.value === 'passenger') {
            seatsInput.disabled = true;
            seatsInput.value = '';
        } else {
            seatsInput.disabled = false;
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            id: Date.now(),
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            role: document.getElementById('roleSelect').value,
            pickup: document.getElementById('pickupLocation').value,
            destination: document.getElementById('destination').value,
            time: formatTime(document.getElementById('pickupTime').value),
            date: formatDate(document.getElementById('pickupDate').value),
            seats: document.getElementById('seats').value ? parseInt(document.getElementById('seats').value) : null,
            gender: document.getElementById('genderPref').value,
            contact: document.getElementById('contactNumber').value,
            note: document.getElementById('notes').value,
            timestamp: new Date()
        };

        posts.unshift(formData);
        renderPosts(posts);
        form.reset();

        // Show success message
        showNotification('Post created successfully!', 'success');

        // Scroll to posts section
        document.querySelector('.posts-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Clear button
    clearBtn.addEventListener('click', function() {
        form.reset();
    });
}

// Filter handlers
function initializeFilterHandlers() {
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');

    applyBtn.addEventListener('click', function() {
        const roleFilter = document.getElementById('filterRole').value;
        const locationFilter = document.getElementById('filterLocation').value.toLowerCase();
        const genderFilter = document.getElementById('filterGender').value;

        let filteredPosts = posts;

        // Apply role filter
        if (roleFilter !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.role === roleFilter);
        }

        // Apply location filter
        if (locationFilter) {
            filteredPosts = filteredPosts.filter(post =>
                post.pickup.toLowerCase().includes(locationFilter) ||
                post.destination.toLowerCase().includes(locationFilter)
            );
        }

        // Apply gender filter
        if (genderFilter !== 'any') {
            filteredPosts = filteredPosts.filter(post =>
                post.gender === 'any' || post.gender === genderFilter
            );
        }

        renderPosts(filteredPosts);
        showNotification(`Found ${filteredPosts.length} post(s)`, 'info');
    });

    resetBtn.addEventListener('click', function() {
        document.getElementById('filterRole').value = 'all';
        document.getElementById('filterLocation').value = '';
        document.getElementById('filterGender').value = 'any';
        renderPosts(posts);
    });
}

// Render posts
function renderPosts(postsToRender) {
    const postsList = document.getElementById('postsList');
    const postsCount = document.getElementById('postsCount');

    postsCount.textContent = `${postsToRender.length} post${postsToRender.length !== 1 ? 's' : ''} found`;

    if (postsToRender.length === 0) {
        postsList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                <h3>No posts found</h3>
                <p>Try adjusting your filters or create a new post</p>
            </div>
        `;
        return;
    }

    postsList.innerHTML = postsToRender.map(post => `
        <div class="post-card">
            <div class="post-avatar">${getAvatar(post.name)}</div>

            <div class="post-user">
                <div class="post-name">${post.name}</div>
                <div class="post-role ${post.role}">
                    ${post.role === 'driver' ?
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2M5 17v4m14-4v4M8 21h8M7 8h10"/></svg>' :
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>'
                    }
                    ${post.role === 'driver' ? 'Driver' : 'Passenger'}
                </div>
                <div class="post-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    ${post.date}, ${post.time}
                </div>
            </div>

            <div class="post-details">
                <div class="post-route">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${post.pickup}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3" fill="currentColor"/>
                    </svg>
                    ${post.destination}
                </div>
                ${post.seats ? `
                    <div class="post-seats">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                        </svg>
                        ${post.seats} seat${post.seats !== 1 ? 's' : ''} available
                    </div>
                ` : ''}
                ${post.note ? `<div class="post-note">${post.note}</div>` : ''}
            </div>

            <button class="post-action" onclick="contactUser('${post.name}', '${post.email}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Contact
            </button>
        </div>
    `).join('');
}

// Utility functions
function getAvatar(name) {
    const emojis = ['👨', '👩', '🧑', '👨‍💼', '👩‍💼', '🧔', '👱‍♀️', '👱‍♂️'];
    const index = name.length % emojis.length;
    return emojis[index];
}

function formatTime(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

function contactUser(name, email) {
    showNotification(`Contacting ${name}... You can reach them at ${email}`, 'success');
    // In a real application, this would open a messaging interface
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0066CC'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});