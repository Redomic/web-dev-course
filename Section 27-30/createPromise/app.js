function changeColor(color) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, 1000)
    })
}

changeColor('red')
    .then(() => {
        return changeColor('green')
    })
    .then(() => {
        return changeColor('blue')
    })
