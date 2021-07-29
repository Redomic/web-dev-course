const input = document.querySelector('#username');
const h1 = document.querySelector('h1');

input.addEventListener('input', (e) => {
    let value = input.value;
    if (value !== '') {
        h1.innerText = `Welcome, ${value}`;
    } else {
        h1.innerText = 'Enter your username';
    }
});
