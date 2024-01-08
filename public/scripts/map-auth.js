/* Leaflet related scripts here */

  // Contributions - Remove a single contribution marker
  window.removeContribMarker = function (index) {
    map.removeLayer(contribPointsData[index].marker);
    contribPointsData.splice(index, 1);
    updateContribMarkerList();
  };

  // Map Creation - Show add point dialog
  $("#point-button").click(function (e) {
    e.preventDefault();
    $("#markerModal").css("display", "block");
  });

  // Contributions - Contribute button
  $("#view-tab").on("click", "#contribute-button", function(e) {
    e.preventDefault();
    $("#contrib-markerModal").css("display", "block");
  });


  $('#addPointBt').click(function (e) { 
    e.preventDefault();
    addMarker();
  });
});
