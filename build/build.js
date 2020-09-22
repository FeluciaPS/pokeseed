'use strict';

const FS = require('fs');
const root = "../html/";

let toPageId = function(str) {
    if (!str) return undefined;
    return '' + str.replace(/\s/g, '-').replace(/[^0-9a-z\-]/gi, '').toLowerCase();
}

let headers = {
    "Gen1": [
        "Red",
        "Blue/Green",
        "Yellow"
    ],
    "Gen2": [
        "Gold",
        "Silver",
        "Crystal"
    ],
    "Gen3": [
        "Ruby",
        "Sapphire",
        "Emerald",
        "Fire Red",
        "Leaf Green",
        "Colosseum",
        "Gale of Darkness",
    ],
    "Gen4": [
        "Pearl",
        "Diamond",
        "Platinum",
        "Heart Gold",
        "Soul Silver"
    ],
    "Gen5": [
        "Black",
        "White",
        "Black 2",
        "White 2"
    ],
    "Gen6": [
        "X",
        "Y",
        "Omega Ruby",
        "Alpha Sapphire"
    ],
    "Gen7": [
        "Sun",
        "Moon",
        "Ultra Sun",
        "Ultra Moon",
        "Let's Go Pikachu",
        "Let's Go Eevee"
    ],
    "Gen8": [
        "Sword",
        "Shield",
        "DLC Sword",
        "DLC Shield"
    ],
    "Tools": [
        "Type Coverage",
        "Randomizer"
    ]
}

let header = `                        <!-- Header is loaded in build/build.js and loaded in src/header.js-->
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
        let exists = FS.existsSync(root + `${toPageId(dirname)}`) && FS.existsSync(root + `${toPageId(dirname)}/${toPageId(name)}.html`);
        let href = exists ? `/pokeseed/html/${toPageId(dirname)}/${toPageId(name)}.html` : "";
        header += tab+tab+tab+tab+tab+`<a href="${href}"${exists ? '' : ' class="disabled"'}>\r\n`;
        header += tab+tab+tab+tab+tab+tab+`${name}\r\n`;
        header += tab+tab+tab+tab+tab+`</a>\r\n`;
    }
    header += tab+tab+tab+tab+`</div>\r\n`
    header += tab+tab+tab+`</div>\r\n`;
}
header += tab+tab+`</nav>\r\n`;
header += tab;

let HeaderMatch = new RegExp("~[^~]*~", 'gmi');
let text = FS.readFileSync('../src/header.js', 'utf8');
console.log(text.match(HeaderMatch));
text = text.replace(HeaderMatch, "~\nvar headerhtml = `" + header + "`\n// ~");
FS.writeFileSync('../src/header.js', text);