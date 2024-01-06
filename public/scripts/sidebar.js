/* Leaflet sidebar-v2 plugin (or just any sidebar) related scripts here 
 * More info on the plugin: https://github.com/noerw/leaflet-sidebar-v2
 */

$(document).ready(function() {
  // Add sidebar
  const sidebar = L.control.sidebar('sidebar').addTo(map);

  // New Map button opens New Map tab
  $("#new-map-button").click(function (e) {
    sidebar.open('map-tab');
  });

  // Add Point button opens New Map tab
  $("#point-button").click(function (e) {
    sidebar.open('map-tab');
  });

});