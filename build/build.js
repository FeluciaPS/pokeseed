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
    "Other": [
        "Type Coverage",
        "Randomizer",
        "About Us"
    ]
}

let header = `                        <!-- Header is loaded in build/build.js and loaded in src/header.js-->
        <a href="/pokeseed/index.html" class="subtle-link logo">    <!--Logo functions as link to home page. Add actual link for clarity later?-->
            <img src="/pokeseed/img/pokeseed.png">              
            <h1>PokeSeed</h1>
        </a>
        <div id="menu-button"></div>
        <nav id="navigation">
            <ul class="menu">\r\n`;

let tab = `    `;


for (let dirname in headers) {
    header += tab+tab+tab+tab+`<li class="dropdown">\r\n`;
    header += tab+tab+tab+tab+tab+`<p>${dirname}</p>\r\n`;
    header += tab+tab+tab+tab+tab+`<ul class="dropdown-content">\r\n`
    let folders = headers[dirname];
    for (let name of folders) {
        let exists = FS.existsSync(root + `${toPageId(dirname)}`) && FS.existsSync(root + `${toPageId(dirname)}/${toPageId(name)}.html`);
        let href = exists ? `/pokeseed/html/${toPageId(dirname)}/${toPageId(name)}.html` : "";
        header += tab+tab+tab+tab+tab+tab+`<a href="${href}"${exists ? '' : ' class="disabled"'}>\r\n`;
        header += tab+tab+tab+tab+tab+tab+tab+`<li>${name}</li>\r\n`;
        header += tab+tab+tab+tab+tab+tab+`</a>\r\n`;
    }
    header += tab+tab+tab+tab+tab+`</ul>\r\n`
    header += tab+tab+tab+tab+`</li>\r\n`;
}
header += tab+tab+tab+`</ul>\r\n`;
header += tab+tab+`</nav>\r\n`;
header += tab;

let HeaderMatch = new RegExp("~[^~]*~", 'gmi');
let text = FS.readFileSync('../src/header.js', 'utf8');
console.log(text.match(HeaderMatch));
text = text.replace(HeaderMatch, "~\nvar headerhtml = `" + header + "`\n// ~");
FS.writeFileSync('../src/header.js', text);

/*<nav id="navigation">
<ul class="menu">
    <a href="./index.html">
        <li>Home</li>
    </a>
    <a href="./images.html">
        <li>Images</li>
    </a>
    <li class="dropdown">
        <p>Text Pages</p>
        <ul class="dropdown-content">
            <a href="./text-1.html">
                <li>Text 1</li>
            </a>
            <a href="./text-1.html">
                <li>Text 2</li>
            </a>
        </ul>
    </li>
    <li class="dropdown">
        <p>About Us</p>
        <ul class="dropdown-content">
            <a href="./contact.html">
                <li>Contact</li>
            </a>
            <a href="./about-us.html">
                <li>Meet the Team</li>
            </a>
        </ul>
    </li>
</ul>
</nav>*/