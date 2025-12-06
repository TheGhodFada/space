  // Initialize EmailJS
  (function() {
    emailjs.init("rAbopdP5JgvXPgHt3");
})();

// Header scroll effect
window.onscroll = function() {
    const header = document.getElementById("main-header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
};

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Change icon when menu is open
        if (mobileMenu.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fas fa-hamburger"></i>';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-hamburger"></i>';
        });
    });

    // Scroll arrow functionality
    const scrollArrow = document.getElementById('scroll-arrow');
    scrollArrow.addEventListener('click', function() {
        // Scroll to work section
        document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Contact form functionality with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const notificationToast = document.getElementById('notification-toast');
    const notificationMessage = document.getElementById('notification-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Show sending message
        showFormMessage('Sending message...', 'success');
        
        // Send email using EmailJS with corrected template ID
       // Send email using EmailJS with all possible variable names
emailjs.send('service_314oazg', 'template_94w6wtp', {
// Standard EmailJS variables
from_name: name,
from_email: email,
reply_to: email,

// Alternative variable names (in case your template uses different names)
user_name: name,
user_email: email,
sender_name: name,
sender_email: email,

// Simple names
name: name,
email: email,

// Message content
subject: subject,
message: message,
content: message
})
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('Message sent successfully!', 'success');
            showNotification('Message sent successfully!');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showFormMessage('Failed to send message. Please try again.', 'error');
            showNotification('Failed to send message. Please try again.');
        });
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationToast.classList.add('show');
        
        // Hide notification after 5 seconds
        setTimeout(function() {
            notificationToast.classList.remove('show');
        }, 5000);
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
if (window.pageYOffset > 300) {
backToTopButton.classList.add('show');
} else {
backToTopButton.classList.remove('show');
}
});

backToTopButton.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});

// Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
const newsletterForm = document.querySelector('.footer-newsletter');

newsletterForm.addEventListener('submit', function(e) {
e.preventDefault();

const emailInput = this.querySelector('input[type="email"]');
const email = emailInput.value;

// Simple email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
}

// Show success message
showNotification('Thank you for subscribing!', 'success');

// Reset form
emailInput.value = '';
});
});