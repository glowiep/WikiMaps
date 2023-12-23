// Client facing scripts here
$(document).ready(function() {
  // This setup the leafmap object by linking the map() method to the map id (in <section> html element)
  const map = L.map('map').setView([43.644218, -79.402229], 13);

  // Add OpenStreetMap tileLayer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    zoom: 1.5,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  // Will bounce back when scrolling off the map
  map.setMaxBounds([[-90,-180], [90,180]])

  //add zoom control with your options
  map.zoomControl.setPosition('topright');
  
  // Add scale bar
  L.control.scale().addTo(map);

  // Add search bar
  const searchControl = new L.esri.Controls.Geosearch().addTo(map);
  const results = new Location.LayerGroup().addTo(map);
  searchControl.on('results', function(data) {
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  })
  

})
