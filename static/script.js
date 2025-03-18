// DOM elementlarini olish
const burgerIcon = document.getElementById('burgerIcon');
const mobileNav = document.getElementById('mobileNav');
const closeMobileNav = document.getElementById('closeMobileNav');
const userAccountBtn = document.getElementById('userAccountBtn');
const userSidebar = document.getElementById('userSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');

// Burger menu uchun event listener
if (burgerIcon) {
  burgerIcon.addEventListener('click', function() {
    burgerIcon.classList.add('active');
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    
    // Agar sidebar ochiq bo'lsa, uni yopish
    if (userSidebar.classList.contains('active')) {
      userSidebar.classList.remove('active');
    }
  });
}

// Mobile navigation yopish tugmasi uchun event listener
if (closeMobileNav) {
  closeMobileNav.addEventListener('click', function() {
    burgerIcon.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
  });
}

// Foydalanuvchi akounti tugmasi uchun event listener
if (userAccountBtn) {
  userAccountBtn.addEventListener('click', function() {
    userSidebar.classList.add('active');
    overlay.classList.add('active');
    
    // Agar mobile menu ochiq bo'lsa, uni yopish
    if (mobileNav.classList.contains('active')) {
      burgerIcon.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });
}

// Sidebar yopish tugmasi uchun event listener
if (closeSidebar) {
  closeSidebar.addEventListener('click', function() {
    userSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
}

// Overlay uchun event listener
if (overlay) {
  overlay.addEventListener('click', function() {
    // Sidebar yopish
    if (userSidebar.classList.contains('active')) {
      userSidebar.classList.remove('active');
    }
    
    // Mobile menu yopish
    if (mobileNav.classList.contains('active')) {
      burgerIcon.classList.remove('active');
      mobileNav.classList.remove('active');
    }
    
    overlay.classList.remove('active');
  });
}

// Ekran o'lchamini o'zgartirish uchun event listener
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    // Katta ekranlarda burger menu va sidebar yopilishi kerak
    if (mobileNav && mobileNav.classList.contains('active')) {
      burgerIcon.classList.remove('active');
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
});

// Escape tugmasi bosilganda sidebar va burger menu yopilishi
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    // Sidebar yopish
    if (userSidebar.classList.contains('active')) {
      userSidebar.classList.remove('active');
    }
    
    // Mobile menu yopish
    if (mobileNav.classList.contains('active')) {
      burgerIcon.classList.remove('active');
      mobileNav.classList.remove('active');
    }
    
    overlay.classList.remove('active');
  }
});