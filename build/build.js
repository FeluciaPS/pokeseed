'use strict';

const FS = require('fs');
const root = "../html/";

let toId = function(str) {if (!str) return undefined;return '' + str.replace(/[^0-9a-z]/gi, '').toLowerCase();}

let headers = {
    "Gen 1": [
        "Red",
        "Blue/Green",
        "Yellow"
    ],
    "Gen 2": [
        "Gold",
        "Silver",
        "Crystal"
    ],
    "Gen 3": [
        "Ruby",
        "Sapphire",
        "Emerald",
        "Fire Red",
        "Leaf Green",
        "Colosseum",
        "Gale of Darkness",
    ],
    "Gen 4": [
        "Pearl",
        "Diamond",
        "Platinum",
        "Heart Gold",
        "Soul Silver"
    ],
    "Gen 5": [
        "Black",
        "White",
        "Black 2",
        "White 2"
    ],
    "Gen 6": [
        "X",
        "Y",
        "Omega Ruby",
        "Alpha Sapphire"
    ],
    "Gen 7": [
        "Sun",
        "Moon",
        "Ultra Sun",
        "Ultra Moon",
        "Let's Go Pikachu",
        "Let's Go Eevee"
    ],
    "Gen 8": [
        "Sword",
        "Shield",
        "DLC Sword",
        "DLC Shield"
    ]
}

let header = `<header class="menu navbar">                        <!-- Header is loaded in build/build.js-->
        <a href="/pokeseed/index.html" class="logo">    <!--Logo functions as link to home page. Add actual link for clarity later?-->
            <img src="./img/logo.png">              
            <h1>PokeSeed</h1>
        </a>
        <nav>\r\n`;

let tab = `    `;


for (let dirname in headers) {
    header += tab+tab+tab+`<div class="dropdown">\r\n`;
    header += tab+tab+tab+tab+`<p>${dirname}</p>\r\n`;
    header += tab+tab+tab+tab+`<div class="dropdown-content">\r\n`
    let folders = headers[dirname];
    for (let name of folders) {
        let exists = FS.existsSync(root + `${toId(dirname)}`) && FS.existsSync(root + `${toId(dirname)}/${toId(name)}.html`);
        let href = exists ? `/pokeseed/html/${toId(dirname)}/${toId(name)}.html` : "";
        header += tab+tab+tab+tab+tab+`<a href="${href}"${exists ? '' : ' class="disabled"'}>\r\n`;
        header += tab+tab+tab+tab+tab+tab+`${name}\r\n`;
        header += tab+tab+tab+tab+tab+`</a>\r\n`;
    }
    header += tab+tab+tab+tab+`</div>\r\n`
    header += tab+tab+tab+`</div>\r\n`;
}
header += tab+tab+`</nav>\r\n`;
header += tab;

let HeaderMatch = new RegExp(`<header class="menu navbar">(.|\n|\r)*(?=<\/header>)`, 'gmi');
for (let i of FS.readdirSync(root)) {
    for (let x of FS.readdirSync(root + i)) {
        let text = FS.readFileSync(root + i + '/' + x, 'utf8');
        console.log(text, text.match(HeaderMatch));
        text = text.replace(text.match(HeaderMatch), header);
        FS.writeFileSync(root + i + '/' + x, text);
    }
}
let text = FS.readFileSync('../index.html', 'utf8');
//console.log(text, text.match(HeaderMatch));
text = text.replace(HeaderMatch, header);
FS.writeFileSync('../index.html', text);