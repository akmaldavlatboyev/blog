// Maqolani ulashish funksiyasi
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.querySelector('.article-title').textContent;
    
    let shareUrl;
    
    switch(platform) {
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Sahifa yuklanganda bajariladigan funksiyalar
document.addEventListener('DOMContentLoaded', function() {
    // Scroll bo'lganda header stilini o'zgartirish
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Maqola kontentidagi barcha rasmlar uchun lazy loading qo'shish
    const articleContent = document.querySelector('.article-content');
    
    if (articleContent) {
        const images = articleContent.querySelectorAll('img');
        
        images.forEach(img => {
            // Lazy loading atributini qo'shish
            img.setAttribute('loading', 'lazy');
            
            // Rasmga click qilinganda kattalashtirish
            img.addEventListener('click', function() {
                createImageModal(this.src);
            });
        });
    }
    
    // Kod bloklarini chiroyli ko'rsatish
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length > 0) {
        codeBlocks.forEach(function(block) {
            block.parentNode.classList.add('code-block');
        });
    }
});

// Rasmni kattalashtirish uchun modal oyna yaratish
function createImageModal(imageSrc) {
    // Eski modal oynani o'chirish (agar mavjud bo'lsa)
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Yangi modal oyna yaratish
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    
    // Modal oyna stillarini qo'shish
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '2000';
    modal.style.padding = '20px';
    modal.style.boxSizing = 'border-box';
    
    // Rasm yaratish
    const modalImg = document.createElement('img');
    modalImg.src = imageSrc;
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
    modalImg.style.objectFit = 'contain';
    modalImg.style.border = '2px solid white';
    modalImg.style.borderRadius = '4px';
    
    // Yopish tugmasini yaratish
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '20px';
    closeBtn.style.backgroundColor = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '30px';
    closeBtn.style.cursor = 'pointer';
    
    // Yopish tugmasiga click event qo'shish
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Modal oynani yopish uchun yana bir usul (modal oynaga click qilish)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Escape tugmasini bosish orqali yopish
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.image-modal')) {
            modal.remove();
        }
    });
    
    // Modal oynaga elementlarni qo'shish
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    
    // Modal oynani sahifaga qo'shish
    document.body.appendChild(modal);
}

// Header uchun qo'shimcha stillar
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    if (header) {
        header.style.transition = 'all 0.3s ease';
    }
});

// Maqola sahifasida scroll pozitsiyasini saqlash
let scrollPosition = 0;

// Sahifadan chiqib ketganda scroll pozitsiyasini saqlash
window.addEventListener('beforeunload', function() {
    scrollPosition = window.scrollY;
    localStorage.setItem('articleScrollPosition', scrollPosition);
});

// Sahifa yuklanganda scroll pozitsiyasini tiklash
document.addEventListener('DOMContentLoaded', function() {
    const savedPosition = localStorage.getItem('articleScrollPosition');
    if (savedPosition) {
        setTimeout(function() {
            window.scrollTo(0, savedPosition);
            localStorage.removeItem('articleScrollPosition');
        }, 100);
    }
});