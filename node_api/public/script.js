document.addEventListener('DOMContentLoaded', function() {
    const championsContainer = document.querySelector('#app .row');
    const paginationContainer = document.querySelector('#pagination'); // Contenedor para la paginación

    let currentPage = 1; // Página actual
    const limit = 20; // Límite de campeones por página

    function createChampionCard(champion) {
        return `
        <div class="col s12 m6 l3">
            <div class="card">
                <div class="card-image">
                    <img src="${champion.imagen}" class="responsive-img" alt="${champion.nombre}">
                    <span class="card-title amber-text">${champion.nombre.toUpperCase()}</span>
                </div>
                <div class="card-content">
                    <p>Origen: ${champion.origen}</p>
                    <p>Recurso: ${champion.recurso}</p>
                    <p>Líneas: ${champion.lineas.join(', ')}</p>
                    <p>Roles: ${champion.roles.join(', ')}</p>
                    <p>Dificultad: ${champion.dificultad_uso}</p>
                </div>
            </div>
        </div>
        `;
    }

    function loadChampions(page = 1, limit = 20) {
        fetch(`/api/champions/${limit}?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const championCards = data.champs.map(createChampionCard).join('');
                championsContainer.innerHTML = championCards;
                setupPagination(data.totalPages, page); // Configurar la paginación
            })
            .catch(error => console.error('Error:', error));
    }

    function setupPagination(totalPages, currentPage) {
        paginationContainer.innerHTML = ''; // Limpiar contenedor de paginación
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('pagination-button');
            button.disabled = i === currentPage; // Deshabilitar botón de la página actual
            button.addEventListener('click', () => {
                loadChampions(i, limit); // Cargar campeones de la página seleccionada
            });
            paginationContainer.appendChild(button);
        }
    }

    function loadChampion(id) {
        fetch(`/api/champions/${id}`)
            .then(response => response.json())
            .then(champion => {
                const championCard = createChampionCard(champion);
                championsContainer.innerHTML = championCard;
            })
            .catch(error => console.error('Error:', error));
    }

    // Cargar todos los campeones al inicio
    loadChampions();

    // Ejemplo de cómo manejar un filtro
    document.querySelector('#filtroLinea').addEventListener('change', function(e) {
        const linea = e.target.value;
        if (linea) {
            loadChampions(1, limit); // Reiniciar a la primera página
        } else {
            loadChampions(1, limit);
        }
    });

    // Añade más event listeners para los otros filtros
});
