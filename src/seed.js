var isRunning = false;
var dex = json('../../data/dex.json');

function json(target) {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': target,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
};

var getVal = function (target) {
    var obj = document.getElementById(target);
    var val = obj.options[obj.selectedIndex].value;
    if (!isNaN(parseInt(val, 10))) {
        val = parseInt(val, 10);
        if (val === -1) val = Infinity;
    }
    return val;
}

var toCaps = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

var escapeHTML = function (str) {
    return str.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/'/gi, '&quot;');
}


var mondata = '';
var pkmn = [];
var leg = [];
var nor = [];
var bad = [];
var fwg = [];
var starters = [];
var page = "";
var gen = 0;
var loadSeeder = function (target) {
    page = target;
    gen = parseInt(target.split('/')[0].charAt(3));
    mondata = json(`../../data/${target}/pokemon.json`);
    for (var i in mondata) {
        pkmn.push({
            name: i,
            type: mondata[i]
        });
    }
    leg = pkmn.filter(a => a.type.startsWith("Legendary")).map((x) => x.name);
    nor = pkmn.filter(a => a.type.startsWith("Normal")).map((x) => x.name);
    bad = pkmn.filter(a => a.type.startsWith("Trash")).map((x) => x.name);
    pkmn = pkmn.map(x => x.name);
    fwg = json(`../../data/${target}/starters.json`);
    starters = json(`../../data/${target}/startmons.json`);
    if (leg.length === 0 && bad.length === 0)
        output.warn("This page is WIP, the Pok&eacute;mon have not been categorised yet.");
}

var addTag = function (mon) {
    if (!mon || !mon.trim()) return mon;
    if (fwg.includes(mon.trim())) return `<span class="result legendary">${mon}</span>`;
    if (!pkmn.includes(mon.trim())) return mon;
    if (leg.includes(mon.trim())) return `<span class="result legendary">${mon}</span>`;
    if (nor.includes(mon.trim())) return `<span class="result normal">${mon}</span>`;
    if (bad.includes(mon.trim())) return `<span class="result trash">${mon}</span>`;
}
var fill = function (str, left = false) {
    if (!str) str = "";
    if (left)
        while (str.length < 10) str = " " + str;
    else
        while (str.length < 10) str += " ";
    return addTag(str);
}

var getGen = function (mon) {
    var num = Object.keys(dex).indexOf(toId(mon));
    if (num < 1) return 0;
    if (num >= 810) {
        return 8;
    } else if (num >= 722) {
        return 7;
    } else if (num >= 650) {
        return 6;
    } else if (num >= 494) {
        return 5;
    } else if (num >= 387) {
        return 4;
    } else if (num >= 252) {
        return 3;
    } else if (num >= 152) {
        return 2;
    } else {
        return 1;
    }
}

var buildTableOutput = function (players) {
    var ret = '';
    var temp = []
    for (let i in players) {
        temp.push('------------');
    }
    var div = '+' + temp.join('+') + '+\n';
    ret += div;
    temp = [];
    for (let i in players) {
        temp.push(' ' + fill(players[i].name) + ' ');
    }
    ret += '|' + temp.join('|') + '|\n';
    ret += div;
    for (let x in players[0].pokemon) {
        temp = [];
        for (let i in players) {
            temp.push(' ' + fill(players[i].pokemon[x]) + ' ');
        }
        ret += '|' + temp.join('|') + '|\n';
    }
    ret += div;
    return ret;
}

var lastroll = [];
async function runGenerator(reroll = false) {
    if (isRunning) return;
    isRunning = true;
    output.clear();
    output.write('Starting Generation...');
    var PlayerNames = document.getElementById("players").value.split(",").map(escapeHTML).map(x => x.trim());
    var RerollNames = document.getElementById("players").value.split(",").map(escapeHTML).map(x => x.trim());
    storage.setItem("names", PlayerNames.join(', '));

    if (reroll) {
        PlayerNames = Object.values(lastroll).map(x => x.name);
    }

    var Players = RerollNames.length;
    if (!PlayerNames[0]) {
        output.err("Invalid player count");
        output.msg("I understand writing down a list of your friends is appealing, but please give me a list of players.");
        return isRunning = false;
    }
    if (Players > 7) {
        output.err("Invalid player count");
        output.msg("Your friends are too powerful, please calm down and give me at most 7.");
        return isRunning = false;
    }
    var PokemonCount = getVal("moncount")
    var Legendary = [getVal("minleg"), getVal("maxleg")];
    var Normal = [getVal("minavg"), getVal("maxavg")];
    var Trash = [getVal("minbad"), getVal("maxbad")];
    var Common = [getVal("mincom"), getVal("maxcom")];
    var Cutoff = getVal("compct");
    var AllowDupes = getVal("dupes") === "Yes";
    var AllowStarters = getVal("starters") === "Yes";

    if (AllowDupes) {
        output.write('Allowing Duplicate Pok&eacute;mon.');
    }
    if (AllowDupes) {
        output.write('Allowing Starter Pok&eacute;mon.');
    }
    var error = 0;
    if (PokemonCount === Infinity && (AllowDupes || Players === 1)) {
        output.err("Can't have Unlimited Pok&eacute;mon in single-player mode or when duplicates are on...");
        output.msg("Play the game normally you idiot.");
        error++;
    }
    var pokemon = [];
    for (var i in mondata) {
        pokemon.push({
            name: i,
            type: mondata[i]
        });
    }
    if (AllowStarters) {
        for (let i in fwg) {
            pokemon.push({
                name: fwg[i],
                type: "Legendary"
            });
        }
    }
    var mons = pokemon.length;
    output.write(`${mons} Pok&eacute;mon loaded.`); // bit cheaty but we don't care about telling people how many pokemon got loaded
    if (Players * PokemonCount > mons && PokemonCount !== Infinity) {
        AllowDupes = true;
        output.write(`${Players} players with ${PokemonCount} Pok&eacute;mon requires ${Players*PokemonCount} Pok&eacute;mon`);
        output.write(`Allowing Duplicates...`);
    }

    if (Legendary[0] + Normal[0] + Trash[0] + 1 > PokemonCount || Common[0] > PokemonCount) {
        output.msg(`Oi mate you can't set those minimums when you only have ${PokemonCount} Pok&eacute;mon`);
        output.err(`More specific categories asked than Pok&eacute;mon required.`);
        error++;
    }

    if (Legendary[1] + Normal[1] + Trash[1] < PokemonCount) {
        output.msg(`Oi mate you can't set those maximums when you require ${PokemonCount} Pok&eacute;mon`);
        output.err(`Maximums don't add up to Pok&eacute;mon required.`);
        error++;
    }

    if (Legendary[1] < Legendary[0]) {
        output.err(`More minimum Legendaries than maximum.`);
        error++;
    }
    if (Normal[1] < Normal[0]) {
        output.err(`More minimum Normal than maximum.`);
        error++;
    }
    if (Trash[1] < Trash[0]) {
        output.err(`More minimum Trash than maximum.`);
        error++;
    }
    if (Common[1] < Common[0]) {
        output.err(`More minimum Common than maximum.`);
        error++;
    }

    if (error > 0) {
        isRunning = false;
        return output.err(`Found ${error} error${error === 1 ? '' : 's'}. Exiting...`);
    }

    let players = [];
    let bannedPokemon = [];
    if (reroll) {
        players = lastroll;
        let ids = RerollNames.map(toId);
        for (var i = 0; i < players.length; i++) {
            let id = toId(players[i].name);
            if (ids.includes(id)) {
                players[i] = {
                    name: players[i].name,
                    pokemon: [],
                    common: 0,
                    legendary: 0,
                    normal: 0,
                    trash: 0,
                    reroll: true
                }
            }
            else {
                bannedPokemon = bannedPokemon.concat(players[i].pokemon);
            }
        }
    }
    else {
        for (var i = 0; i < Players; i++) {
            players.push({
                name: PlayerNames[i],
                pokemon: [],
                common: 0,
                legendary: 0,
                normal: 0,
                trash: 0
            });
        }
    }
    var legendaries = pokemon.filter(a => a.type.startsWith("Legendary")).map((x) => x.name).filter(x => !bannedPokemon.includes(x));
    output.write(`Loaded ${legendaries.length} Legendary Pok&eacute;mon`);
    if (legendaries.length < Players * Legendary[0] && !AllowDupes) {
        output.err(`${Players} players with ${Legendary[0]} Legendary Pok&eacute;mon requires ${Players * Legendary[0]}`);
        error++;
    }
    var normals = pokemon.filter(a => a.type.startsWith("Normal")).map((x) => x.name).filter(x => !bannedPokemon.includes(x));;
    output.write(`Loaded ${normals.length} Normal Pok&eacute;mon`);
    if (normals.length < Players * Normal[0] && !AllowDupes) {
        output.err(`${Players} players with ${Normal[0]} Normal Pok&eacute;mon requires ${Players * Normal[0]}`);
        error++;
    }
    var trash = pokemon.filter(a => a.type.startsWith("Trash")).map(x => x.name).filter(x => !bannedPokemon.includes(x));;
    output.write(`Loaded ${trash.length} Trash Pok&eacute;mon`);
    if (trash.length < Players * Trash[0] && !AllowDupes) {
        output.err(`${Players} players with ${Trash[0]} trash Pok&eacute;mon requires ${Players * Trash[0]}`);
        error++;
    }

    // Generate a list of "Common" encounters
    var encounterdata = json(`../../data/${page}/encounters.json`);
    var commons = AllowStarters ? JSON.parse(JSON.stringify(fwg)) : [];
    for (var loc in encounterdata) {
        var location = encounterdata[loc];
        for (var enctype in location) {
            var encountertype = location[enctype];
            for (var enc in encountertype) {
                if (!toId(enc)) continue;
                var chance = encountertype[enc];
                var mondt = dex[toId(enc)];
                if (chance >= Cutoff) {
                    while (mondt.prevo) {
                        if (getGen(mondt.prevo) > gen) break;
                        mondt = dex[toId(mondt.prevo)];
                    }
                    if (commons.includes(mondt.name)) continue;
                    commons.push(mondt.name);
                }
            }
        }
    }
    commons = commons.filter(x => !bannedPokemon.includes(x));
    output.write(`Loaded ${commons.length} Common (${Cutoff}%) Pok&eacute;mon`);
    if (commons.length < Players * Common[0] && !AllowDupes) {
        output.err(`${Players} players with ${Common[0]} Common Pok&eacute;mon requires ${Players * Common[0]}`);
        output.msg('Try lowering your standards.');
        error++;
    }
    if (error > 0) {
        isRunning = false;
        return output.err(`Found ${error} error${error === 1 ? '' : 's'}. Exiting...`);
    }

    var starters_c = JSON.parse(JSON.stringify(starters)).filter(x => !bannedPokemon.includes(x));
    pokemon = pokemon.map(x => x.name);
    // We can start handing them out now!
    var addPokemon = function (player, mon) {
        player.pokemon.push(mon);
        if (commons.includes(mon)) {
            if (!AllowDupes) commons.splice(commons.indexOf(mon), 1);
            player.common++;
        }
        if (legendaries.includes(mon)) {
            if (!AllowDupes) legendaries.splice(legendaries.indexOf(mon), 1);
            player.legendary++;
        }
        if (normals.includes(mon)) {
            if (!AllowDupes) normals.splice(normals.indexOf(mon), 1);
            player.normal++;
        }
        if (trash.includes(mon)) {
            if (!AllowDupes) trash.splice(trash.indexOf(mon), 1);
            player.trash++;
        }
        if (starters_c.includes(mon)) {
            if (!AllowDupes) starters_c.splice(starters_c.indexOf(mon), 1);
        }
        if (pokemon.includes(mon)) {
            if (!AllowDupes) pokemon.splice(pokemon.indexOf(mon), 1);
        }
    }

    var select = arr => arr[Math.floor(Math.random() * arr.length)];

    if (PokemonCount === Infinity) {
        PokemonCount = Math.floor(pokemon.length / Players);
        output.write(`Unlimited Pok&eacute; with ${Players} players: ${PokemonCount} Pok&eacute;mon.`);
    }
    var hasPokemon = (y, x) => !y.pokemon.includes(x);

    for (var i in players) {
        if (!reroll || players[i].reroll) {
            var starter = starter = select(starters_c);
            while (
                (legendaries.includes(starter) && Legendary[1] === 0) ||
                (normals.includes(starter) && Normal[1] === 0) ||
                (trash.includes(starter) && Trash[1] === 0) ||
                (commons.includes(starter) && Common[1] === 0))
                    starter = select(starters_c);

            addPokemon(players[i], starter);
        }
    }

    function calculateReqs(player) {
        // Calculate how many pokemon slots would be required to fill all a player's needs
        let legdiff = Math.max(Legendary[0] - player.legendary, 0);
        let nordiff = Math.max(Normal[0] - player.normal, 0);
        let comdiff = Math.max(Common[0] - player.common, 0);
        let trsdiff = Math.max(Trash[0] - player.trash, 0);

        return legdiff + nordiff + comdiff + trsdiff;
    }

    function calcNeeded(type, amount) {
        let total = 0;
        for (var i in players) {
            total += Math.max(amount - players[i][type], 0);
        }
        return total;
    }

    var yeet = false;
    for (var n = PokemonCount - 1; n > 0; n--) {
        for (var i in players) {
            if (players[i].pokemon.length === PokemonCount) 
                continue;

            let diff = calculateReqs(players[i]);
            if (diff === n) {
                if (players[i].normal < Normal[0]) {
                    let pool = normals.filter(x => hasPokemon(players[i], x));
                    pool = pool.filter(x => !(players[i].common >= Common[1] && commons.includes(x)))
                    addPokemon(players[i], select(pool));
                }
                else if (players[i].common < Common[0]) {
                    let pool = commons.filter((a) => {
                        if (players[i].normal >= Normal[1] && normals.includes(a)) return false;
                        if (players[i].legendary >= Legendary[1] && legendaries.includes(a)) return false;
                        if (players[i].trash >= Trash[1] && trash.includes(a)) return false;
                        return !players[i].pokemon.includes(a);
                    })
                    addPokemon(players[i], select(pool));
                }
                else if (players[i].legendary < Legendary[0]) {
                    let pool = legendaries.filter(x => hasPokemon(players[i], x));
                    pool = pool.filter(x => !(players[i].common >= Common[1] && commons.includes(x)));
                    addPokemon(players[i], select(pool));
                }
                else if (players[i].trash < Trash[0]) {
                    let pool = trash.filter(x => hasPokemon(players[i], x));
                    pool = pool.filter(x => !(players[i].common >= Common[1] && commons.includes(x)));
                    addPokemon(players[i], select(pool));
                }
                continue;
            }

            let banned = {
                common: calcNeeded("common", Common[1]) <= commons.length && players[i].common >= Common[0],
                normal: calcNeeded("normal", Normal[1]) <= normals.length && players[i].normal >= Normal[0],
                legendary: calcNeeded("legendary", Legendary[1]) <= legendaries.length && players[i].legendary >= Legendary[0],
                trash: calcNeeded("trash", Trash[1]) <= trash.length && players[i].trash >= Trash[0],
            }

            var filtered = pokemon.filter((a) => {
                if ((players[i].normal >= Normal[1] || banned.normal) && normals.includes(a)) return false;
                if ((players[i].legendary >= Legendary[1] || banned.legendary) && legendaries.includes(a)) return false;
                if ((players[i].common >= Common[1] || banned.common) && commons.includes(a)) return false;
                if ((players[i].trash >= Trash[1] || banned.trash) && trash.includes(a)) return false;
                return !players[i].pokemon.includes(a);
            })
            if (!filtered.length) {
                yeet = true;
                break;
            }
            var mon = select(filtered);
            addPokemon(players[i], select(filtered));
        }

        if (yeet) break;
    }

    for (let i in players) {
        players[i].reroll = false;
    }
    output.write(`legendary = <span class="result legendary">yellow</span>, normal = <span class="result normal">blue</span>, trash = <span class="result trash">red</span>`)
    output.write(buildTableOutput(players));
    lastroll = players;
    isRunning = false;
}