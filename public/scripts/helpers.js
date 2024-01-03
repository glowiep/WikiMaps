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
