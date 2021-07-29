document.querySelector('#colorbtn').addEventListener('click', () => {
    let randomColor =  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    document.querySelector('h1').innerText = randomColor;

    document.body.style.background = randomColor;
});
