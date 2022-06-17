let fs = require("fs");

let black = JSON.parse(fs.readFileSync("./black2/encounters.json"));
let white = JSON.parse(fs.readFileSync("./white2/encounters.json"));

let combined = {};

for (let i1 in black) {
    combined[i1] = {};
    for (let i2 in black[i1]) {
        combined[i1][i2] = {};
        for (let i3 in black[i1][i2]) {
            if (!combined[i1][i2][i3] || (combined[i1][i2][i3] && combined[i1][i2][i3] < black[i1][i2][i3])) {
                combined[i1][i2][i3] = black[i1][i2][i3];
            }
        }
        if (white[i1] && white[i1][i2]) for (let i3 in white[i1][i2]) {
            if (!combined[i1][i2][i3] || (combined[i1][i2][i3] && combined[i1][i2][i3] < white[i1][i2][i3])) {
                combined[i1][i2][i3] = white[i1][i2][i3];
            }
        }
    }
}

fs.writeFileSync("out.json", JSON.stringify(combined, null, 2))