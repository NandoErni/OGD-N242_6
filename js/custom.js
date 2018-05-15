var output = document.getElementById("slidOutput");
var slider = document.getElementById('slider');
const finanzausgleichPath = "data/Gesamtauswirkungen_Finanzausgleich.csv";
var dataArray = [], dataString, dataArrayRows, arrayTable = [];

function updateSlider() {
    output.innerHTML = "Jahr: " + slider.value;

}

function updateSliderTable() {
    var year = slider.value;
    var arrIndex = 0;
    for(var i = 0; i < dataArray.length; i++){

        if(dataArray[i][2] == year.toString()){
            arrayTable[arrIndex++] = dataArray[i];
        }
    }
    generateTable(arrayTable);
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
                dataString = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
}
//as;asd;asd;lll
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
    updateSliderTable();
}

function bodyOnload(){
    readingFinanzausgleich();
    updateSlider();
}

function generateTable(data) {
    var html = '';

    if (typeof (data[0]) === 'undefined') {
        return null;
    }

    if (data[0].constructor === String) {
        html += '<tr>\r\n';
        for (var item in data) {
            html += '<td>' + data[item] + '</td>\r\n';
        }
        html += '</tr>\r\n';
    }

    if (data[0].constructor === Array) {
        for (var row in data) {
            html += '<tr>\r\n';
            for (var item in data[row]) {
                html += '<td>' + data[row][item] + '</td>\r\n';
            }
            html += '</tr>\r\n';
        }
    }

    if (data[0].constructor === Object) {
        for (var row in data) {
            html += '<tr>\r\n';
            for (var item in data[row]) {
                html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
            }
            html += '</tr>\r\n';
        }
    }

    return html;
}
