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
            </div>
        </div>
        `;
    }

    function loadChampions() {
        fetch('/api/champions')
            .then(response => response.json())
            .then(champions => {
                const championCards = champions.map(createChampionCard).join('');
                championsContainer.innerHTML = championCards;
            })
            .catch(error => console.error('Error:', error));
    }

    loadChampions();
});

