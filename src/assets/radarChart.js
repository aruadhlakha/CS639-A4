var Attributes = ['Popularity', 'Valence', 'Danceability', 'Energy', 'Acousticness', 'Speechiness'];
var songAttributes1, songAttributes2;
var name1, name2;

Chart.defaults.scale.ticks.beginAtZero = true;

var ctx = document.getElementById('radarChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'radar',
    // The data for our dataset
    data: {
        labels: Attributes,
        datasets: [{
            label: "Song 1",//songName1,
            backgroundColor: 'rgba(255, 77, 64,0.1)',
            borderColor: 'rgb(255, 77, 64)',
            data: [40, 52, 35, 12, 53, 70]//songAttributes1
        }, {
            label: "Song 2",//songName2,
            backgroundColor: 'rgba(64, 128, 255, 0.1)',
            borderColor: 'rgb(64, 128, 255)',
            data: [30, 12, 68, 23, 55, 50 ]//songAttributes2
        }]
    },


    // Configuration options go here
    options: {}
});