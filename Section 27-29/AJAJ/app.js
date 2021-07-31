let btcPrice = async () => {
    try {
        let res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
        document.querySelector('#btc').textContent = res.data.ticker.price;
    } catch (e) {
        console.log(e);
    }
}

btcPrice();

let dadJoke = async () => {
    try {
        let headers = { headers: { Accept: "application/json"}};
        let res = await axios.get('https://icanhazdadjoke.com/', headers);
        document.querySelector('#joke').textContent = res.data.joke;
    } catch (e) {
        console.log(e);
    }
}

document.querySelector('#getjoke').addEventListener('click', () => {
    dadJoke();
})