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

  // Listen for the results event and add marker to the map  --example - we can add a clear all button to clear the points from the map
  // searchControl.on("results", function (data) {
  //   console.log(data.results);
  //   for (let i = data.results.length - 1; i >= 0; i--) {
  //     description = data.results[i].properties.LongLabel;
  //     longitude = data.results[i].properties.DisplayX;
  //     latitude = data.results[i].properties.DisplayY;

  //     markers = L.marker([latitude, longitude]).addTo(results);
  //   }
  // });

  function updateMarkerList() {
    let list = document
      .getElementById("marker-list")
      .getElementsByTagName("ul")[0];
    list.innerHTML = "";
    markers.forEach(function (markerObj, index) {
      let listItem = document.createElement("li");
      listItem.innerHTML =
        markerObj.description +
        ' <button onclick="removeMarker(' +
        index +
        ')">Delete</button>';
      listItem.onclick = function () {
        map.setView(markerObj.marker.getLatLng(), 13); // Centrar el mapa en el marcador
        markerObj.marker.openPopup(); // Abrir el popup del marcador
      };
      list.appendChild(listItem);
    });
  }
  window.removeMarker = function (index) {
    map.removeLayer(markers[index].marker);
    markers.splice(index, 1);
    updateMarkerList();
  };

  $("#point-button").click(function (e) {
    document.getElementById("markerModal").style.display = "block";
  });

  window.addMarker = function () {
    let description = document.getElementById("description").value;
    let imageUrl = document.getElementById("image").value;
    let marker = L.marker(map.getCenter(), { draggable: true }).addTo(map);

    marker
      .bindPopup(
        "<b>Description:</b> " +
          description +
          '<br><img src="' +
          imageUrl +
          '" alt="imagen" style="width:100%;">'
      )
      .openPopup();

    markers.push({ marker: marker, description: description }); // Guardar el marcador y la descripción

    updateMarkerList();
    document.getElementById("markerModal").style.display = "none";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
  };

  $("#new-map-button").click(function (e) {
    document.getElementById("mapBox").style.display = "block";
  });

  $("#mapForm").submit(function (event) {
    event.preventDefault();
    const title = $("#mapTitle").val();
    const description = $("#mapDescription").val();
    const isPrivate = $("#isPrivate").is(":checked");
    document.getElementById("mapBox").style.display = "none";
    $.ajax({
      url: "/maps/:username/:user_id/add",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ title, description, isPrivate }),
      success: function (map) {
        console.log("Map created:", map);
        loadMaps();
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });
  function loadMaps() {
    $.ajax({
      url: `/maps/:user_id`,
      type: "GET",
      success: function (maps) {
        const mapsList = $("#mapsList");
        mapsList.empty();
        $.each(maps, function (index, map) {
          mapsList
            .append($("<a>").text(`${map.title} - ${map.description}`))
            .append($("<br>"));
        });
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
  loadMaps();
});
