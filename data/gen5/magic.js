let fs = require("fs");

let black = JSON.parse(fs.readFileSync("./black2/encounters.json"));
let white = JSON.parse(fs.readFileSync("./white2/encounters.json"));

let combined = {};

let combineObjects = function(obj1, obj2) {
    let combined = {};
    for (let i in obj1) {
        if (!combined[i]) combined[i] = {};
        let areadata = obj1[i];
        for (let pokemon in areadata) {
            if (!combined[i][pokemon]) combined[i][pokemon] = 0;
    
            if (combined[i][pokemon] < areadata[pokemon]) combined[i][pokemon] = areadata[pokemon];
        }
    }

    for (let i in obj2) {
        if (!combined[i]) combined[i] = {};
        let areadata = obj2[i];
        for (let pokemon in areadata) {
            if (!combined[i][pokemon]) combined[i][pokemon] = 0;
    
            if (combined[i][pokemon] < areadata[pokemon]) combined[i][pokemon] = areadata[pokemon];
        }
    }

    return combined;
}

fs.writeFileSync("out.json", JSON.stringify(combineObjects(white, black), null, 2))