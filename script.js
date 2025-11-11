// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
});



// Fonctions pour gérer la pop-in YouTube
function openYouTubePopup(videoId, title) {
    const popup = document.getElementById('youtube-popup');
    const iframe = document.getElementById('youtube-iframe');
    const popupTitle = document.getElementById('popup-title');
    
    // Mettre à jour le titre
    popupTitle.textContent = title;
    
    // Mettre à jour la source de la vidéo
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    
    // Afficher la pop-in
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
}

function closeYouTubePopup() {
    const popup = document.getElementById('youtube-popup');
    const iframe = document.getElementById('youtube-iframe');
    
    // Cacher la pop-in
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Rétablir le défilement
    
    // Arrêter la vidéo
    iframe.src = '';
}

// Fermer avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeYouTubePopup();
    }
});

// Fermer en cliquant en dehors du contenu
document.getElementById('youtube-popup').addEventListener('click', function(event) {
    if (event.target === this) {
        closeYouTubePopup();
    }
});