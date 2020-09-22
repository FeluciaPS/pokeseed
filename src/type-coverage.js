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

var typechart = json('/pokeseed/data/typechart.json');

var getEffectiveness = function (type1, type2, type3) {
    if (!type1 || !type2 || !type3) return false;
    if (!typechart[type1] || !typechart[type2] || !typechart[type3]) return false;
    return typechart[type1][type2] * typechart[type1][type3];
}

var buildTable = function () {
    var ret = `<table class="typechart">`;
    var input = [];
    for (var i = 0; i < 18; i++) {
        input.push(document.getElementById("type" + i).checked)
    }
}