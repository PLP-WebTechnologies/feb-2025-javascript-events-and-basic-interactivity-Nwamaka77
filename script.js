// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Form Elements
    const signupForm = document.getElementById('signup-form');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const privacyCheckbox = document.getElementById('privacy');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordStrengthBar = document.querySelector('.strength-progress');
    const passwordStrengthText = document.querySelector('.strength-text');
    
    // Gallery Elements
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Modal Elements
    const successModal = document.getElementById('successModal');
    const easterEggModal = document.getElementById('easterEggModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .modal-btn');
    
    // Other Elements
    const themeButton = document.getElementById('theme-button');
    const loginLink = document.getElementById('loginLink');
    const greetings = document.querySelectorAll('.greeting');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const konamiCodeProgress = document.querySelector('.konami-code-progress');
    const getStartedBtn = document.getElementById('getStartedBtn');

    // ====== Event Handling ======

    // 1. Tab Navigation
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab and pane
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
        
        // Hover effect on tabs
        btn.addEventListener('mouseenter', () => {
            if (!btn.classList.contains('active')) {
                btn.style.transform = 'translateY(-3px)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // 2. Theme Toggle (Dark Mode)
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update button text and icon
        const themeIcon = themeButton.querySelector('i');
        const themeText = themeButton.querySelector('span');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = 'Dark Mode';
        }
    });

    // 3. Password Toggle
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Change icon
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // 4. Gallery Slideshow
    let currentSlide = 0;
    
    const showSlide = (index) => {
        // Hide all slides
        gallerySlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Update indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the current slide
        gallerySlides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    };
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % gallerySlides.length;
        showSlide(currentSlide);
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
        showSlide(currentSlide);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-rotate slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % gallerySlides.length;
        showSlide(currentSlide);
    }, 5000);

    // 5. Modal Controls
    const openModal = (modal) => {
        modal.classList.add('show');
    };
    
    const closeModal = (modal) => {
        modal.classList.remove('show');
    };
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // 6. Form Validation
    // Real-time validation functions
    const validateName = (input) => {
        const value = input.value.trim();
        const errorElement = input.nextElementSibling;
        
        if (value === '') {
            errorElement.textContent = 'This field is required';
            input.classList.add('error');
            return false;
        } else if (value.length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            return true;
        }
    };
    
    const validateEmail = (input) => {
        const value = input.value.trim();
        const errorElement = input.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            errorElement.textContent = 'Email is required';
            input.classList.add('error');
            return false;
        } else if (!emailRegex.test(value)) {
            errorElement.textContent = 'Please enter a valid email address';
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            return true;
        }
    };
    
    const validatePhone = (input) => {
        const value = input.value.trim();
        const errorElement = input.nextElementSibling;
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        
        if (value === '') {
            errorElement.textContent = 'Phone number is required';
            input.classList.add('error');
            return false;
        } else if (!phoneRegex.test(value)) {
            errorElement.textContent = 'Please enter a valid phone number';
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            return true;
        }
    };
    
    const checkPasswordStrength = (password) => {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character types check
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return strength;
    };
    
    const validatePassword = (input) => {
        const value = input.value;
        const errorElement = input.parentNode.nextElementSibling;
        
        if (value === '') {
            errorElement.textContent = 'Password is required';
            input.classList.add('error');
            return false;
        } else if (value.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters';
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            
            // Check password strength
            const strength = checkPasswordStrength(value);
            const percentage = (strength / 6) * 100;
            
            // Update strength bar
            passwordStrengthBar.style.width = `${percentage}%`;
            
            // Update color
            if (strength <= 2) {
                passwordStrengthBar.style.backgroundColor = 'var(--error-color)';
                passwordStrengthText.textContent = 'Weak';
                passwordStrengthText.style.color = 'var(--error-color)';
            } else if (strength <= 4) {
                passwordStrengthBar.style.backgroundColor = 'var(--warning-color)';
                passwordStrengthText.textContent = 'Medium';
                passwordStrengthText.style.color = 'var(--warning-color)';
            } else {
                passwordStrengthBar.style.backgroundColor = 'var(--success-color)';
                passwordStrengthText.textContent = 'Strong';
                passwordStrengthText.style.color = 'var(--success-color)';
            }
            
            return true;
        }
    };
    
    const validateConfirmPassword = (input) => {
        const value = input.value;
        const passwordValue = password.value;
        const errorElement = input.nextElementSibling;
        
        if (value === '') {
            errorElement.textContent = 'Please confirm your password';
            input.classList.add('error');
            return false;
        } else if (value !== passwordValue) {
            errorElement.textContent = 'Passwords do not match';
            input.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
            return true;
        }
    };
    
    const validatePrivacy = (input) => {
        const errorElement = input.parentNode.nextElementSibling;
        
        if (!input.checked) {
            errorElement.textContent = 'You must agree to the Privacy Policy';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    };
    
    // Add input event listeners for real-time validation
    firstName.addEventListener('input', () => validateName(firstName));
    lastName.addEventListener('input', () => validateName(lastName));
    email.addEventListener('input', () => validateEmail(email));
    phone.addEventListener('input', () => validatePhone(phone));
    password.addEventListener('input', () => validatePassword(password));
    confirmPassword.addEventListener('input', () => validateConfirmPassword(confirmPassword));
    privacyCheckbox.addEventListener('change', () => validatePrivacy(privacyCheckbox));
    
    // Form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isFirstNameValid = validateName(firstName);
        const isLastNameValid = validateName(lastName);
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
        const isPrivacyChecked = validatePrivacy(privacyCheckbox);
        
        // Check if all validations passed
        if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && 
            isPasswordValid && isConfirmPasswordValid && isPrivacyChecked) {
            // Show success modal
            openModal(successModal);
            
            // Reset form
            signupForm.reset();
            passwordStrengthBar.style.width = '0%';
            passwordStrengthText.textContent = '';
        } else {
            // Shake the form to indicate errors
            signupForm.classList.add('shake');
            
            // Remove the shake class after animation completes
            setTimeout(() => {
                signupForm.classList.remove('shake');
            }, 500);
        }
    });

    // 7. Easter Eggs & Secret Features
    // Double-click on logo to show easter egg
    document.querySelector('.logo').addEventListener('dblclick', () => {
        openModal(easterEggModal);
    });
    
    // Long press on any greeting
    let pressTimer;
    
    greetings.forEach(greeting => {
        greeting.addEventListener('mousedown', () => {
            pressTimer = window.setTimeout(() => {
                greeting.style.fontSize = '36px';
                greeting.style.color = 'var(--primary-color)';
                
                // Play audio if available
                const lang = greeting.textContent;
                console.log(`Playing "${lang}" pronunciation audio...`);
            }, 1000);
        });
        
        greeting.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
        });
        
        greeting.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);
        });
    });
    
    // Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiPosition = 0;
    
    // Create key indicators
    konamiCode.forEach(() => {
        const keyElement = document.createElement('div');
        keyElement.classList.add('key');
        konamiCodeProgress.appendChild(keyElement);
    });
    
    const keyIndicators = document.querySelectorAll('.konami-code-progress .key');
    
    document.addEventListener('keydown', (e) => {
        // Check if the pressed key matches the next key in the Konami Code
        if (e.code === konamiCode[konamiPosition]) {
            // Light up the corresponding indicator
            keyIndicators[konamiPosition].classList.add('active');
            
            konamiPosition++;
            
            // Check if the Konami Code is complete
            if (konamiPosition === konamiCode.length) {
                // Reset the position
                konamiPosition = 0;
                
                // Reset indicators
                keyIndicators.forEach(key => key.classList.remove('active'));
                
                // Activate secret feature
                openModal(easterEggModal);
                
                // Add a free course to the account
                console.log('Konami Code activated! Free course added!');
            }
        } else {
            // Reset if wrong key is pressed
            konamiPosition = 0;
            keyIndicators.forEach(key => key.classList.remove('active'));
        }
    });
    
    // 8. Video Player
    videoPlaceholder.addEventListener('click', () => {
        console.log('Video player would start here...');
        videoPlaceholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading video...</span>';
        
        // Simulate video loading
        setTimeout(() => {
            videoPlaceholder.innerHTML = '<i class="fas fa-play-circle"></i><span>Watch Introduction Video</span>';
        }, 2000);
    });
    
    // 9. Login Link
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Swap form fields or redirect to login page
        alert('This would navigate to the login page in a real application.');
    });
    
    // Add event listener to the Get Started button
    getStartedBtn.addEventListener('click', () => {
        // Get all tab buttons and panes
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        // Find the signup tab button and tab
        const signupTabBtn = document.querySelector('.tab-btn[data-tab="signup"]');
        const signupTab = document.getElementById('signup');
        
        // Remove active class from all tabs and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to signup tab and pane
        signupTabBtn.classList.add('active');
        signupTab.classList.add('active');
        
        // Scroll to the signup form
        signupTab.scrollIntoView({ behavior: 'smooth' });
        
        // Focus on the first input field
        setTimeout(() => {
            document.getElementById('firstName').focus();
        }, 800);
    });

    // Initialize the first slide
    showSlide(0);
});