// Add console.log to check to see if our code is working.
console.log("working-13.5.6");

// ________________________________________________________________________________________
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer that holds both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satStreets
};

// Create the map object with center at Toronto.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/amberteets/mapping-earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Custom style
let myStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
};

// Grabbing GeoJSON data
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Add to map
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>" + feature.properties.AREA_NAME + "</h2>")
    }
  }).addTo(map);
});