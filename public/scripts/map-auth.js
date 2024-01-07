/* Leaflet related scripts here */
$(document).ready(function () {
  // This setup the leafmap object by linking the map() method to the map id (in <section> html element)
  const map = L.map("map").setView([43.644218, -79.402229], 13);
  let pointsData = [];
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

  // Empty layer group to store results --newly added
  let results = L.layerGroup().addTo(map);

  //removeThisLater: test to show coordinates on console
  console.log(results);

  // create the geocoding control and add it to the map --newly added
  const searchControl = L.esri.Geocoding.geosearch({
    useMapBounds: false,
    expanded: false,
    zoomToResult: true,
    position: "topleft",
    collapseAfterResult: true,
    placeholder: "Search Address",
  }).addTo(map);

  // removeThisLater: test to show coordinates in console
  map.on("click", function (e) {
    let coord = e.latlng.toString().split(",");
    let lat = coord[0].split("(");
    let lng = coord[1].split(")");
    console.log(
      "You clicked the map at latitude: " + lat[1] + " and longitude:" + lng[0]
    );
  });

  searchControl.on("results", function (data) {
    console.log(data.results);
  });

//   function addMarkerToMap(lat, lng, description) {
//     L.marker([lat, lng]).bindPopup(description).addTo(map);
// }
function updateMarkerList() {
  var $list = $("#marker-list ul").first();
  $list.empty();

  pointsData.forEach(function (markerObj, index) {
    var $listItem = $("<li>");

    var $button = $('<button>Delete</button>')
      .click(function() {
        removeMarker(index);
      });

    $listItem
      .html(markerObj.description + ' ')
      .append($button)
      .click(function () {
        map.setView(markerObj.marker.getLatLng(), 13); // Center the map on the marker
        markerObj.marker.openPopup(); // Open the marker's popup
      });

    $list.append($listItem);
  });
}
$('#save-button').prop('disabled', true);

    // Function to check the form inputs
    function checkFormInputs() {
        var allFilled = true;

        $('#mapForm :input').each(function() {
            if ($(this).val() === '' && pointsData.length <= 0) {
                allFilled = false;
                return false; // break the loop
            }
        });

        $('#save-button').prop('disabled', !allFilled);
    }

    // Attach an event listener to input fields
    $('form :input').on('keyup change', function() {
        checkFormInputs();
    });
  window.removeMarker = function (index) {
    map.removeLayer(pointsData[index].marker);
    pointsData.splice(index, 1);
    updateMarkerList();
  };

  $("#point-button").click(function (e) {
    document.getElementById("markerModal").style.display = "block";
  });

  window.addMarker = function () {
    
    let description = $("#description").val(); // Using jQuery for value retrieval
    let imageUrl = $("#image").val(); // Using jQuery for value retrieval
    let marker = L.marker(map.getCenter(), { draggable: true }).addTo(results);

    
    
    marker.on('dragend', function (event) {
      let latitude = event.target.getLatLng().lat;
      let longitude = event.target.getLatLng().lng;
      pointsData.push({ marker: marker, description: description,latitude: latitude, longitude: longitude, imageUrl: imageUrl})
      console.log(">>>>> array 2", pointsData);
      updateMarkerList();
      marker.dragging.disable();
    })
    
    if (description === '') {
      return alert('Please add a location description!');
    }
    if (imageUrl === '' && description !== '') {
      marker
      .bindPopup(
        "<b>Description:</b> " +
          description
      )
      .openPopup();
    } else {
      marker
        .bindPopup(
          "<b>Description:</b> " +
            description +
            '<br><img src="' +
            imageUrl +
            '" alt="imagen" style="width:100%;">'
        )
        .openPopup();
    }
    // Using jQuery to hide the modal and reset form values
    
    console.log("array points>>>>",pointsData);
    $("#markerModal").hide();
    $("#description").val("");
    $("#image").val("");
};

(function($) {
  function createPoint (map_id) {
    for (const point of pointsData) {
      let description = point.description;
      let latitude = point.latitude;
      let longitude = point.longitude;
      let imageUrl = point.imageUrl;
      $.ajax({
        url: "/maps/points/add",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ description, imageUrl, latitude, longitude, map_id })
      });
    } 
    
  }


$.createPoint = createPoint;
})(jQuery);

});
