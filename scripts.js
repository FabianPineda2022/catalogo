/**
 * scripts.js
 * Funcionalidad para la página de catálogo de videojuegos.
 */

// Función que se ejecuta cuando el DOM (estructura HTML) está completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener una referencia al elemento del mensaje de bienvenida.
    const welcomeMessage = document.getElementById('welcome-message');

    // 2. Comprobar si el elemento existe antes de intentar manipularlo.
    if (welcomeMessage) {
        // 3. Establecer un temporizador para simular un tiempo de carga y aplicar la transición.
        // Aquí usamos 1500 milisegundos (1.5 segundos).
        setTimeout(() => {
            // Añadir la clase 'hidden' para iniciar la transición de opacidad a 0.
            welcomeMessage.classList.add('hidden');
            
            // 4. Quitar el elemento del DOM completamente después de que termine la transición (1 segundo, como en el CSS).
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
                console.log("¡Catálogo cargado y mensaje de bienvenida oculto!");
            }, 1000); // Espera 1 segundo para que la transición de opacidad termine.

        }, 1500); // El mensaje permanece visible durante 1.5 segundos.
    }
});