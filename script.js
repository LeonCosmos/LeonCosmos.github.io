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
    document.body.style.overflow = 'hidden';
}

function closeYouTubePopup() {
    const popup = document.getElementById('youtube-popup');
    const iframe = document.getElementById('youtube-iframe');
    
    // Cacher la pop-in
    popup.classList.remove('active');
    document.body.style.overflow = '';
    
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
// Données des médias par catégorie
const mediaCategories = {
    'sport': {
        title: 'Photos Sportives Dynamiques',
        type: 'images',
        items: [
            'assets/sport-1.jpg',
            'assets/sport-2.jpg', 
            'assets/sport-3.jpg',
            'assets/sport-4.jpg'
        ]
    },
    'argentique': {
        title: 'Portraits Argentiques',
        type: 'images',
        items: [
            'assets/argentique-1.jpg',
            'assets/argentique-2.jpg',
            'assets/argentique-3.jpg',
            'assets/argentique-4.jpg',
            'assets/argentique-5.jpg'
        ]
    },
    'retouches': {
        title: 'Tests de Retouches Photos',
        type: 'images',
        items: [
            'assets/retouches-1.jpg',
            'assets/retouches-2.jpg',
            'assets/retouches-3.jpg',
            'assets/retouches-4.jpg'
        ]
    },
    'slowmotion': {
        title: 'SlowMotion Poétique',
        type: 'video',
        items: [
            {
                src: 'assets/slowmotion-video.mp4',
                title: 'Vidéo SlowMotion Poétique',
                format: 'video/mp4'
            }
        ]
    },
    'podcast': {
        title: 'Analyse Filmique et Podcast',
        type: 'audio',
        items: [
            {
                src: 'assets/podcast-audio.mp3',
                title: 'Podcast - Analyse Filmique'
            }
        ]
    }
};

// Fonction pour ouvrir la pop-in des médias
function openPhotoPopup(category) {
    const popup = document.getElementById('photo-popup');
    const title = document.getElementById('photo-popup-title');
    const container = document.getElementById('photos-container');
    
    const categoryData = mediaCategories[category];
    
    if (!categoryData) {
        console.error('Catégorie non trouvée:', category);
        return;
    }
    
    // Mettre à jour le titre
    title.textContent = categoryData.title;
    
    // Vider le conteneur
    container.innerHTML = '';
    
    // Ajouter le contenu selon le type
    if (categoryData.type === 'images') {
        // Mode galerie d'images
        container.className = 'photos-grid';
        
        categoryData.items.forEach(imageSrc => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = categoryData.title;
            img.loading = 'lazy';
            
            img.onerror = function() {
                photoItem.innerHTML = `
                    <div class="photo-placeholder">
                        <i class="fas fa-image"></i>
                        <span>Image non disponible</span>
                    </div>
                `;
            };
            
            photoItem.appendChild(img);
            container.appendChild(photoItem);
        });
        
} else if (categoryData.type === 'audio') {
    // Mode lecteur audio
    container.className = 'audio-container';
    
    categoryData.items.forEach(audioItem => {
        const audioPlayer = document.createElement('div');
        audioPlayer.className = 'audio-player';
        
        audioPlayer.innerHTML = `
            <div class="audio-info">
                <i class="fas fa-music"></i>
                <h4>${audioItem.title}</h4>
            </div>
            <audio controls class="native-audio">
                <source src="${audioItem.src}" type="audio/mpeg">
                Votre navigateur ne supporte pas l'élément audio.
            </audio>
        `;
        
        container.appendChild(audioPlayer);
    });
} else if (categoryData.type === 'video') {
    container.className = 'video-container';
    
    categoryData.items.forEach(videoItem => {
        const videoPlayer = document.createElement('div');
        videoPlayer.className = 'video-player';
        
        videoPlayer.innerHTML = `
            <div class="video-info">
                <i class="fas fa-film"></i>
                <h4>${videoItem.title}</h4>
                <p class="video-format">Format: MP4 - Double-clic pour plein écran</p>
            </div>
            <div class="video-wrapper">
                <video controls class="native-video">
                    <source src="${videoItem.src}" type="${videoItem.format}">
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            </div>
        `;
        
        container.appendChild(videoPlayer);
        
        const video = videoPlayer.querySelector('.native-video');
        
        video.addEventListener('dblclick', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        });
        
        // Debug de la lecture
        video.addEventListener('canplay', function() {
            console.log('✅ Vidéo prête à être lue:', videoItem.src);
        });
        
        video.addEventListener('error', function(e) {
            console.error('❌ Erreur vidéo:', video.error, videoItem.src);
        });
    });
}
    
    // Afficher la pop-in
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer la pop-in des photos
function closePhotoPopup() {
    const popup = document.getElementById('photo-popup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
    
    // Arrêter tous les médias en cours de lecture
    const videos = popup.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    const audios = popup.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// Initialisation des contrôles audio personnalisés (manquante)
function initAudioPlayer(audioPlayer) {
    const audio = audioPlayer.querySelector('audio');
    const playPauseBtn = audioPlayer.querySelector('.play-pause');
    const progressBar = audioPlayer.querySelector('.progress-bar');
    const timeDisplay = audioPlayer.querySelector('.time');
    
    // Lecture/Pause
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Mise à jour de la barre de progression
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        
        // Formatage du temps
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });
    
    // Clic sur la barre de progression
    const progressContainer = audioPlayer.querySelector('.progress-container');
    progressContainer.addEventListener('click', function(e) {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });
    
    // Réinitialisation à la fin
    audio.addEventListener('ended', function() {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        progressBar.style.width = '0%';
        timeDisplay.textContent = '0:00';
    });
}

// Événements de fermeture (à ajouter à la fin)
document.addEventListener('DOMContentLoaded', function() {
    // Fermer avec Échap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePhotoPopup();
        }
    });
    
    // Fermer en cliquant sur l'overlay
    const overlay = document.querySelector('.photo-popup .popup-overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            closePhotoPopup();
        });
    }
    
    // Fermer avec le bouton de fermeture (au cas où l'onclick ne marche pas)
    const closeBtn = document.querySelector('.photo-popup .popup-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closePhotoPopup();
        });
    }
});