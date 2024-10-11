document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el efecto parallax
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    // Seleccionar el botón de scroll hacia arriba
    const scrollToTopButton = document.querySelector('.fixed-action-btn-right');

    // Evento de scroll para mostrar/ocultar el botón
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // Cambia 100 por el valor que prefieras
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    // Evento de clic para desplazamiento suave hacia arriba
    scrollToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});