// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});






/**
 * Responsive Navbar with Dropdown - JavaScript
 * Desktop: Hover effect (CSS handled)
 * Mobile: Click to toggle menu and dropdown
 */

(function() {
    'use strict';

    // ========== DOM Element Selection ==========
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownContainer = document.getElementById('services-dropdown');
    const dropdownToggle = document.getElementById('dropdown-toggle-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // ========== Utility Functions ==========
    
    /**
     * Check if current viewport is mobile width
     * @returns {boolean} - True if window width <= 768px
     */
    function isMobileWidth() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    /**
     * Close mobile menu and dropdown
     */
    function closeAllMenus() {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // Close dropdown if open
        if (dropdownMenu && dropdownMenu.classList.contains('open')) {
            dropdownMenu.classList.remove('open');
            if (dropdownContainer) {
                dropdownContainer.classList.remove('active-dropdown');
            }
        }
    }

    /**
     * Close only dropdown menu
     */
    function closeDropdown() {
        if (dropdownMenu && dropdownMenu.classList.contains('open')) {
            dropdownMenu.classList.remove('open');
            if (dropdownContainer) {
                dropdownContainer.classList.remove('active-dropdown');
            }
        }
    }

    // ========== Mobile Menu Toggle (Hamburger) ==========
    if (toggleBtn && navMenu) {
        // Toggle mobile menu on hamburger icon click
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            navMenu.classList.toggle('active');
            
            // Optional: Change hamburger icon to close icon
            const icon = this.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ========== Dropdown Toggle (Services) ==========
    if (dropdownToggle && dropdownMenu && dropdownContainer) {
        
        // Handle click on Services link
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent page scroll/jump
            
            if (isMobileWidth()) {
                // Mobile: toggle dropdown
                e.stopPropagation();
                dropdownMenu.classList.toggle('open');
                dropdownContainer.classList.toggle('active-dropdown');
                
                // Rotate chevron icon
                const icon = this.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.style.transform = dropdownMenu.classList.contains('open') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            } else {
                // Desktop: Optional - you can add click functionality here if needed
                // Currently desktop uses CSS hover, so we do nothing
                console.log('Desktop view - hover works');
            }
        });

        // Prevent dropdown from closing when clicking inside dropdown menu
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // ========== Click Outside to Close ==========
    document.addEventListener('click', function(event) {
        // Close mobile menu if clicking outside
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Also close dropdown when closing menu
                closeDropdown();
            }
        }

        // Close dropdown if clicking outside (mobile only)
        if (isMobileWidth() && dropdownMenu && dropdownMenu.classList.contains('open')) {
            if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
                closeDropdown();
                
                // Reset chevron icon
                const icon = dropdownToggle.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });

    // ========== Handle Window Resize ==========
    window.addEventListener('resize', function() {
        if (!isMobileWidth()) {
            // Switching from mobile to desktop
            closeAllMenus();
            
            // Reset hamburger icon
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Reset chevron icon
            if (dropdownToggle) {
                const icon = dropdownToggle.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });

    // ========== Handle Escape Key Press ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeAllMenus();
            
            // Reset hamburger icon
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Reset chevron icon
            if (dropdownToggle) {
                const icon = dropdownToggle.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });

    // ========== Touch Device Support ==========
    // For touch devices on desktop width, manage dropdown manually
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function(e) {
            if (!isMobileWidth() && dropdownMenu && dropdownToggle) {
                // If touching dropdown toggle on desktop with touch
                if (dropdownToggle.contains(e.target)) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('open');
                    dropdownContainer.classList.toggle('active-dropdown');
                    
                    // Rotate chevron
                    const icon = dropdownToggle.querySelector('i.fa-chevron-down');
                    if (icon) {
                        icon.style.transform = dropdownMenu.classList.contains('open') 
                            ? 'rotate(180deg)' 
                            : 'rotate(0deg)';
                    }
                } else if (!dropdownMenu.contains(e.target) && dropdownMenu.classList.contains('open')) {
                    // Close if touching outside
                    dropdownMenu.classList.remove('open');
                    dropdownContainer.classList.remove('active-dropdown');
                    
                    // Reset chevron
                    const icon = dropdownToggle.querySelector('i.fa-chevron-down');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    }

    // ========== Prevent Scroll when Menu Open (Optional) ==========
    /*
    if (navMenu) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (navMenu.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        observer.observe(navMenu, { attributes: true });
    }
    */

    // ========== Initialize ==========
    console.log('Navbar JavaScript initialized successfully!');
    
})();














// <!-- Proficiency Section -->
// Progress Bar Animation on Scroll
const progressBars = document.querySelectorAll('.progress-fill');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 50;

        // If the progress bar is visible on the screen
        if (barTop < triggerPoint) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }
    });
};

// Listen for scroll events
window.addEventListener('scroll', animateProgressBars);

// Run once on load just in case it's already in view
window.addEventListener('load', animateProgressBars);






// loadind-loadind
// =========================================
// Preloader / Loading Screen Logic
// =========================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Add the hidden class to fade it out
    if(preloader) {
        preloader.classList.add('preloader-hidden');
        
        // Remove it from the DOM after the fade transition completes (optional but good for performance)
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // 500ms matches the CSS transition time
    }
});





function sendToWhatsApp() {
    // 1. ইনপুট ফিল্ড থেকে ডাটা সংগ্রহ করা
    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const projectDetails = document.getElementById("projectDetails").value.trim();

    // 2. চেক করা কোনো ফিল্ড খালি আছে কিনা
    if (fullName === "" || emailAddress === "" || projectDetails === "") {
        alert("Please fill in all the fields before submitting! ⚠️");
        return; 
    }

    // 3. ইমেইল সঠিক কিনা তা চেক করা (RegEx)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailAddress)) {
        alert("Please enter a valid email address! 📧 (e.g., infosumon77@gmail.com)");
        return; 
    }

    // 4. আপনার হোয়াটসঅ্যাপ নাম্বার (এখানে আপনার আসল নাম্বার দেওয়া আছে)
    const phoneNumber = "8801887041612"; 

    // 5. হোয়াটসঅ্যাপের জন্য মেসেজ সাজানো
    const whatsappMessage = `Hello, I have a new project inquiry! 🚀%0A%0A`
                          + `*Full Name:* ${fullName}%0A`
                          + `*Email:* ${emailAddress}%0A`
                          + `*Project Details:* %0A${projectDetails}`;

    // 6. লিংক তৈরি করা
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // 7. নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
    window.open(whatsappURL, "_blank");
}
















