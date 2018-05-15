var output = document.getElementById("slidOutput");
var slider = document.getElementById('slider');
const finanzausgleichPath = "data/Gesamtauswirkungen_Finanzausgleich.csv";
var dataArray = [], dataString, dataArrayRows, arrayTable = [];

function updateSlider() {
    output.innerHTML = slider.value;

}

function updateSliderTable() {
    var year = slider.value;
    var arrIndex = 0;
    //alert(dataArray[0][2] + " -- " + year.toString());
    for(var i = 0; i < dataArray.length; i++){

        if(dataArray[i][2] == year.toString()){
            arrayTable[arrIndex++] = dataArray[i];
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
                dataString = rawFile.responseText;
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
    updateSliderTable();
}

function bodyOnload(){
    readingFinanzausgleich();
    updateSlider();
}
