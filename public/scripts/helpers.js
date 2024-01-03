function updateMapContent(data) {
  // Clear existing layers
  results.clearLayers();

  // Add new layers based on the data
  data.forEach(function(item) {
      // Assuming 'item' has latitude, longitude, and maybe other properties
      let marker = L.marker([item.latitude, item.longitude]).bindPopup(item.description);
      results.addLayer(marker);
  });
}

// document.getElementById('updateMapButton').addEventListener('click', function() {
//   updateMapContent(someDynamicData); // Update the map with the new data
// });
let count = 0 
$(".card").click(function (e) { 
  mapCount++;
  let mapContainerId = 'map' + mapCount;
  $('#mapContainers').append('<div id="' + mapContainerId + '" style="height: 400px;"></div>');

  createNewMap(mapContainerId);
});

function createNewMap(containerId) {
  let newMap = L.map(containerId).setView([51.505, -0.09], 13); // Adjust as needed
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);
}