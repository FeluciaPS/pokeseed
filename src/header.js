var HeaderMatch = new RegExp(`<header class="navbar">(.|\n|\r)*(?=<\/header>)`, 'gmi');

var toId = function (str) {
    return '' + str.replace(/[^0-9a-z]/gi, '').toLowerCase()
}

// ~
var headerhtml = `                        <!-- Header is loaded in build/build.js and loaded in src/header.js-->
        <a href="/pokeseed/index.html" class="subtle-link logo">    <!--Logo functions as link to home page. Add actual link for clarity later?-->
            <img src="/pokeseed/img/pokeseed.png">              
            <h1>PokeSeed</h1>
        </a>
        <div id="menu-button"></div>
        <nav id="navigation">
            <ul class="menu">
                <li class="dropdown">
                    <p>Gen1</p>
                    <ul class="dropdown-content">
                        <a href="/pokeseed/html/gen1/red.html">
                            <li>Red</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Blue/Green</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Yellow</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen2</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>Gold</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Silver</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Crystal</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen3</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>Ruby</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Sapphire</li>
                        </a>
                        <a href="/pokeseed/html/gen3/emerald.html">
                            <li>Emerald</li>
                        </a>
                        <a href="/pokeseed/html/gen3/fire-red.html">
                            <li>Fire Red</li>
                        </a>
                        <a href="/pokeseed/html/gen3/leaf-green.html">
                            <li>Leaf Green</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Colosseum</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Gale of Darkness</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen4</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>Pearl</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Diamond</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Platinum</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Heart Gold</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Soul Silver</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen5</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>Black</li>
                        </a>
                        <a href="" class="disabled">
                            <li>White</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Black 2</li>
                        </a>
                        <a href="" class="disabled">
                            <li>White 2</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen6</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>X</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Y</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Omega Ruby</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Alpha Sapphire</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen7</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>Sun</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Moon</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Ultra Sun</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Ultra Moon</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Let's Go Pikachu</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Let's Go Eevee</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Gen8</p>
                    <ul class="dropdown-content">
                        <a href="" class="disabled">
                            <li>Sword</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Shield</li>
                        </a>
                        <a href="" class="disabled">
                            <li>DLC Sword</li>
                        </a>
                        <a href="" class="disabled">
                            <li>DLC Shield</li>
                        </a>
                    </ul>
                </li>
                <li class="dropdown">
                    <p>Other</p>
                    <ul class="dropdown-content">
                        <a href="/pokeseed/html/other/type-coverage.html">
                            <li>Type Coverage</li>
                        </a>
                        <a href="" class="disabled">
                            <li>Randomizer</li>
                        </a>
                        <a href="/pokeseed/html/other/about-us.html">
                            <li>About Us</li>
                        </a>
                    </ul>
                </li>
            </ul>
        </nav>
    `
// ~

jQuery(function() {
    document.getElementsByClassName("navbar")[0].innerHTML = headerhtml;
})