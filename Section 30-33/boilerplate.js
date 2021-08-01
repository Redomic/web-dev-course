const fs = require('fs');

let args = process.argv.slice(2);
let fileName = args[0] || 'Project';

try {
    fs.mkdirSync(fileName);

    fs.writeFileSync(`${fileName}/index.html`);
    fs.writeFileSync(`${fileName}/style.css`);
    fs.writeFileSync(`${fileName}/app.js`);
} catch (err) {
    console.log('Something went Wrong');
    console.log(err);
}

console.log('Finished Successfully');