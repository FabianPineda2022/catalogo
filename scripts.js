/**
 * scripts.js
 * Funcionalidad para la página de catálogo de videojuegos, incluyendo i18n.
 */

// ==========================================================
// OBJETO DE TRADUCCIÓN
// ==========================================================

const translations = {
    // Claves de los atributos data-translate
    es: {
        pageTitle: "🎮 Catálogo de Videojuegos 🕹️",
        loadingMessage: "Cargando el Catálogo... ¡Prepárate para jugar!",
        headerTitle: "🚀 Explorador de Juegos Indie 👾",
        searchPlaceholder: "Buscar juego por título...",
        catalogTitle: "Catálogo de Lanzamientos",
        platform: "Plataforma",
        genre: "Género",
        developer: "Desarrollador",
        detailsButtonShow: "Ver más detalles",
        detailsButtonHide: "Ver menos detalles",
        playButton: "¡Jugar Ahora!",
        
        // Descripciones de juegos (Ejemplo)
        game1Desc: "Un desafiante juego de acción y plataformas con gráficos pixel-art nostálgicos. Enfrenta a tu destino en tu última misión.",
        game2Desc: "Una aventura culinaria donde deberás dominar el arte de la pizza y gestionar tu propia pizzería. ¡No dejes que se queme!",
        // ... (Agrega el resto de descripciones)
    },
    en: {
        pageTitle: "🎮 Video Game Catalog 🕹️",
        loadingMessage: "Loading the Catalog... Get ready to play!",
        headerTitle: "🚀 Indie Game Explorer 👾",
        searchPlaceholder: "Search game by title...",
        catalogTitle: "Featured Releases",
        platform: "Platform",
        genre: "Genre",
        developer: "Developer",
        detailsButtonShow: "View more details",
        detailsButtonHide: "View less details",
        playButton: "Play Now!",

        // Descripciones de juegos (Ejemplo)
        game1Desc: "A challenging action-platformer game with nostalgic pixel-art graphics. Face your destiny in your last mission.",
        game2Desc: "A culinary adventure where you must master the art of pizza and manage your own pizzeria. Don't let it burn!",
    },
    pt: {
        pageTitle: "🎮 Catálogo de Videogames 🕹️",
        loadingMessage: "Carregando o Catálogo... Prepare-se para jogar!",
        headerTitle: "🚀 Explorador de Jogos Indie 👾",
        searchPlaceholder: "Pesquisar jogo por título...",
        catalogTitle: "Lançamentos em Destaque",
        platform: "Plataforma",
        genre: "Gênero",
        developer: "Desenvolvedor",
        detailsButtonShow: "Ver mais detalhes",
        detailsButtonHide: "Ver menos detalhes",
        playButton: "Jogar Agora!",

        // Descripciones de juegos (Ejemplo)
        game1Desc: "Um desafiador jogo de ação e plataforma com gráficos pixel-art nostálgicos. Enfrente seu destino em sua última missão.",
        game2Desc: "Uma aventura culinária onde você deve dominar a arte da pizza e gerenciar sua própria pizzaria. Não deixe queimar!",
    }
};

// ==========================================================
// FUNCIÓN PRINCIPAL DE TRADUCCIÓN
// ==========================================================

function setLanguage(lang) {
    const translation = translations[lang];
    if (!translation) return;

    // 1. Traducir elementos de texto normales (data-translate)
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translation[key]) {
            element.textContent = translation[key];
        }
    });

    // 2. Traducir placeholders (data-translate-placeholder)
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translation[key]) {
            element.placeholder = translation[key];
        }
    });

    // 3. Traducir botón de detalles (el texto cambia entre mostrar/ocultar)
    document.querySelectorAll('.toggle-details-button').forEach(button => {
        const isVisible = button.closest('.game-content').querySelector('.game-details-hidden').classList.contains('visible');
        if (isVisible) {
            button.textContent = translation['detailsButtonHide'];
        } else {
            button.textContent = translation['detailsButtonShow'];
        }
    });

    // 4. Actualizar el atributo lang del HTML
    document.documentElement.lang = lang;
}


// ==========================================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------------------------------------------------------
    // 0. Inicialización de Idioma
    // ------------------------------------------------------------------
    const langSelect = document.getElementById('language-select');
    
    // Obtener el idioma guardado o usar 'es' por defecto
    const savedLang = localStorage.getItem('catalogLang') || 'es';
    langSelect.value = savedLang;
    setLanguage(savedLang); // Aplicar la traducción inicial
    
    // Escuchar el cambio de idioma
    langSelect.addEventListener('change', (event) => {
        const newLang = event.target.value;
        setLanguage(newLang);
        localStorage.setItem('catalogLang', newLang); // Guardar preferencia
        filterGames(); // Re-aplicar el filtro (solo si es necesario, pero buena práctica)
    });
    
    // ------------------------------------------------------------------
    // 1. Lógica de Precarga (El mensaje de bienvenida ahora se traduce primero)
    // ------------------------------------------------------------------
    const welcomeMessage = document.getElementById('welcome-message');

    if (welcomeMessage) {
        setTimeout(() => {
            welcomeMessage.classList.add('hidden');
            setTimeout(() => { welcomeMessage.style.display = 'none'; }, 1000);
        }, 1500);
    }
    
    // ------------------------------------------------------------------
    // 2. Feedback Táctil (sin cambios)
    // ------------------------------------------------------------------
    const gameItems = document.querySelectorAll('.game-item');
    // ... (Mantener lógica de touchstart/touchend) ...

    function handleTouchStart() { this.classList.add('game-item-tapped'); }
    function handleTouchEnd() { setTimeout(() => { this.classList.remove('game-item-tapped'); }, 150); }

    gameItems.forEach(item => {
        item.addEventListener('touchstart', handleTouchStart);
        item.addEventListener('touchend', handleTouchEnd);
        item.addEventListener('touchcancel', handleTouchEnd);
    });
    
    // ------------------------------------------------------------------
    // 3. Búsqueda Rápida (sin cambios)
    // ------------------------------------------------------------------
    const searchInput = document.getElementById('searchInput');
    const allGameItems = document.querySelectorAll('.game-item'); 

    function filterGames() {
        const filter = searchInput.value.toUpperCase();
        allGameItems.forEach(item => {
            const titleElement = item.querySelector('.game-content a'); 
            if (titleElement) {
                const textValue = titleElement.textContent || titleElement.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            }
        });
    }

    searchInput.addEventListener('keyup', filterGames);

    // ------------------------------------------------------------------
    // 4. Animación de Revelación al Desplazamiento (sin cambios)
    // ------------------------------------------------------------------
    const scrollRevealItems = document.querySelectorAll('.scroll-reveal-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, { threshold: 0.1 });

    scrollRevealItems.forEach(item => { observer.observe(item); });

    // ------------------------------------------------------------------
    // 5. Detalles Desplegables (Modificado ligeramente para incluir la traducción)
    // ------------------------------------------------------------------
    const toggleButtons = document.querySelectorAll('.toggle-details-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const detailsContainer = button.previousElementSibling;
            
            if (detailsContainer && detailsContainer.classList.contains('game-details-hidden')) {
                detailsContainer.classList.toggle('visible');
                
                // Actualiza el texto del botón usando la traducción
                const currentLang = document.documentElement.lang;
                const translation = translations[currentLang];
                
                if (detailsContainer.classList.contains('visible')) {
                    button.textContent = translation['detailsButtonHide'];
                } else {
                    button.textContent = translation['detailsButtonShow'];
                }
            }
        });
    });
    console.log("Soporte multi-idioma (i18n) activado.");
});