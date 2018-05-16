var output = document.getElementById("slidOutput");
var slider = document.getElementById('slider');
const finanzausgleichPath = "data/Gesamtauswirkungen_Finanzausgleichohne.csv";
var dataArray = [], dataString, dataArrayRows, sliderArray = [], tableArray = [];

function updateSlider() {
    output.innerHTML = "Jahr: " + slider.value;

}
function updateArraySlider() {
    var year = slider.value;
    var arrIndex = 0;
    for(var i = 0; i < dataArray.length; i++){

        if(dataArray[i][2] == year.toString()){
            sliderArray[arrIndex++] = dataArray[i];
        }
    }
}

function readingFinanzausgleich() {

    readTextFile(finanzausgleichPath);
    dataArrayRows = d3.csvParseRows(dataString);

    for(var i = 0; i < dataArrayRows.length; i++){
        dataArray[i] = string2Array(dataArrayRows[i].toString(), ';');
    }


}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                dataString = umlaute(replaceEmptyData(rawFile.responseText));
            }
        }
    };
    rawFile.send(null);
}

function string2Array(str, a) {
    var arr = [];
    var index = 0;
    arr[index] = "";
    for(var i = 0; i < str.length; i++){
        var cur=str[i];
        if(cur == a){
            index++;
            arr[index] = "";
        } else {
            arr[index] += cur;
        }
    }
    return arr;
}

function sliderOninput() {
    updateSlider();
    updateArraySlider();
}

function bodyOnload(){
    readingFinanzausgleich();
    updateSlider();
    updateGemeinde("Sulgen");

}

function generateTable(data) {
    var table = document.getElementById("dataTable");
    var html = "";

    html += "<thead>\n" +
        "    <tr>\n" +
        "      <th scope=\"col\">BFS-Nr.</th>\n" +
        "      <th scope=\"col\">Gemeinde</th>\n" +
        "      <th scope=\"col\">Jahr</th>\n" +
        "      <th scope=\"col\">Auszahlung oder Abschoepfung in CHF</th>\n" +
        "      <th scope=\"col\">Auszahlung oder Abschoepfung in CHF pro Einwohner</th>\n" +
        "    </tr>\n" +
        "  </thead>";

    html += "<tbody>";
    for(var i = 0; i < data.length; i++){

    html += "<tr>\n" +
        "      <th scope=\"row\">"+data[i][0]+"</th>\n" +
        "      <td>"+data[i][1]+"</td>\n" +
        "      <td>"+data[i][2]+"</td>\n" +
        "      <td>"+data[i][3]+"</td>\n" +
        "      <td>"+data[i][4]+"</td>\n" +
        "    </tr>";

    }
    html += "</tbody>";
    table.innerHTML = html;
}

function updateGemeinde(gemeinde) {
    for(var k = 0; k < gemeindeData.length; k++){
        if(gemeindeData[k][1] == gemeinde){
            var gemeindeImg = gemeindeData[k][2];
        }
    }

    document.getElementById("gemeindeH").innerHTML = "<img id='gemeindeLogo' src='"+ gemeindeImg+"'> " + gemeinde;
    var arrIndex = 0;
    for(var i = 0; i < dataArray.length; i++){
        if(dataArray[i][1] == gemeinde){
            tableArray[arrIndex++] = dataArray[i];
        }
    }
    generateTable(tableArray);
}

function replaceEmptyData(data) {
    var out = "";
    for(var i = 0; i < data.length-2; i++){
        if((data[i] == ";" && data[i+1] == ";")){
            out += ";0";
            i++;
        } else {
            out += data[i];
        }
    }
    return doppelNull(out);
}

function umlaute(data) {
    var out = "";
    for(var i = 0; i < data.length-1; i++){
        if((data[i] == "a" && data[i+1] == "e")){
            out += "ä";
            i++;
        } else if((data[i] == "o" && data[i+1] == "e")){
            out += "ö";
            i++;
        } else if((data[i] == "u" && data[i+1] == "e")){
            out += "ü";
            i++;
        } else {
            out += data[i];
        }
    }
    return out;
}

function doppelNull(data) {
    var out = "";
    for(var i = 0; i < data.length-1; i++){
        if((data[i] == "0" && data[i+1] == "0")){
            out += "0";
            i++;
        } else {
            out += data[i];
        }
    }
    return out;
}
