//read CSV
function readingFinanzausgleich() {

    readTextFile(finanzausgleichPath);
    dataArrayRows = string2Array(dataString, "\n");

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


//Modifying the String
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
    for(var i = 10; i < data.length-1; i++) {
        if((data[i] == "u" && data[i+1] == "e" && data[i-1] == "a")){
            out += data[i];
        }else if((data[i] == "a" && data[i+1] == "e")){
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
    for(var i = 1; i < data.length-1; i++){
        if(data[i-1] == "2" && data[i] == "0" && data[i+1] == "0"){
            out += data[i];
        } else if(data[i] == "0" && data[i+1] == "0"){
            out += "0";
            i++;
        } else {
            out += data[i];
        }
    }
    return out;
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