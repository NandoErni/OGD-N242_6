//Input
function sliderOninput() {
    updateSlider();
    updateArraySlider();
    init();
}

function bodyOnload(){
    if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
    {
        window.alert("Bitt benutzen sie nicht Internet Explorer");
        window.open("https://www.mozilla.org/de/firefox/new/", "_self");
    }
    readingFinanzausgleich();
    updateSlider();
    color = ["#228b22", "#ee2c2c", "#dddddd"];
    init();
}

function onClickMap(id) {
    var gName = "";
    for(var i = 0; i < dataArray.length; i++){
        if (dataArray[i][0] == id){
            gName = dataArray[i][1];
        }
    }
    updateGemeinde(gName);
    scroll_to("gemeindeH");
}

function bodyOnresize() {
    init();
}


//Update Site
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

function updateGemeinde(gemeinde) {
    var gemeindeImg = "http://www.omsakthiamma.org/images/404.png";
    for(var k = 0; k < gemeindeData.length; k++){
        if(gemeindeData[k][1] == gemeinde){
            gemeindeImg = gemeindeData[k][2];
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