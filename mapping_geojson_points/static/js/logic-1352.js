// Add console.log to check to see if our code is working.
console.log("working-13.5.2");

// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// ________________________________________________________________________________________
// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// pointToLayer Method
// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // Turn each feature into a marker on the map
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr>"
//       + "<h4>" + feature.properties.city + ", " + feature.properties.country + "</h4>");
//   }
// }).addTo(map);

// onEachFeature Method
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     // console.log(layer);
//     layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2><hr>"
//       + "<h4>Airport Name: " + feature.properties.name + "</h4>");
//   }
// }).addTo(map);
// ________________________________________________________________________________________

// M U L T I P L E   L A Y E R S
// ________________________________________________________________________________________
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer to hold both maps
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create map object with center, zoom, and default layer
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// _______________________________________________________________________________________________
// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/amberteets/mapping-earthquakes/main/majorAirports.json";

// Grabbing GeoJSON data from GitHub
d3.json(airportData).then(function(data) {
  console.log(data);
  // Create GeoJSON layer from retrieved data
  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2>")
    }
  }).addTo(map);
});
