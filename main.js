Chart.defaults.scale.ticks.beginAtZero = true;
var x = "tempo";
var bubble_x = "energy"
var bubble_y = "tempo"
var globalData;
var ascending = false;
var bubbleYear = 1980;
var minYear, maxYear;

populateBubbleYearSelect()
getlinechart();
getBubbleChart();
addAttributeDescription();
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

function populateBubbleYearSelect() {
  var select = "";
  for (i = 1980; i <= 2020; i++) {
    select += "<option val=" + i + ">" + i + "</option>";
  }
  $("#selectYear").html(select);
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
  addAttributeDescription();
}

function bubble_attribute_x() {
  bubble_x = document.getElementById("bubble_attribute_x").value;
  $("#my_bubble_sort").empty();
  getBubbleChart();
}

function bubble_attribute_y() {
  bubble_y = document.getElementById("bubble_attribute_y").value;
  $("#my_bubble_sort").empty();
  getBubbleChart();
}

function yearSelect() {
  bubbleYear = document.getElementById("selectYear").value;
  $("#my_bubble_sort").empty();
  getBubbleChart();
}

function getlinechart() {
  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 30, bottom: 30, left: 60 },
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
    .attr("width", width)
    .attr("height", height)
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
        .attr("transform", "translate(0," + height+ ")")
        .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d.value;
          })*1.5,
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

// Years for Graph 1
var dataTime = d3.range(0, 41).map(function (d) {
  return new Date(1980 + d, 10, 3);
});

var dataTimeTicks = d3.range(0, 5).map(function (d) {
  return new Date(1980 + d * 10, 10, 3);
});

function range(data) {
  var sliderRange = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(300)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTimeTicks)
    .default([new Date(1980, 10, 3), new Date(2020, 10, 3)])
    .fill('#2196f3')
    .on('onchange', val => {
      d3.select('p#value-range').text(val.map(d3.timeFormat('%Y')).join(' to '));
      console.log(minRange + " to " + maxRange);
    });


  var gRange = d3
    .select("div#slider-range")
    .append("svg")
    .attr("width", 500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)");

  gRange.call(sliderRange);
  d3.select('p#value-range').text(sliderRange.value().map(d3.timeFormat('%Y')).join(' to '));

  minRange = sliderRange.value()[0].getYear();
  maxRange = sliderRange.value()[1].getYear();
  
}

//Unused
function updateBubbleChart() {

  d3.selectAll("dot")
    .datum(globalData)
    .enter()
    .transition()
    .attr("class", "bubbles");

}

function getBubbleChart() {
  // set the dimensions and margins of the graph
  var margin = { top: 40, right: 180, bottom: 30, left: 50 },
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
  d3.csv("top_bottom.csv", function (data) {
    globalData = data;

    data.forEach(function (d) {
      //maybe not
      d.srno = parseInt(d.srno);
      d.year = parseInt(d.year);
      d.acousticness = parseFloat(d.acousticness);
      d.danceability = parseFloat(d.danceability);
      d.energy = parseFloat(d.energy);
      d.liveness = parseFloat(d.liveness);
      d.speechiness = parseFloat(d.speechiness);
      d.tempo = parseFloat(d.tempo);
      d.instrumentalness = parseFloat(d.instrumentalness);
    });


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
        .html(bubble_x + ": " + xData(d).toFixed(2) + "<br>" + bubble_y + ": " + yData(d).toFixed(2) + "<br>Song: " + d.name)
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
        // .delay(1000)
        // .duration()
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
      .classed('invisible', d => { return (d.year != bubbleYear) })
      .attr("cx", function (d) { return x(xData(d)) + 20; })
      .attr("cy", function (d) { return y(yData(d)) - 20; })
      .attr("r", function (d) { return z(d.popularity*d.popularity*d.popularity*0.0001); })
      .style("fill", function (d) { return myColor(d.year); })
      // -4- Trigger the functions
      .on("click", click)
      .on("mousemove", moveTooltip)
      .on("mouseover", showTooltip)
      .on("mouseleave", hideTooltip)
  })
}

d3.select("#sortX").on("click", function () {
  sortX(globalData);
})
d3.select("#sortY").on("click", function () {
  sortY(globalData);
})
d3.select("#reset").on("click", function () {
  bubbleReset(globalData);
})


//Functions to be triggered to sort the Bubble chart based on input
function sortX(d) {

  x.domain(d.sort(sortX).map(function (d, i) { return d.letter; }));
}

function sortY(d) {

}

function bubbleReset(d) {

}

//Comparator functions for sorting X, Y and reseting respectively.
function sortDataX(a, b) {
  if (ascending) {
    return xData(b) - xData(a);
  }
  return xData(a) - yData(b);
}

function sortDataY(a, b) {
  if (ascending) {
    return yData(b) - yData(a);
  }
  return yData(a) - yData(b);
}

function resetData(a, b) {
  return getSrNo(b) - getSrNo(a);
}

function getSrNo(d) {
  return d.srno;
}


function RadarUpdate(song) {

  radarChart.data.datasets[song].data = songAttributes[song];
  radarChart.data.datasets[song].label = names[song];
  radarChart.update({
    duration: 300,
    easing: 'easeInSine'
  });


}


function addAttributeDescription() {

  var Description = "Pooot";

  if (x == "tempo") {
    Description = "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.";
  } else if (x == "acousticness") {
    Description = "	A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. ";
  } else if (x == "danceability") {
    Description = "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. ";
  } else if (x == "energy") {
    Description = "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.";
  } else if (x == "instrumentalness") {
    Description = "Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.";
  } else if (x == "valence") {
    Description = "	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).";
  } else if (x == "popularity") {
    Description = "";
  } else if (x == "liveness") {
    Description = "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.";
  } else if (x == "loudness") {
    Description = "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.";
  } else if (x == "speechiness") {
    Description = "	Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. ";
  }

  document.getElementById('desc').innerHTML = Description;

}