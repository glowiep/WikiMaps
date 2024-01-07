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
  
  // Open view-tab when view-button is clicked
  $("#profile").on("click", ".view-button", function(e) {
    e.preventDefault();
    setTimeout( function() {
      sidebar.open('view-tab');
    }, 150)
  });

  $("#fav-tab").on("click", ".view-button", function(e) {
    e.preventDefault();
    setTimeout( function() {
      sidebar.open('view-tab');
    }, 150)
  });

  $("#discover-tab").on("click", ".card", function(e) {
    e.preventDefault();
    setTimeout( function() {
      sidebar.open('view-tab');
    }, 150)
  });

  // Open map-tab when edit-button is clicked
  $("#profile").on("click", ".edit-button", function(e) {
    e.preventDefault();
    sidebar.open('map-tab');
  });

  $("#fav-tab").on("click", ".edit-button", function(e) {
    e.preventDefault();
    sidebar.open('map-tab');
  });

  // View tab opens after map is created to show map info
  $("#save-button").click(function (e) {
    setTimeout(() => {
      sidebar.open('view-tab');
    }, 100);
  });

  
  /* GUEST */
  // Open discover tab
  $("#guest-discover").click(function (e) {
    sidebar.open('discover-tab');
  });
});