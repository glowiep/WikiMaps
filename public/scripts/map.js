/* Leaflet related scripts here */

$(document).ready(function () {
  // This setup the leafmap object by linking the map() method to the map id (in <section> html element)
  const map = L.map("map").setView([43.644218, -79.402229], 13);
  let markers = [];
  let tempLatLng;

  // Add OpenStreetMap tileLayer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    zoom: 1.5,
    minZoom: 2,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Will bounce back when scrolling off the map
  map.setMaxBounds([
    [-90, -180],
    [90, 180],
  ]);

  //add zoom control with your options
  map.zoomControl.setPosition("topright");

  // Add scale bar
  L.control.scale().addTo(map);

  // Empty layer group to store results --newly added
  let results = L.layerGroup().addTo(map);
  
//removeThisLater: test to show coordinates on console
console.log(results); 

  // create the geocoding control and add it to the map --newly added
  const searchControl = L.esri.Geocoding.geosearch({
    useMapBounds: true,
    expanded: false,
    zoomToResult: true,
    position: 'topleft',
    collapseAfterResult: true,
    placeholder: 'Search Address'
  }).addTo(map);

// removeThisLater: test to show coordinates in console
  map.on('click', 
					function(e){
						var coord = e.latlng.toString().split(',');
						var lat = coord[0].split('(');
						var lng = coord[1].split(')');
						console.log("You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]);
					});

window.removeMarker = function(index) {
    map.removeLayer(markers[index].marker);
    markers.splice(index, 1);
    updateMarkerList();
};

  // Listen for the results event and add marker to the map  --example - we can add a clear all button to clear the points from the map
  searchControl.on("results", function(data) {
    console.log(data.results);
    for (let i = data.results.length - 1; i >= 0; i--) {
      description = data.results[i].properties.LongLabel;
      longitude = data.results[i].properties.DisplayX;
      latitude = data.results[i].properties.DisplayY;
      
      markers = L.marker([latitude, longitude]).addTo(results)
    }
  });

map.on('contextmenu', function(event) {
    tempLatLng = event.latlng;
    document.getElementById('markerModal').style.display = 'block';
});

window.addMarker = function() {
    let description = document.getElementById('description').value;
    let imageUrl = document.getElementById('image').value;
    let marker = L.marker([tempLatLng.lat, tempLatLng.lng]).addTo(map);

    marker.bindPopup('<b>Description:</b> ' + description + '<br><img src="' + imageUrl + '" alt="imagen" style="width:100%;">').openPopup();

    markers.push({ marker: marker, description: description }); // Guardar el marcador y la descripción

    updateMarkerList();
    document.getElementById('markerModal').style.display = 'none';
    document.getElementById('description').value = '';
    document.getElementById('image').value = '';
};
});
