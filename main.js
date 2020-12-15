Chart.defaults.scale.ticks.beginAtZero = true;
var x = "tempo";
var bubble_x = "energy"
var bubble_y = "tempo"

getlinechart();
getbubblechart();
var Attributes = ['Popularity', 'Valence', 'Danceability', 'Energy', 'Acousticness', 'Speechiness'];
var songAttributes = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
var names = ["Hover to select", "Click to select"];
var ctx = document.getElementById('radarChart').getContext('2d');


var xData = function (d) {
  if (bubble_x == "tempo") {
    return d.tempo
  } else if (bubble_x == "acousticness") {
    return d.acousticness
  } else if (bubble_x == "danceability") {
    return d.danceability
  } else if (bubble_x == "energy") {
    return d.energy
  } else if (bubble_x == "instrumentalness") {
    return d.instrumentalness
  } else if (bubble_x == "valence") {
    return d.valence
  } else if (bubble_x == "popularity") {
    return d.popularity
  } else if (bubble_x == "liveness") {
    return d.liveness
  } else if (bubble_x == "loudness") {
    return d.loudness
  } else if (bubble_x == "speechiness") {
    return d.speechiness
  }
}

var yData = function (d) {
  if (bubble_y == "tempo") {
    return d.tempo
  } else if (bubble_y == "acousticness") {
    return d.acousticness
  } else if (bubble_y == "danceability") {
    return d.danceability
  } else if (bubble_y == "energy") {
    return d.energy
  } else if (bubble_y == "instrumentalness") {
    return d.instrumentalness
  } else if (bubble_y == "valence") {
    return d.valence
  } else if (bubble_y == "popularity") {
    return d.popularity
  } else if (bubble_y == "liveness") {
    return d.liveness
  } else if (bubble_y == "loudness") {
    return d.loudness
  } else if (bubble_y == "speechiness") {
    return d.speechiness
  }
}


var getSongName = function (d) {
  return d.name;
}

var getAttributes = function (d) {
  return [(d.popularity), (d.valence * 100), (d.danceability * 100), (d.energy * 100), (d.acousticness * 100), (d.speechiness * 100)];
}

var radarChart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'radar',
  // The data for our dataset
  data: {
    labels: Attributes,
    datasets: [{
      label: names[0],
      pointHitRadius: 20,
      backgroundColor: 'rgba(255, 77, 64,0.3)',
      borderColor: 'rgb(255, 77, 64)',
      lineTension: 0.2,
      pointHoverRadius: 5,
      data: songAttributes[0]
    }, {
      label: names[1],
      pointHitRadius: 20,
      backgroundColor: 'rgba(64, 128, 255, 0.3)',
      borderColor: 'rgb(64, 128, 255)',
      lineTension: 0.2,
      pointHoverRadius: 5,
      data: songAttributes[1]
    }]
  },
  // Configuration options go here
  options: {
    scale: {
      angleLines: {
        display: false
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    tooltips: {
      enabled: true,
      callbacks: {
        title: function (tooltipItem, data) {
          return data['labels'][tooltipItem[0]['index']];
        },
        label: function (tooltipItem, data) {
          return Math.round(data['datasets'][0]['data'][tooltipItem['index']]);
        },
      }
    }
  }
});

function getNewAttribute() {
  x = document.getElementById("change_attribute").value;
  $("#attribute").html(x);
  $("#my_dataviz").empty();
  $('#slider-range').empty();
  getlinechart();
}

function bubble_attribute_x() {
  bubble_x = document.getElementById("bubble_attribute_x").value;
  $("#my_bubble_sort").empty();
  getbubblechart();
}

function bubble_attribute_y() {
  bubble_y = document.getElementById("bubble_attribute_y").value;
  $("#my_bubble_sort").empty();
  getbubblechart();
}

function getlinechart() {
  // set the dimensions and margins of the graph
  var margin = { top: 100, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  svg.append("rect")
    .attr("width", "380")
    .attr("height", "270")
    .attr("fill", "DarkSeaGreen");

  svg.append("text")
    .attr("class", "x label")
    .style("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 30)
    .attr("dx", ".80em")
    .text("Years");

  //Read the data
  d3.csv(
    "data.csv",
    // When reading the csv, I must format variables:
    function (d) {

      if (x == "tempo") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Tempo");
        return { year: d3.timeParse("%Y")(d.year), value: parseFloat(d.tempo) };
      } else if (x == "acousticness") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Acousticness");
        return {
          year: d3.timeParse("%Y")(d.year),
          value: parseFloat(d.acousticness),
        };
      } else if (x == "danceability") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Danceability");
        return {
          year: d3.timeParse("%Y")(d.year),
          value: parseFloat(d.danceability),
        };
      } else if (x == "energy") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Energy");
        return { year: d3.timeParse("%Y")(d.year), value: parseFloat(d.energy) };
      } else if (x == "instrumentalness") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Instrumentalness");
        return {
          year: d3.timeParse("%Y")(d.year),
          value: parseFloat(d.instrumentalness),
        };
      } else if (x == "valence") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Valence");
        return { year: d3.timeParse("%Y")(d.year), value: parseFloat(d.valence) };
      } else if (x == "popularity") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Popularity");
        return { year: d3.timeParse("%Y")(d.year), value: parseInt(d.popularity) };
      } else if (x == "liveness") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Liveness");
        return { year: d3.timeParse("%Y")(d.year), value: parseFloat(d.liveness) };
      } else if (x == "loudness") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Loudness");
        return { year: d3.timeParse("%Y")(d.year), value: parseFloat(d.loudness) };
      } else if (x == "speechiness") {
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Avg. Speechiness");
        return { year: d3.timeParse("%Y")(d.year), value: parseFloat(d.speechiness) };
      }
    },

    // Now I can use this dataset:
    function (data) {
      range(data);

      // Add X axis --> it is a date format
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.year;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d.value;
          }),
        ])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));
      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "darkgreen")
        .attr("stroke-width", 3)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.year);
            })
            .y(function (d) {
              return y(d.value);
            })
        );
    }
  );
}

function range(data) {
  var sliderRange = d3
    .sliderBottom()
    .min(1980)
    .max(2020)
    .width(300)
    .ticks(5)
    .default([1980, 2020])
    .fill("#2196f3")
    .on("onchange", (val) => {
      d3.select("p#value-range").text(val.map(d3.timeFormat("0.2s")).join(" - "));
    });

    // function range(data) {
    //   $( "#slider-range" ).slider({
    //     range: true,
    //     min: 0,
    //     max: 500,
    //     values: [ 1980, 2020 ],
    //     slide: function( event, ui ) {
    //       $( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    //     }
    //   });
    //   $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    //     " - " + $( "p#value-range" ).slider( "values", 1 ) );
    // } ;

  var gRange = d3
    .select("div#slider-range")
    .append("svg")
    .attr("width", 500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)");

  gRange.call(sliderRange);

  d3.select("p#value-range").text(sliderRange.value().join("-"));
}

function getbubblechart() {
  // set the dimensions and margins of the graph
  var margin = { top: 70, right: 180, bottom: 30, left: 50 },
    width = 750 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#my_bubble_sort")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  // https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv
  d3.csv("bubbleTest.csv", function (data) {


    //TODO sort functionality
    function sortBubbleX(d) {
        g.selectAll("circle")
        .data(data)
        .transition()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(xData(d)); })
    }

    function sortBubbleY(d) {

    }

    data.forEach(function (d) {
      //maybe not
      d.year = parseInt(d.year);
      d.acousticness = parseFloat(d.acousticness);
      d.danceability = parseFloat(d.danceability);
      d.energy = parseFloat(d.energy);
      d.liveness = parseFloat(d.liveness);
      d.speechiness = parseFloat(d.speechiness);
      d.tempo = parseFloat(d.tempo);
      d.instrumentalness = parseFloat(d.instrumentalness);
    });

    //   var max = d3.max(data, function(d) { return d.instrumentalness
    // ; });
    // console.log(max);

    //select button
    var allGroup = ["tempo", "energy"];
    d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) //

    // Add X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function (d) {
        if (bubble_x == "tempo") {
          return d.tempo
        } else if (bubble_x == "acousticness") {
          return d.acousticness
        } else if (bubble_x == "danceability") {
          return d.danceability
        } else if (bubble_x == "energy") {
          return d.energy
        } else if (bubble_x == "instrumentalness") {
          return d.instrumentalness
        } else if (bubble_x == "valence") {
          return d.valence
        } else if (bubble_x == "popularity") {
          return d.popularity
        } else if (bubble_x == "liveness") {
          return d.liveness
        } else if (bubble_x == "loudness") {
          return d.loudness
        } else if (bubble_x == "speechiness") {
          return d.speechiness
        }
      })
      )
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


    // Add Y axis
    var y = d3.scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          if (bubble_y == "tempo") {
            return d.tempo
          } else if (bubble_y == "acousticness") {
            return d.acousticness
          } else if (bubble_y == "danceability") {
            return d.danceability
          } else if (bubble_y == "energy") {
            return d.energy
          } else if (bubble_y == "instrumentalness") {
            return d.instrumentalness
          } else if (bubble_y == "valence") {
            return d.valence
          } else if (bubble_y == "popularity") {
            return d.popularity
          } else if (bubble_y == "liveness") {
            return d.liveness
          } else if (bubble_y == "loudness") {
            return d.loudness
          } else if (bubble_y == "speechiness") {
            return d.speechiness
          }
        })
      ])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // document.getElementById("demo").innerHTML = d3.max(data, function (d) {
    //           return d.tempo;
    //         });


    // Add a scale for bubble size
    var z = d3.scaleLinear()
      .domain([0, 100])
      .range([10, 35]);

    // /
    // .domain( [0, 1200] )

    // Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
      .domain(["2020", "2021", "1999", "1998", "2019"])
      .range(d3.schemeSet2);

    // -1- Create a tooltip div that is hidden by default:
    var tooltip = d3.select("#my_bubble_sort")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")


    //@ISSUE: Tooltip functionality has some bugs when run together with Bootstrap, we should probably eliminate tooltip function 
    //        and display the text on the webpage.
    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function (d) {
      // tooltip
      //   .transition()
      tooltip
        // .duration(200)
        .style("opacity", 1)
        .html(bubble_x + ": " + xData(d) + "<br>" + bubble_y + ": " + yData(d) + "<br>Song: " + d.name)
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px");

      names[0] = getSongName(d);
      songAttributes[0] = getAttributes(d);
      RadarUpdate(0);

    }

    var moveTooltip = function (d) {
      tooltip
        .style("left", (d3.mouse(this)[0] + 80) + "px")
        .style("top", (d3.mouse(this)[1] + 80) + "px")
    }

    var hideTooltip = function (d) {
      tooltip
        .transition()
        .delay(1000)
        .duration(600)
        .style("opacity", 0)
    }

    var click = function (d) {
      names[1] = getSongName(d);
      songAttributes[1] = getAttributes(d);
      RadarUpdate(1);
    }

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) { return x(xData(d)); })
      .attr("cy", function (d) { return y(yData(d)); })
      .attr("r", function (d) { return z(d.popularity); })
      .style("fill", function (d) { return myColor(d.year); })
      // -4- Trigger the functions
      .on("click", click)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
      .on("mouseover", showTooltip)
  })
}

function RadarUpdate(song) {

  radarChart.data.datasets[song].data = songAttributes[song];
  radarChart.data.datasets[song].label = names[song];
  console.log(names[song]);
  radarChart.update({
    duration: 300,
    easing: 'easeInSine'
  });

  
}