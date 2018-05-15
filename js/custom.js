var output = document.getElementById("slidOutput");
var slider = document.getElementById('slider');
var reader = new FileReader();
const finanzausgleichPath = "data/Gesamtauswirkungen_Finanzausgleich.csv";
var dataArray, dataString;

function updateSlider() {
    output.innerHTML = slider.value;
}

function readingFinanzausgleich() {
    readTextFile(finanzausgleichPath);
    alert(dataString);
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
    }
    rawFile.send(null);
}
