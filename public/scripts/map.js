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

  function updateMarkerList() {
    let list = document.getElementById('marker-list').getElementsByTagName('ul')[0];
    list.innerHTML = '';
    markers.forEach(function(markerObj, index) {
        let listItem = document.createElement('li');
        listItem.innerHTML = markerObj.description +
                             ' <button onclick="removeMarker(' + index + ')">Delete</button>';
        listItem.onclick = function() {
            map.setView(markerObj.marker.getLatLng(), 13); // Centrar el mapa en el marcador
            markerObj.marker.openPopup(); // Abrir el popup del marcador
        };
        list.appendChild(listItem);
    });
}

window.removeMarker = function(index) {
    map.removeLayer(markers[index].marker);
    markers.splice(index, 1);
    updateMarkerList();
};

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
