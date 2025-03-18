// Form ko'rsatish funksiyasi
function showForm(formType) {
    // Tab tugmalarini yangilash
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Formalarni yashirish
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => form.classList.remove('active'));
    
    // Tanlangan formani ko'rsatish
    if (formType === 'signin') {
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('signin-form').classList.add('active');
    } else {
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('signup-form').classList.add('active');
    }
}

// Kirish formasi validatsiyasi
const signinForm = document.getElementById('signin-form');
const signinLogin = document.getElementById('signin-login');
const signinPassword = document.getElementById('signin-password');
const signinLoginError = document.getElementById('signin-login-error');
const signinPasswordError = document.getElementById('signin-password-error');

signinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Login yoki email tekshirish
    if (!signinLogin.value.trim()) {
        showError(signinLogin, signinLoginError, 'Login yoki email kiritilishi shart');
        isValid = false;
    } else if (!isValidLoginOrEmail(signinLogin.value)) {
        showError(signinLogin, signinLoginError, 'Noto\'g\'ri login yoki email formati');
        isValid = false;
    } else {
        clearError(signinLogin, signinLoginError);
    }
    
    // Parol tekshirish
    if (!signinPassword.value) {
        showError(signinPassword, signinPasswordError, 'Parol kiritilishi shart');
        isValid = false;
    } else {
        clearError(signinPassword, signinPasswordError);
    }
    
    if (isValid) {
        // Form yuborish
        alert('Kirish muvaffaqiyatli!');
        signinForm.reset();
    }
});

// Ro'yxatdan o'tish formasi validatsiyasi
const signupForm = document.getElementById('signup-form');
const signupPhone = document.getElementById('signup-phone');
const signupEmail = document.getElementById('signup-email');
const signupLogin = document.getElementById('signup-login');
const signupPassword = document.getElementById('signup-password');
const signupConfirm = document.getElementById('signup-confirm');
const signupPhoneError = document.getElementById('signup-phone-error');
const signupEmailError = document.getElementById('signup-email-error');
const signupLoginError = document.getElementById('signup-login-error');
const signupPasswordError = document.getElementById('signup-password-error');
const signupConfirmError = document.getElementById('signup-confirm-error');
const strengthBar = document.getElementById('strength-bar');

// Parol kuchini tekshirish
signupPassword.addEventListener('input', function() {
    updatePasswordStrength(this.value);
});

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Telefon raqam tekshirish
    if (!signupPhone.value.trim()) {
        showError(signupPhone, signupPhoneError, 'Telefon raqam kiritilishi shart');
        isValid = false;
    } else if (!isValidPhone(signupPhone.value)) {
        showError(signupPhone, signupPhoneError, 'Noto\'g\'ri telefon raqam formati. +998XXXXXXXXX formatida kiriting');
        isValid = false;
    } else {
        clearError(signupPhone, signupPhoneError);
    }
    
    // Email tekshirish
    if (!signupEmail.value.trim()) {
        showError(signupEmail, signupEmailError, 'Email kiritilishi shart');
        isValid = false;
    } else if (!isValidEmail(signupEmail.value)) {
        showError(signupEmail, signupEmailError, 'Noto\'g\'ri email formati');
        isValid = false;
    } else {
        clearError(signupEmail, signupEmailError);
    }
    
    // Login tekshirish
    if (!signupLogin.value.trim()) {
        showError(signupLogin, signupLoginError, 'Login kiritilishi shart');
        isValid = false;
    } else if (signupLogin.value.length < 4) {
        showError(signupLogin, signupLoginError, 'Login kamida 4 ta belgidan iborat bo\'lishi kerak');
        isValid = false;
    } else {
        clearError(signupLogin, signupLoginError);
    }
    
    // Parol tekshirish
    if (!signupPassword.value) {
        showError(signupPassword, signupPasswordError, 'Parol kiritilishi shart');
        isValid = false;
    } else if (!isValidPassword(signupPassword.value)) {
        showError(signupPassword, signupPasswordError, 'Parol talablarga javob bermaydi');
        isValid = false;
    } else {
        clearError(signupPassword, signupPasswordError);
    }
    
    // Parolni tasdiqlash
    if (!signupConfirm.value) {
        showError(signupConfirm, signupConfirmError, 'Parolni tasdiqlash kiritilishi shart');
        isValid = false;
    } else if (signupConfirm.value !== signupPassword.value) {
        showError(signupConfirm, signupConfirmError, 'Parollar mos kelmaydi');
        isValid = false;
    } else {
        clearError(signupConfirm, signupConfirmError);
    }
    
    if (isValid) {
        // Form yuborish
        alert('Ro\'yxatdan o\'tish muvaffaqiyatli!');
        signupForm.reset();
        strengthBar.style.width = '0';
        strengthBar.className = 'strength-bar';
    }
});

// Xatolikni ko'rsatish
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

// Xatolikni tozalash
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Telefon raqam validatsiyasi
function isValidPhone(phone) {
    const phoneRegex = /^\+998[0-9]{9}$/;
    return phoneRegex.test(phone);
}

// Email validatsiyasi
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function isValidLoginOrEmail(value) {
    // Login yoki email bo'lishi mumkin
    return value.length >= 4 || isValidEmail(value);
}


function isValidPassword(password) {
    // Kamida 8 ta belgi
    if (password.length < 8) {
        return false;
    }
    
    
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    
    
    if (!/[0-9]/.test(password)) {
        return false;
    }
    
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return false;
    }
    

    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) {
            return false;
        }
    }
    
    return true;
}


function updatePasswordStrength(password) {
    let strength = 0;
    
    
    if (password.length >= 8) {
        strength += 1;
    }
    
    
    if (/[A-Z]/.test(password)) {
        strength += 1;
    }
    
    
    if (/[0-9]/.test(password)) {
        strength += 1;
    }
    
    
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        strength += 1;
    }
    
    // Ikkita ketma-ket bir xil belgi tekshirish
    let hasRepeatingChars = false;
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) {
            hasRepeatingChars = true;
            break;
        }
    }
    
    if (!hasRepeatingChars && password.length > 0) {
        strength += 1;
    }
    
    
    strengthBar.className = 'strength-bar';
    
    if (password.length === 0) {
        strengthBar.style.width = '0';
    } else if (strength < 3) {
        strengthBar.classList.add('weak');
    } else if (strength < 5) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}