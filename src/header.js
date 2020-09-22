var HeaderMatch = new RegExp(`<header class="menu navbar">(.|\n|\r)*(?=<\/header>)`, 'gmi');

let toId = function(str) {
    if (!str) return undefined;
    return '' + str.replace(/[^0-9a-z]/gi, '').toLowerCase();
}

// ~
var headerhtml = `                        <!-- Header is loaded in build/build.js and loaded in src/header.js-->
        <a href="/pokeseed/index.html" class="logo">    <!--Logo functions as link to home page. Add actual link for clarity later?-->
            <img src="./img/logo.png">              
            <h1>PokeSeed</h1>
        </a>
        <nav>
            <div class="dropdown">
                <p>Gen1</p>
                <div class="dropdown-content">
                    <a href="/pokeseed/html/gen1/red.html">
                        Red
                    </a>
                    <a href="" class="disabled">
                        Blue/Green
                    </a>
                    <a href="" class="disabled">
                        Yellow
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen2</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        Gold
                    </a>
                    <a href="" class="disabled">
                        Silver
                    </a>
                    <a href="" class="disabled">
                        Crystal
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen3</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        Ruby
                    </a>
                    <a href="" class="disabled">
                        Sapphire
                    </a>
                    <a href="/pokeseed/html/gen3/emerald.html">
                        Emerald
                    </a>
                    <a href="/pokeseed/html/gen3/fire-red.html">
                        Fire Red
                    </a>
                    <a href="/pokeseed/html/gen3/leaf-green.html">
                        Leaf Green
                    </a>
                    <a href="" class="disabled">
                        Colosseum
                    </a>
                    <a href="" class="disabled">
                        Gale of Darkness
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen4</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        Pearl
                    </a>
                    <a href="" class="disabled">
                        Diamond
                    </a>
                    <a href="" class="disabled">
                        Platinum
                    </a>
                    <a href="" class="disabled">
                        Heart Gold
                    </a>
                    <a href="" class="disabled">
                        Soul Silver
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen5</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        Black
                    </a>
                    <a href="" class="disabled">
                        White
                    </a>
                    <a href="" class="disabled">
                        Black 2
                    </a>
                    <a href="" class="disabled">
                        White 2
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen6</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        X
                    </a>
                    <a href="" class="disabled">
                        Y
                    </a>
                    <a href="" class="disabled">
                        Omega Ruby
                    </a>
                    <a href="" class="disabled">
                        Alpha Sapphire
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen7</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        Sun
                    </a>
                    <a href="" class="disabled">
                        Moon
                    </a>
                    <a href="" class="disabled">
                        Ultra Sun
                    </a>
                    <a href="" class="disabled">
                        Ultra Moon
                    </a>
                    <a href="" class="disabled">
                        Let's Go Pikachu
                    </a>
                    <a href="" class="disabled">
                        Let's Go Eevee
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Gen8</p>
                <div class="dropdown-content">
                    <a href="" class="disabled">
                        Sword
                    </a>
                    <a href="" class="disabled">
                        Shield
                    </a>
                    <a href="" class="disabled">
                        DLC Sword
                    </a>
                    <a href="" class="disabled">
                        DLC Shield
                    </a>
                </div>
            </div>
            <div class="dropdown">
                <p>Tools</p>
                <div class="dropdown-content">
                    <a href="/pokeseed/html/tools/type-coverage.html">
                        Type Coverage
                    </a>
                    <a href="" class="disabled">
                        Randomizer
                    </a>
                </div>
            </div>
        </nav>
    `
// ~

jQuery(function() {
    document.getElementsByClassName("menu navbar")[0].innerHTML = headerhtml;
})