function init() {
    $('#graph').empty();
    var docu = document.getElementById('graph');

    var width = docu.clientWidth,
        height = docu.clientHeight,
        centered,
        clickBool = false;


    var path = d3.geo.path()
        .projection(null);

    var svg = d3.select("#graph").append("svg")
        .attr("width", 2000)
        .attr("height", 2000);

    var graph = d3.select("#graph").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);


    var g = svg.append("g")
        .attr("width", "")
        .attr("height", "");

    d3.json("lib/map/json/tg-municipalities-lakes.json", function(error, tg) {
            g.append("g")
                .attr("id", "municipalities")
                .selectAll("path")
                .data(topojson.feature(tg, tg.objects.municipalities).features)
                .enter().append("path")
                .attr("d", path)
                .on("click", clicked)
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .attr("fill", function(d) {
                    var gName = "";
                    for(var i = 0; i < dataArray.length; i++){
                        if (dataArray[i][0] == d.id && dataArray[i][2] == slider.value) {
                            if (dataArray[i][3] < 0) {
                                return color[1];
                            }else if(dataArray[i][3] == 0){
                                return color[2];
                            }else{
                                return color[0];
                            }
                        }
                    }

                });

        g.append("g")
            .attr("id", "lakes")
            .selectAll("path")
            .data(topojson.feature(tg, tg.objects.lakes).features)
            .enter().append("path")
            .attr("d", path);

        g.append("path")
            .datum(topojson.mesh(tg, tg.objects.municipalities, function(a, b) { return a !== b; }))
            .attr("id", "border")
            .style("stroke-width", "1px")
            .attr("d", path);
    });

    function clicked(d) {
        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;

            clickBool = true;

        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;

            clickBool = false;

        }
        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });


        onClickMap(d.id);
    }

    function mouseover(d) {
        var num = [];
        for(var i = 0; i < dataArray.length; i++){
            if (dataArray[i][0] == d.id && dataArray[i][2] == slider.value){
                if(dataArray[i][3] == null){
                    num[0] = 0;
                } else {
                    num[0] = dataArray[i][3];
                }

                if(dataArray[i][4] == "undefined"){
                    num[1] = 0;
                } else {
                    num[1] = dataArray[i][4];
                }
            }
        }
                graph.style("opacity", .9)
                    .html(getMName(d)+"<br>"+num[0]+" CHF<br>"+num[1]+" CHF")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
    }

    function mouseout(d) {
        graph.style("opacity", 0)
            .html();
    }

    function getMName(d) {
        for (i = 0; i < gemeindeData.length; i++) {
            if (d.id === gemeindeData[i][0]) {
                return gemeindeData[i][1] || d.id;
                continue;
            }
        }
    }
}


