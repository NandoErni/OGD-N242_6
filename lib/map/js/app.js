var muniArr = gemeindeData;

var color = [
    [1, "#228b22"],
    [2, "#ee2c2c"],
    [3, "#eeeeee"]
];

var btnP = null;

var max = 0;
for (i = 0; i < muniArr.length; i++) {
    if (max < muniArr[i][2]) {
        max = muniArr[i][2];
    }
}

init(true);