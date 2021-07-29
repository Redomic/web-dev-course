for (let i = 1; i <= 898; i++) {
    const pokeDiv = document.createElement('div');
    pokeDiv.classList.add('pokeDiv');

    document.querySelector('#container').append(pokeDiv);

    const pokeImg = document.createElement('img');
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
    pokeImg.classList.add('#block');
    pokeDiv.append(pokeImg);
}