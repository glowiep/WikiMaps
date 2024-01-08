/* Leaflet related scripts here */
import { updateMarkerList, checkFormInputs,addMarker} from "/scripts/helpers.js";

$(document).ready(function () {
  

  $("#save-button").prop("disabled", true);

  // checkFormInputs();

  // Attach an event listener to input fields
  $("form :input").on("keyup change", function () {
    checkFormInputs();
  });
  

  $("#point-button").click(function (e) {
    document.getElementById("markerModal").style.display = "block";
  });

  $('#addPointBt').click(function (e) { 
    e.preventDefault();
    addMarker();
  });
});
