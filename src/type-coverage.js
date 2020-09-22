var json = function (target) {
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

var types = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];

var shorthands = {
    "Bug": "BUG",
    "Dark": "DRK",
    "Dragon": "DGN",
    "Electric": "ELE",
    "Fairy": "FAI",
    "Fighting": "FGH",
    "Fire": "FRE",
    "Flying": "FLY",
    "Ghost": "GST",
    "Grass": "GRS",
    "Ground": "GRD",
    "Ice": "ICE",
    "Normal": "NML",
    "Poison": "PSN",
    "Psychic": "PSY",
    "Rock": "RCK",
    "Steel": "STL",
    "Water": "WTR"
}

var typechart = json('/pokeseed/data/typechart.json');

var getEffectiveness = function (type1, type2, type3) {
    if (!typechart[type1] || !typechart[type2] || !typechart[type3]) return 0;
    return typechart[type1][type2] * typechart[type1][type3];
}

jQuery(function() {
    $('.typeinput').on('click', buildTable);
    buildTable();
});

var classes = {
    0: "eff immune",
    0.25: "eff resist strong",
    0.5: "eff resist",
    1: "eff neutral",
    2: "eff super",
    4: "eff super strong"
}

var buildTable = function (gen = 8) {
    var ret = `<tbody>`;
    var input = [];
    for (var i = 0; i < 18; i++) {
        input.push(document.getElementById("type" + i).checked)
    }
    var checked = []
    for (var i in types) {
        if (input[i]) checked.push(i);
    }

    var chart = [];
    for (var x in types) {
        chart.push([])
        for (var y in types) {
            chart[x].push(0);
        }
    }
    for (var type of checked) {
        for (var x in types) {
            for (var y in types) {
                var res = getEffectiveness(type, x, y);
                if (res > chart[y][x]) chart[y][x] = res;
            }
        }
    }
    for (var type1 = -1; type1 < types.length; type1++) {
        ret += "<tr>";
        for (var type2 = -1; type2 < types.length; type2++) {
            if (type1 == -1 && type2 == -1) ret += "<th></th>";
            else if (type1 == -1) ret += `<th class="type-${toId(types[type2])}">${shorthands[types[type2]]}</th>`;
            else if (type2 == -1) ret += `<th class="type-${toId(types[type1])} leftheader">${types[type1]}</th>`;
            else ret += `<td class="${classes[chart[type2][type1]]}">${chart[type2][type1]}</td>`;
        }
        ret += "</tr>";
    }
    ret += `</tbody>`;
    document.getElementsByClassName("typechart")[0].innerHTML = ret;
}