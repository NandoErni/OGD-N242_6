//Global vars
const finanzausgleichPath = "data/Gesamtauswirkungen_Finanzausgleichohne.csv";
var output = document.getElementById("slidOutput");
var slider = document.getElementById('slider');
var dataArray = [], dataString, dataArrayRows, sliderArray = [], tableArray = [], color;


function generateTable(data) {
    var table = document.getElementById("dataTable");
    var html = "";

    html += "<thead>\n" +
        "    <tr>\n" +
        "      <th scope=\"col\">Jahr</th>\n" +
        "      <th scope=\"col\">Auszahlung oder Abschoepfung in CHF</th>\n" +
        "      <th scope=\"col\">Auszahlung oder Abschoepfung in CHF pro Einwohner</th>\n" +
        "    </tr>\n" +
        "  </thead>";

    html += "<tbody>";
    for(var i = 0; i < data.length; i++){

    html += "<tr>\n" +
        "      <th scope=\"row\">"+data[i][2]+"</th>\n" +
        "      <td>"+data[i][3]+"</td>\n" +
        "      <td>"+data[i][4]+"</td>\n" +
        "    </tr>";

    }
    html += "</tbody>";
    table.innerHTML = html;
}


function scroll_to(div){
    $('html, body').animate({
        scrollTop: document.getElementById(div).offsetTop-60
    },1000);
}
