function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   console.log(query)
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

function searchTable() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable2");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[2];
    td4 = tr[i].getElementsByTagName("td")[3];
    td5 = tr[i].getElementsByTagName("td")[4];
    td6 = tr[i].getElementsByTagName("td")[5];
    if (td) {
      if ((td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td2.innerHTML.toUpperCase().indexOf(filter) > -1)|| (td3.innerHTML.toUpperCase().indexOf(filter) > -1)|| (td4.innerHTML.toUpperCase().indexOf(filter) > -1) || (td5.innerHTML.toUpperCase().indexOf(filter) > -1) || (td6.innerHTML.toUpperCase().indexOf(filter) > -1) )  {
      tr[i].style.display = "";
      } else {
      tr[i].style.display = "none";
      }
    }
    }
  }

function showTableView() {
  document.getElementById('ContactBtn').style.display = 'inline';
  document.getElementById('MapViewBtn').style.display = 'inline';
  document.getElementById('TableViewBtn').style.display = 'none';
  document.getElementById('ContributeBtn').style.display = 'block';

  //
  document.getElementById('TableSearchField').style.display = 'block'
  //
  document.getElementById('contact').style.display = 'none';
  document.getElementById('table_view').style.display = 'block';
  document.getElementById('leaflet_map').style.display = 'none';
  document.getElementById('analytics').style.display = 'none';
  document.getElementById('contribute').style.display = 'none';


  document.getElementById('leaflet-control-search').style.display = 'none';
}

function openLive() {
  window.open("http://mapswipe.heigit.org/live.html");
}


function showMapView() {
  document.getElementById('ContactBtn').style.display = 'inline';
  document.getElementById('MapViewBtn').style.display = 'none';
  document.getElementById('TableViewBtn').style.display = 'inline';
  //
  document.getElementById('TableSearchField').style.display = 'none'
  //
  document.getElementById('contact').style.display = 'none';
  document.getElementById('table_view').style.display = 'none';

  document.getElementById('leaflet_map').style.display = 'block';
  document.getElementById('leaflet-control-search').style.display = 'inline';
  document.getElementById('ContributeBtn').style.display = 'block';

  // Check whether class of map is col-md-12 or col-md-8
  if (document.getElementById('leaflet_map').className == 'col-md-8'){
    document.getElementById('analytics').style.display = 'inline';
  }
  map.invalidateSize()
}

function showContactView() {
  document.getElementById('ContactBtn').style.display = 'none';
  document.getElementById('MapViewBtn').style.display = 'inline';
  document.getElementById('TableViewBtn').style.display = 'inline';
  document.getElementById('ContributeBtn').style.display = 'block';

  //
  document.getElementById('TableSearchField').style.display = 'none'
  //
  document.getElementById('contact').style.display = 'block';
  document.getElementById('table_view').style.display = 'none';
  document.getElementById('leaflet_map').style.display = 'none';
  document.getElementById('contribute').style.display = 'none';
  document.getElementById('analytics').style.display = 'none';
}

//






function addTileLayers(project_id){
  if (project_id > 0){
    layer_name = 'final_'+project_id
    console.log(layer_name)

    if(typeof msiLayer !== "undefined")
    {
    map.removeLayer(msiLayer);
    map.removeLayer(BadLayer);
    map.removeLayer(AgreementLayer);
    mapControl.removeLayer(msiLayer);
    mapControl.removeLayer(BadLayer);
    mapControl.removeLayer(AgreementLayer);
    }
  msiLayer = new L.tileLayer.wms('http://mapswipe-backend.geog.uni-heidelberg.de:8080/geoserver/ms_layers/wms?&tiled=true', {
    layers: layer_name,
    styles: 'msi',
    format: 'image/png',
    transparent: true,
    opacity: 0.7
  }).addTo(map);

  BadLayer = new L.tileLayer.wms('http://mapswipe-backend.geog.uni-heidelberg.de:8080/geoserver/ms_layers/wms?&tiled=true', {
    layers: layer_name,
    styles: 'bad_count',
    format: 'image/png',
    transparent: true,
    opacity: 0.7
  })//.addTo(map);

  AgreementLayer = new L.tileLayer.wms('http://mapswipe-backend.geog.uni-heidelberg.de:8080/geoserver/ms_layers/wms?&tiled=true', {
    layers: layer_name,
    styles: 'agreement',
    format: 'image/png',
    transparent: true,
    opacity: 0.7
  })//.addTo(map);

  var baseLayers = {
    "Microsoft Bing": bing,
    "OpenStreetMap": osm,
    };

  var overlays = {
    "Yes Proportion": msiLayer,
    "Bad Imagery Count": BadLayer,
    "Agreement": AgreementLayer
  };
  mapControl.addOverlay(msiLayer, "Yes Proportion")
  mapControl.addOverlay(BadLayer, "Bad Imagery Count")
  mapControl.addOverlay(AgreementLayer, "Agreement")
  }
}

// test: store the current project in a global variable;
var cur_project;
//adjusts the legend to the shown layer
// function setLegend(style) {
//   document.getElementById("legend").style.display = 'block';
//   document.getElementById("legend").src = "http://mapswipe-backend.geog.uni-heidelberg.de:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=final_1&STYLE=" + style;
// }
function showAnalyticsDiv(){
  document.getElementById("leaflet_map").className = 'col-md-8'
  $('#analytics').show(300)//"slide", {direction: "right" }, 1000);
  document.getElementById("show_details_btn").style.display = 'none';
  document.getElementById("hide_details_btn").style.display = 'block';
  map.invalidateSize(true);
}

function hideLegend(){
  //TO DO: hide/ show legend, important for mobile!
  document.getElementById("legendBox").style.display = 'none';
  document.getElementById("show_legend_btn").style.display = 'block';

}

function showLegend(){
  document.getElementById("legendBox").style.display = 'block';
  document.getElementById("show_legend_btn").style.display = 'none';

}

function hideAnalyticsDiv(){
  document.getElementById("leaflet_map").className = 'col-md-12'
  $('#analytics').hide()//"slide", { direction: "left" }, 1000);
  //document.getElementById("analytics").style.display = 'none'
  document.getElementById("show_details_btn").style.display = 'inline'
  // document.getElementById("hide_details_btn").style.display = 'none'
  map.invalidateSize(true)
}

function hideAttrib(){ //hides Attribution at the right hand buttom corner
  document.getElementsByClassName('leaflet-control-attribution' )[0].style.display = 'none';
  document.getElementById("hideAttrib").style.display = 'none';
  document.getElementById("showAttrib").style.display = 'block';
}
function showAttrib() {
  document.getElementsByClassName('leaflet-control-attribution' )[0].style.display = 'block';
  document.getElementById("hideAttrib").style.display = 'block';
  document.getElementById("showAttrib").style.display = 'none';
}

function setAnalyticsDiv(feature){
    console.log('set analytics div');
    document.getElementById("overallStats").style.display = 'none';
    document.getElementById("statistics").style.display = 'none';
    document.getElementById("download").style.display = 'none';
    document.getElementById("details").style.display = "block";
    document.getElementById("details_tab").className = "tablinks active";
    document.getElementById("about_tab").className = "tablinks active";
    document.getElementById("download_tab").className = "tablinks";
    document.getElementById("statistics").className = "tablinks";

    document.getElementById("projectDetails").style.display = 'inline';
    document.getElementById("leaflet_map").className = 'col-md-8'
    document.getElementById("analytics").style.display = 'inline'
    // document.getElementById("hide_details_btn").style.display = 'inline'
    if ((feature.properties.progress < 100) && (feature.properties.state == 0)) {
      var featureState = 'active'.fontcolor('orange')
    } else if ((feature.properties.progress < 100) && (feature.properties.state == 3)){
      var featureState = 'paused'
     }
    else {
      var featureState = 'finished'.fontcolor('blue')
    };
    console.log('pass')

    document.getElementById("ProjectName").innerHTML = feature.properties.id +': '+feature.properties.name
    document.getElementById("ProjectState").innerHTML = featureState



    var project_details = feature.properties.projectdetails.replace(/\\n/g, "<br/>");
    project_details = project_details.replace(/\\/g, "");

    document.getElementById("ProjectDescription").innerHTML = project_details
    // project_details

    document.getElementById("progress_bar").value = feature.properties.progress
    $('#progress_bar').css('width',feature.properties.progress+'%')
    document.getElementById("progress_span").innerHTML = feature.properties.progress + '%'
    document.getElementById("ProjectContributors").innerHTML = feature.properties.contributors
    project_id = feature.properties.id;

    //setdownloadMenu
    var link = "http://mapswipe.heigit.org/processing/data/" + project_id + '/';
    document.getElementById("badImagery").href = link + "bad_image_" + project_id + ".geojson";
    document.getElementById("final").href = link + "hot_tm_tasks_" + project_id + ".geojson";
    document.getElementById("results").href = link + "results_" + project_id + ".geojson";
    document.getElementById("yes_maybe").href = link + "yes_maybe_" + project_id + ".geojson";
  }


  function show_map(){

    var project_id = getQueryVariable('id')
    console.log(project_id)
    //window.history.pushState({id: project_id}, "", '?id=' + project_id);

    if (project_id > 0){
      layer_name = 'final_'+project_id
      console.log(layer_name)
    }
    else {
      project_id = 0
    }

    // Create the map
    map = L.map('leaflet_map', {
      center: [0, 0],
      zoom: 3,
      maxZoom: 18,
    });

    createBaseLayers();
    console.log("map should be shown");

    map.on('zoomend', function () {
      if (map.getZoom() >= 7 && map.hasLayer(points_layer) ) {
        map.removeLayer(points_layer);
        }
      if (map.getZoom() >= 7 && map.hasLayer(polygon_layer)==false ) {
        map.addLayer(polygon_layer);
        }
      if (map.getZoom() < 7 && map.hasLayer(points_layer)==false ) {
        map.addLayer(points_layer);
        }
      if (map.getZoom() < 7 && map.hasLayer(polygon_layer)) {
        map.removeLayer(polygon_layer);
        }
    });


    var geojsonMarkerOptions_green = {
      radius:6,
      fillColor: "blue",
      color: "white",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    };

    var geojsonMarkerOptions_yellow_active = {
      radius:10,
      fillColor: "orange",
      color: "#000",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    };

    var geojsonMarkerOptions_yellow_not_active = {
      radius:0,
      fillColor: "grey",
      color: "#000",
      weight: 0,
      opacity: 1,
      fillOpacity: 0.8
    };

    // set variable to count projects for the badges
    var count_finished = 0
    var count_active = 0

    url = 'data/projects_centroids.geojson'
    points_layer = new L.GeoJSON.AJAX(url, {
      pointToLayer: function (feature, latlng) {
        if ((feature.properties.progress < 100) && (feature.properties.state == 0) ){
          return L.circleMarker(latlng, geojsonMarkerOptions_yellow_active)
        }
        if ((feature.properties.progress < 100) && (feature.properties.state == 3) ){
          return L.circleMarker(latlng, geojsonMarkerOptions_yellow_not_active)
          //return {}
        }
        else {
          return L.circleMarker(latlng, geojsonMarkerOptions_green)
        }
      },
      onEachFeature: function (feature, layer) {

         layer.on('click', function (e) {

          // set project id
          project_id = feature.properties.id
          cur_project = feature;
          // window.history.pushState(null, null, '?id='+project_id)
          window.history.pushState({id: project_id}, "", '?id=' + project_id);
          //document.getElementById("Yes Count").style.display = 'block'; // to do: remove others?
          console.log(project_id)
          addTileLayers(project_id);

          // set analytics div
          setAnalyticsDiv(feature);

          hideAnalyticsDiv(); //for test
          showAnalyticsDiv();
          map.invalidateSize();

          // set view
          map.setView([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], 10);



          // set style
          polygon_layer.setStyle (
            function (feature) {
              if (feature.properties.id == project_id){
                return {weight: 3, color: 'black', fill: false}
              }
              else if ((feature.properties.progress < 100) && (feature.properties.state == 3) ){
                return {weight: 0, fill: false}
              }
              else if ((feature.properties.progress < 100) && (feature.properties.state == 0) ){
                return { color: 'black', weight: 2, fill: true, fillColor: 'orange', fillOpacity: 0.5 }
              }
              else {
                return { color: 'white', weight: 2, fill: true ,fillColor: 'blue', fillOpacity: 0.5 };
                }
              })
              mapControl._overlaysList.onchange();

          });

         var table = document.getElementById("myTable2")
         var row = table.insertRow(1)
         timestamp = feature.properties.lastcheck

          if ((feature.properties.progress < 100) && (feature.properties.state == 0)) {
           var featureState = 'active'.fontcolor('orange')
           count_active = count_active + 1
           document.getElementById("active_badge").innerHTML = count_active

           var featureId = feature.properties.id;
           var featureName = feature.properties.name;
           var featureProgress = feature.properties.progress;
           var featureContributors = feature.properties.contributors;
           var featureObjects = feature.properties.lookfor

           row_content = '<td>'+featureId+'</td><td>'+featureName+'</td><td>'+featureState+'</td><td>'+featureProgress+'</td><td>'+featureContributors+'</td><td>'+featureObjects+'</td><td><a href="http://mapswipe.heigit.org/processing/data/'+featureId+'/">Download</a></td><td>'+timestamp+'</td>'
           row.innerHTML = row_content
         }
         else if ((feature.properties.progress < 100) && (feature.properties.state == 3)){
          var featureState = 'paused'
         }
         else {
          var featureState = 'finished'.fontcolor('blue')
          count_finished = count_finished + 1
          document.getElementById("finished_badge").innerHTML = count_finished
          var featureId = feature.properties.id;
           var featureName = feature.properties.name;
           var featureProgress = feature.properties.progress;
           var featureContributors = feature.properties.contributors;
           var featureObjects = feature.properties.lookfor
           row_content = '<td>'+featureId+'</td><td>'+featureName+'</td><td>'+featureState+'</td><td>'+featureProgress+'</td><td>'+featureContributors+'</td><td>'+featureObjects+'</td><td><a href="http://mapswipe.heigit.org/processing/data/'+featureId+'/">Download</a></td><td>'+timestamp+'</td>'
           row.innerHTML = row_content
         }

       }

    })
    map.addLayer(points_layer)



    url = 'data/projects_extents.geojson'

    polygon_layer = new L.GeoJSON.AJAX(url, {

      style: function (feature) {
        if (feature.properties.id == project_id){
          console.log('project id match')
          return {weight: 3, color: 'black', fill: false}
        }
        else if ((feature.properties.progress < 100) && (feature.properties.state == 3) ){
          return {weight: 0, fill: false}
        }
        else if ((feature.properties.progress < 100) && (feature.properties.state == 0) ){
          return { color: 'black', weight: 2, fill: true, fillColor: 'orange', fillOpacity: 0.5 }
        }
        else {
          return { color: 'white', weight: 2, fill: true , fillColor: 'blue', fillOpacity: 0.5 };
          }
        },

      onEachFeature: function (feature, layer) {

        layer.on('click', function (e) {

          // set project id
          project_id = feature.properties.id

          window.history.pushState({id: project_id}, "", '?id=' + project_id);

          console.log(project_id)
          addTileLayers(project_id);

          map.fitBounds(layer.getBounds())
          // set analytics div
          setAnalyticsDiv(feature);
          hideAnalyticsDiv(); //for testing
          showAnalyticsDiv();
          map.invalidateSize();

          // set style
          polygon_layer.setStyle (
            function (feature) {
              if (feature.properties.id == project_id){ //selected project
                return {weight: 3, color: 'black', fill: false}
              }
              else if ((feature.properties.progress < 100) && (feature.properties.state == 3) ){
                return {weight: 0, fill: false}
              }
              else if ((feature.properties.progress < 100) && (feature.properties.state == 0) ){ //active project
                return { color: 'black', weight: 2, fill: true, fillColor: 'orange', fillOpacity: 0.5 }
              }
              else {
                return { color: 'white', weight: 2, fill: true, fillColor: 'blue', fillOpacity: 0.5 }; //finished project
                }
              })
              mapControl._overlaysList.onchange();

          });

        if (feature.properties.id == project_id){

          // set analytics div
          setAnalyticsDiv(feature);
          showAnalyticsDiv();
          map.invalidateSize(true);
          map.fitBounds(layer.getBounds())
        }

       }

    })

    //map.addLayer(polygon_layer)





    addTileLayers(project_id);


    map.addControl( new L.Control.Search({
      container: 'MapSearchField',
      layer: polygon_layer,
      propertyName: 'name',
      moveToLocation: function(latlng, title, map) {

        project_title = title
        project_id = latlng.layer.feature.properties.id

        polygon_layer.setStyle (

          function (feature) {
            if (feature.properties.id == project_id){
              return {weight: 3, color: 'black', fill: false}
            }
            else if ((feature.properties.progress < 100) && (feature.properties.state == 3) ){
              return {weight: 0, fill: false}
            }
            else if ((feature.properties.progress < 100) && (feature.properties.state == 0) ){
              return { color: 'black', weight: 2, fill: true, fillColor: 'yellow', fillOpacity: 0.5 }
            }
            else {
              return { color: 'white', weight: 2, fill: true ,fillColor: 'blue', fillOpacity: 0.5 };
              }
          }
        )

        setAnalyticsDiv(latlng.layer.feature);

        showAnalyticsDiv();
        map.invalidateSize(true);
        map.fitBounds( latlng.layer.getBounds() );
        addTileLayers(project_id);

        window.history.pushState(null, null, '?id='+project_id)
      },
      initial: false,
      collapsed: false}) );

  map.removeLayer(polygon_layer);
  mapControl._overlaysList.onchange(); // for refreshing or loading directly on a project
  create_statistics();



}


//Loads baselayers (Korona OSM, Korona OSM Greyscale, Bin Imagery), adds them to map and mapControl
function createBaseLayers() {
      //var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmUrl='http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}';
      var osmAttrib='Map data © <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a> contributors, tiles <a target="_blank" href="http://www.geog.uni-heidelberg.de/gis/index_en.html">GIScience Research Group @ Heidelberg University</a>';
      osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

      var osmGreyUrl = 'https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}';
      osmGrey = new L.TileLayer(osmGreyUrl, {attribution: osmAttrib});
      map.addLayer(osm);

      // Bing Layer
      var bing_key = 'AopsdXjtTu-IwNoCTiZBtgRJ1g7yPkzAi65nXplc-eLJwZHYlAIf2yuSY_Kjg3Wn'
      bing = L.tileLayer.bing(bing_key)


      var baseLayers = {
      "Microsoft Bing": bing,
      "OpenStreetMap": osm,
      "OpenStreetMap Greyscale": osmGrey
      };

      var overlays = {
      }
      mapControl = new L.control.layers(baseLayers,overlays, {collapsed: false});

      map.addControl(mapControl);

      mapControl._overlaysList.onchange = function() { //adjusts the legend to the change in layers

        for (i = 3; i < mapControl._layers.length; i++) { // the 3 stands for the 3 baseLayers. This should be solved dynamicly
            if (mapControl._layers[i].layer._container == undefined || typeof mapControl._layers[i].layer._container == null){
                document.getElementById(mapControl._layers[i].name).style.display = 'none';

            }
            else {
              document.getElementById(mapControl._layers[i].name).style.display = 'block';
            }
        }
      }
    }

    /*
    Reads data from json and writes them into tables
    */
  function create_statistics() {
     var stats = (function () {
       stats = null;
      $.ajax({
        'async': false,
        'global': true,
        'url': 'data/overall_stats.json',
        'dataType': "json",
        'success': function (data) {
            stats = data;
          }
        });
        return stats;
      })();
      document.getElementById("project_total").innerHTML = stats.project_total;
      document.getElementById("project_finished").innerHTML = stats.project_finished;
      document.getElementById("project_inactive").innerHTML = stats.project_inactive;
      document.getElementById("project_active").innerHTML = stats.project_active;

      document.getElementById("area_covered").innerHTML = stats.total_km_sq_covered;
      document.getElementById("area_small").innerHTML = stats.smallest_area;
      document.getElementById("area_large").innerHTML = stats.largest_area;

      document.getElementById("user_total").innerHTML = stats.user_total;
      document.getElementById("user_average").innerHTML = stats.user_avg_project;
    }

    function showContribute() {
      document.getElementById("contribute").style.display = "block";
      document.getElementById("contact").style.display = "none";
      document.getElementById("leaflet_map").style.display = "none";
      document.getElementById("table_view").style.display = "none";

      document.getElementById("ContributeBtn").style.display = "none";
      document.getElementById("MapViewBtn").style.display = "block";
      document.getElementById("TableViewBtn").style.display = "block";
      document.getElementById("ContactBtn").style.display = "block";
      hideAnalyticsDiv();
    }
    // function hideContribute() {
    //   document.getElementById("contribute").style.display = "none";
    //   showMapView();
    //   showAnalyticsDiv();
    // }

    //for switching between the tabs in the analyticsDiv
    function openTab(evt, name) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent"); //hide all tabs
      // console.log(tabcontent.length);
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", ""); //adjust style for all headers
          // console.log(tablinks[i].className);
          // console.log(i);
      }
      document.getElementById(name).style.display = "block"; //display targeted tab
      evt.currentTarget.className = "tablinks active"; //adjust style of targeted header
      console.log(name);
    }


      // handels changes in browserhistory: Adjusts AnalyticsDiv, Zoom, color of GeoJSON Objects, legends?
      window.onpopstate = function(event) {
        console.log(project_id);


        if(event.state == null) {
          document.getElementById("projectDetails").style.display = 'none';
          document.getElementById("overallStats").style.display = 'block';
          document.getElementById("About").style.display = "block";
          document.getElementById("about_tab").className += " active";
          map.setZoom(3);
          map.setView([0, 0]);

        } else {
        console.log(project_id);
        var layer;
        //get the right layer
        for( var f in  polygon_layer._layers) {
          if(typeof(polygon_layer._layers[f].feature.properties) != 'undefined' && polygon_layer._layers[f].feature.properties.id == event.state.id) {
            layer = polygon_layer._layers[f];
          }

      }
      feature = layer.feature;
      //probably layer.onclick() from here?
      setAnalyticsDiv(feature);
      //adjust colors
      project_id = event.state.id;

      polygon_layer.setStyle (
        function (feature) { //might be easier if accessed over old and new id only instead of loop trough all
          if (feature.properties.id == project_id){
            return {weight: 3, color: 'black', fill: false}
          }
          else if ((feature.properties.progress < 100) && (feature.properties.state == 3) ){
            return {weight: 0, fill: false}
          }
          else if ((feature.properties.progress < 100) && (feature.properties.state == 0) ){
            return { color: 'black', weight: 2, fill: true, fillColor: 'orange', fillOpacity: 0.5 }
          }
          else {
            return { color: 'white', weight: 2, fill: true ,fillColor: 'blue', fillOpacity: 0.5 };
            }
          }
          );


      //adjust view/zoom

      console.log(project_id)
      addTileLayers(project_id);

      map.fitBounds(layer.getBounds())
      // set analytics div
      setAnalyticsDiv(feature);
      showAnalyticsDiv();
      // map.invalidateSize();
      mapControl._overlaysList.onchange(); //adjust legends
      //curretnly, going back in browserhistory means that the deafulat layer (yes-count) is selected
    }
  }
      function share_facebook() {
        var msg;

        if(typeof (cur_project) != 'undefined') {
          msg = "Explore the results of #MapSwipe crowdmapping project" + cur_project.properties.name + ":";
        } else {
          msg = "Explore resutls of #MapSwipe, the humanitarian crowdmapping app:";
        }        window.open("http://www.facebook.com/sharer.php?u=" + window.location.href + "/&t=" + msg);

      }

      function share_twitter() {
        var msg;

        if(typeof(cur_project) != 'undefined') {
          console.log("project");
          msg = "Explore the results of the #MapSwipe crowdmapping project" + cur_project.properties.name + ":";
        } else {
          msg = "Explore results of MapSwipe, the humanitarian crowdmapping app:";
          console.log("main page");
        }
        window.open("https://twitter.com/share?url=" + String(window.location.href) +"/&amp;text=" +  msg + "/&amp;hashtags=mapswipe");
      }


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-97247301-1', 'auto');
ga('send', 'pageview');
