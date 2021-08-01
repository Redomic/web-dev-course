const fs = require('fs');

let fileName = process.argv[2] || 'Project';
let html = `./${fileName}/index.html`;
let css = `./${fileName}/style.css`;
let js = `./${fileName}/app.js`;

try {
    fs.mkdirSync(fileName);
    fs.writeFileSync(html);
    fs.writeFileSync(css);
    fs.writeFileSync(js);
    console.log('Finished Successfully');
} catch (err) {
    console.log('Something went Wrong');
    console.log(err);
}
