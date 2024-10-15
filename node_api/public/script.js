document.addEventListener('DOMContentLoaded', function() {
    const championsContainer = document.querySelector('#app .row');

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

    function loadChampions(url = '/api/champions') {
        fetch(url)
            .then(response => response.json())
            .then(champions => {
                const championCards = champions.map(createChampionCard).join('');
                championsContainer.innerHTML = championCards;
            })
            .catch(error => console.error('Error:', error));
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
            loadChampions(`/api/champions/linea/${linea}`);
        } else {
            loadChampions();
        }
    });

    // Añade más event listeners para los otros filtros
});

