/* Leaflet related scripts here */
import { 
  // updateContribMarkerList,
  addContribMarker,
  // removeContribMarker,
  addMarker,
  checkFormInputs
} from "/scripts/helpers.js";

$(() => {
  // Contributions - Remove a single contribution marker
  // window.removeContribMarker = function (index) {
  //   map.removeLayer(contribPointsData[index].marker);
  //   contribPointsData.splice(index, 1);
  //   updateContribMarkerList();
  // };

  $("#save-button").prop("disabled", true);
  $("form :input").on("keyup change", function () {
    checkFormInputs();
  });
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

  $('#addContribPointBt').click(function (e) { 
    e.preventDefault();
    addContribMarker();
  });

});
