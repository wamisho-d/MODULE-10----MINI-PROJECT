const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
        resultDiv.innerHTML = `<p class="text-danger">Please enter a Pokémon name or ID.</p>`;
        return;
    }
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon not found.');
        const data = await response.json();

        resultDiv.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name.toUpperCase()}</h5>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
                    <a href="./details.html?id=${data.id}" class="btn btn-primary">More Details</a>
                </div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
});
