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

  // Add search bar
  const searchControl = new L.esri.Controls.Geosearch().addTo(map);

  // (geoman) define Drawing toolbar options
  var options = {
    position: "topleft", // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: true, // adds button to draw markers
    drawPolyline: false, // adds button to draw a polyline
    drawRectangle: false, // adds button to draw a rectangle
    drawPolygon: false, // adds button to draw a polygon
    drawCircle: false, // adds button to draw a cricle
    cutPolygon: false, // adds button to cut a hole in a polygon
    editMode: true, // adds button to toggle edit mode for all layers
    removalMode: true, // adds a button to remove layers
  };

  // add leaflet.pm controls to the map
  map.pm.addControls(options);
});
