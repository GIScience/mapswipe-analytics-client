function makeplot() {
  Plotly.d3.csv("https://dev.mapswipe.org/api/agg_progress_by_project_id_and_date/agg_progress_by_project_id_and_date_1.csv", function(data){ processData(data) } );
};

function processData(allRows) {

  console.log(allRows);
  var x = [], y = [], standard_deviation = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['day'] );
    y.push( row['cumulative_groups_finished_count'] );
  }
  console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
  makePlotly( x, y, standard_deviation );
}

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];

  Plotly.newPlot('plotlyGraph', traces,
    {title: 'Project Progress'});
};

function initProjectMap() {
  map = L.map('map').setView([0.0, 0.0], 2);
  L.tileLayer( 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  console.log('added map');

  setTimeout(function(){ map.invalidateSize()}, 400);
  }


function initAnalyticsProject() {
  initProjectMap();
  makeplot()
}