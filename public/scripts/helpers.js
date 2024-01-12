const map = L.map("map").setView([43.644218, -79.402229], 13);
let pointsData = [];
let contribPointsData = [];
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

export function updateMarkerList() {
  let $list = $("#create-point-list");
  $list.empty();

  pointsData.forEach(function (markerObj, index) {
    let $listItem = $(`<div class="point-item"></div>`);

    let $button = $(`
          <div class="item-bar">
            <button class="icon-button delete-point-button" type="submit">
              <span data-toggle="tooltip" title="Delete Location"><i class="fa-solid fa-trash action-item"></i></span>
            </button>
          </div>
        `).click(function () {
      removeMarker(index);
    });
    $listItem
      .append(
        `
        <div class="point-item">
          <div>📍 ${markerObj.description} </div>
        </div>
      `
      )
      .append($button)
      .click(function () {
        map.setView(markerObj.marker.getLatLng(), 13); // Center the map on the marker
        markerObj.marker.openPopup(); // Open the marker's popup
      });

    $list.append($listItem);
  });
}
$("#new-map-button").click(function (e) {
  results.clearLayers();
  pointsData = [];
  updateMarkerList();
});
// Function to check the form inputs
export function checkFormInputs() {
  var allFilled = true;

  $("#mapForm :input").each(function () {
    if ($(this).val() === "" && pointsData.length <= 0) {
      allFilled = false;
      return false; // break the loop
    }
  });

  $("#save-button").prop("disabled", !allFilled);
}

export function createPoint(map_id) {
  for (const point of pointsData) {
    let description = point.description;
    let latitude = point.latitude;
    let longitude = point.longitude;
    let imageUrl = point.imageUrl;
    $.ajax({
      url: "/maps/points/add",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        description,
        imageUrl,
        latitude,
        longitude,
        map_id,
      }),
    });
  }
}

/**
 * Function to load points based on the map_id, to display on the view tab
 * GET /maps/:user_id/points
 */
export function loadMapInfo(map_id) {
  $.ajax({
    url: `/maps/:user_id/${map_id}/map-info`,
    type: "GET",
    success: function (maps) {
      const $defaultText = $("#view-tab-default");
      const $mapInfo = $("#map-info-div");
      // Hide default view tab text
      $defaultText.hide();
      // Clear map info
      $mapInfo.empty();

      // Append point list items based on API response
      $.each(maps, function (index, map) {
        $mapInfo.append(`
          <h6 id=${map.id} class="map-title-info">
            MAP TITLE
          </h6>
          <div id="map-title">
            ${map.title}
            <span class=private-identifier data-toggle="tooltip" title="Private Map"></span></b>          
          </div>
          <br>
          <h6>MAP DESCRIPTION</h6>
          <div id="map-description">${map.description}</div>
          <div class="point-actions">
            <button id="add-new-point-button" class="btn btn-success">Add Point</button>
            <button id="save-new-point" type="submit" class="btn btn-warning save-new-point">Save</button>
          </div>
        `)
        hideContributionSave()
        hideAddNewPointSave()
        if (map.private) {
          $mapInfo
            .find(`#map-title`)
            .find(".private-identifier")
            .append(`<i class="fa-solid fa-lock"></i>`);
        } 
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}
/**
 * Function to load map info based on the map_id, to display on the view tab via DISCOVER
 * GET /maps/:user_id/points
 */
export function loadDiscoverMapInfo(map_id) {
  $.ajax({
    url: `/maps/:user_id/${map_id}/map-info`,
    type: "GET",
    success: function (maps) {
      const $defaultText = $("#view-tab-default");
      const $mapInfo = $("#map-info-div");
      // Hide default view tab text
      $defaultText.hide();
      // Clear map info
      $mapInfo.empty();

      // Append point list items based on API response
      $.each(maps, function (index, map) {
        $mapInfo.append(`
        <h6 id=${map.id} class="map-title-info">MAP TITLE</h6>
        <div id="map-title">${map.title}</div>
        <br>
        <h6>MAP DESCRIPTION</h6>
        <div id="map-description">${map.description}</div>
        <br>
      `);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

/**
 * Function to load points based on the map_id, to display on the view tab via DISCOVER
 * GET /maps/:user_id/points
 */
export function loadDiscoverPoints(map_id) {
  $.ajax({
    url: `/maps/:user_id/${map_id}/points`,
    type: "GET",
    success: function (points) {
      console.log(points);
      const $pointList = $("#point-list");
      // Clear existing list items
      $pointList.empty();

      $pointList.append(`
          <div class="point-actions">
          <button id="discover-fav-button" class="btn btn-light" type="submit">
            <span data-toggle="tooltip" title="Add to Favorites"><i class="fa-regular fa-heart action-item"></i></span>
            </button>
            <button id="contribute-button" class="btn btn-success" type="submit">Contribute</button>
            <button id="save-contribution" class="btn btn-warning" type="submit">Save</button>
          </div>
          <div id="contrib-marker-list"></div>
        `);

      // Append point list items based on API response
      $.each(points, function (index, point) {
        $pointList.append(`
            <div class="point-item" id=${point.id}>
              <div>📍 ${point.description} </div>
              <div class="point-actions">
                <button class="icon-button view-point-button" type="submit">
                  <span data-toggle="tooltip" title="View Point"><i class="fa-solid fa-eye action-item"></i></span>
                </button>
              </div>
            </div>
          `);
      });
      hideContributionSave();

      if ($("#contrib-marker-list").is(":empty")) {
        clearContribLayer();
      }
    },
    error: function (xhr, status, error) {
      alert("error");
      console.error("Error:", error);
    },
  });
}

/**
 * Function to load points based on the map_id, to display on the view tab - via user profile
 * GET /maps/:user_id/points
 */
export function loadPoints(map_id) {
  $.ajax({
    url: `/maps/:user_id/${map_id}/points`,
    type: "GET",
    success: function (points) {
      const $defaultText = $("#view-tab-default");
      const $pointList = $("#point-list");
      // Hide default view tab text
      $defaultText.hide();
      // Clear existing list items
      $pointList
        .empty()
        .append(`
            <div id="contrib-marker-list"></div>
          `);

      // Append point list items based on API response
      $.each(points, function (index, point) {
        $pointList.append(`
          <div class="point-item" id=${point.id}>
            <div>📍 ${point.description} </div>
            <div class="point-actions">
              <button class="icon-button edit-point-button" type="submit">
                <span data-toggle="tooltip" title="View Location"><i class="fa-solid fa-solid fa-eye action-item action-item"></i></span>
              </button>
              <button class="icon-button delete-point-button" type="submit">
                <span data-toggle="tooltip" title="Delete Location"><i class="fa-solid fa-trash action-item"></i></span>
              </button>
            </div>
          </div>
        `);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

/**
 * For GUEST - Function to load points based on the map_id, to display on the view tab via DISCOVER
 * GET /maps/:user_id/points
 */
export function loadGuestPoints(map_id) {
  $.ajax({
    url: `/maps/:user_id/${map_id}/points`,
    type: "GET",
    success: function (points) {
      console.log(points);
      const $pointList = $("#point-list");
      // Clear existing list items
      $pointList.empty();

      // Append point list items based on API response
      $.each(points, function (index, point) {
        $pointList.append(`
            <div class="point-item" id=${point.id}>
              <div>📍 ${point.description} </div>
              <div class="point-actions">
                <button class="icon-button view-point-button" type="submit">
                  <span data-toggle="tooltip" title="View Location"><i class="fa-solid fa-eye action-item"></i></span>
                </button>
              </div>
            </div>
          `);
      });
      hideContributionSave();

      if ($("#contrib-marker-list").is(":empty")) {
        clearContribLayer();
      }
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

function hideContributionSave() {
  $("#save-contribution").hide();
}

function hideAddNewPointSave() {
  $("#save-new-point").hide();
}

// This loads the list of public maps in the Discover tab (for guest)
export function fetchMapList() {
  $.ajax({
    url: "api/maps/list",
    type: "GET",
    dataType: "json",
  }).done((response) => {
    const $mapList = $("#map-list");
    // Clear existing list items
    $mapList.empty();

    // Append new list items based on API response
    for (const map of response.maps) {
      // eventually link to http://localhost:8080/api/maps/<map_id>
      $mapList.append(`
      <div class="card discover" id=${map.id}>
        <button class="icon-button view-button" type="submit">
          <span data-toggle="tooltip" title="View Map"><i class="fa-solid fa-magnifying-glass action-item"></i></span>
        </button>
        <div class="map-card"><b> ${map.title} </b></div>
        <div class="map-card"> ${map.description} </div>
      </div>
      `);
    }
  });
}

// This loads the list of maps in the favorites tab (for logged in user)
export function loadFavorites() {
  $.ajax({
    url: `/maps/:user_id/favorites`,
    type: "GET",
  })
    .done((response) => {
      const $myFavList = $("#my-fav-list");

      // Clear existing list items
      $myFavList.empty();

      // Append new list items based on API response
      for (const map of response["data"]) {
        $myFavList.append(`
        <div class="card">
          <a class="map-list-item" id=${map.id}>
            <div class="map-card"><b> ${map.title}  </b></div>
            <div class="map-card"> ${map.description} </div>
          </a>
          <div class="item-bar">
          <button class="icon-button view-button" type="submit">
            <span data-toggle="tooltip" title="View Map"><i class="fa-solid fa-eye action-item"></i></span>
          </button>
          <button class="icon-button unfav-button" type="submit">
            <span data-toggle="tooltip" title="Remove from Favorites"><i class="fa-solid fa-heart-crack action-item"></i></span>
          </button>
          </div>
          </div>
        `);
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error:", error);
    });
}

// This loads the list of maps in the contributions tab (for logged in user)
export function loadContributions() {
  $.ajax({
    url: `/maps/:user_id/contributions`,
    type: "GET",
  })
    .done((response) => {
      const $myContribList = $("#my-contrib-list");

      // Clear existing list items
      $myContribList.empty();

      // Append new list items based on API response
      for (const map of response["data"]) {
        $myContribList.append(`
        <div class="card" id=${map.id}>
          <a class="map-list-item">
            <div class="map-card"><b> ${map.title}  </b></div>
            <div class="map-card"> ${map.description} </div>
          </a>
          <div class="item-bar">
            <button class="icon-button fav-button" type="submit">
              <span data-toggle="tooltip" title="Add to Favorites"><i class="fa-regular fa-heart action-item"></i></span>
            </button>
            <button class="icon-button view-button" type="submit">
              <span data-toggle="tooltip" title="View Map"><i class="fa-solid fa-eye action-item"></i></span>
            </button>
            <button class="icon-button delete-button" type="submit" id = ${map.id}>
              <span data-toggle="tooltip" title="Delete Contribution - This action is irreversible!"><i class="fa-solid fa-circle-minus action-item"></i></span>
            </button>
          </div>
        </div>
        `);
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error:", error);
    });
}

/**
 * Function to load maps for the user, displayed on the profile tab - My Maps
 * GET /maps/:user_id/my-maps
 */
export function loadMyMaps() {
  $.ajax({
    url: `/maps/:user_id/my-maps`,
    type: "GET",
    success: function (maps) {
      const $myMapsList = $("#my-maps-list");
      // Clear existing list items
      $myMapsList.empty();

      // Append new list items based on API response
      $.each(maps, function (index, map) {
        // eventually link to http://localhost:8080/api/maps/<map_id>
        $myMapsList.append(`
          <div class="card" id=${map.id}>
            <a class="map-list-item">
              <div class="map-card"><b> ${map.title}  
                <span class=private-identifier data-toggle="tooltip" title="Private Map"></span></b>
              </div>
              <div class="map-card"> ${map.description} </div>
            </a>
            <div class="item-bar">
              <button class="icon-button fav-button" type="submit">
                <span data-toggle="tooltip" title="Add to Favorites"><i class="fa-regular fa-heart action-item"></i></span>
              </button>
              <button class="icon-button view-button" type="submit">
                <span data-toggle="tooltip" title="View Map"><i class="fa-solid fa-eye action-item"></i></span>
              </button>
              <button class="icon-button delete-button" type="submit" id = ${map.id}>
                <span data-toggle="tooltip" title="Delete Map - This action is irreversible!"><i class="fa-solid fa-trash action-item"></i></span>
              </button>
            </div>
          </div>
        `);

        if (map.private) {
          $myMapsList
            .find(`#${map.id}`)
            .find(".private-identifier")
            .append(`<i class="fa-solid fa-lock"></i>`);
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

/**
 * Create Map
 * POST /maps/:username/:user_id/add
 */
export function createMap() {
  const title = $("#title").val();
  const description = $("#map-description").val();
  const isPrivate = $("#private").is(":checked");
  $.ajax({
    url: "/maps/:username/:user_id/add",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ title, description, isPrivate }),
    success: function (map) {
      console.log("Map created:", map);
      createPoint(map.id);

      setTimeout(() => {
        loadMapInfo(map.id);
        loadPoints(map.id);
      }, 150);

      loadMyMaps();
      loadFavorites();
      fetchMapList();
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

/**
 * Insert marker information from the map into the points database
 * @param {integer} map_id
 */
export function addPointsToMap(map_id) {
  let bounds = [];
  results.clearLayers();
  $.ajax({
    url: `/maps/:user_id/${map_id}/points`,
    type: "GET",
    success: function (points) {
      console.log("checking the point event>>>>", points);
      $.each(points, function (indexInArray, point) {
        console.log("checking the point img>>>>", point.image_url);
        bounds.push([point.latitude, point.longitude]);
        let description = point.description;
        let imageUrl = point.image_url;
        let marker = L.marker([point.latitude, point.longitude]).addTo(results);
        map.fitBounds(bounds);
        if (imageUrl === "" && description !== "") {
          marker.bindPopup("<b>Description:</b> " + description).openPopup();
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
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}

export function addMarker() {
  let description = $("#description").val(); // Using jQuery for value retrieval
  let imageUrl = $("#image").val(); // Using jQuery for value retrieval
  let marker = L.marker(map.getCenter(), { draggable: true }).addTo(map);

  marker.on("dragend", function (event) {
    let latitude = event.target.getLatLng().lat;
    let longitude = event.target.getLatLng().lng;
    pointsData.push({
      marker: marker,
      description: description,
      latitude: latitude,
      longitude: longitude,
      imageUrl: imageUrl,
    });
    console.log(">>>>> array 2", pointsData);
    updateMarkerList();
    marker.dragging.disable();
  });

  if (description === "") {
    return alert("Please add a location description!");
  }
  if (imageUrl === "" && description !== "") {
    marker.bindPopup("<b>Description:</b> " + description).openPopup();
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

  console.log("array points>>>>", pointsData);
  $("#markerModal").hide();
  $("#description").val("");
  $("#image").val("");
}

/**
 * Add contribution marker to the map
 */
export function addContribMarker() {
  let description = $("#contrib-description").val(); // Using jQuery for value retrieval
  let imageUrl = $("#contrib-image").val(); // Using jQuery for value retrieval
  let marker = L.marker(map.getCenter(), { draggable: true }).addTo(results);

  marker.on("dragend", function (event) {
    let latitude = event.target.getLatLng().lat;
    let longitude = event.target.getLatLng().lng;
    contribPointsData.push({
      marker: marker,
      description: description,
      latitude: latitude,
      longitude: longitude,
      imageUrl: imageUrl,
    });
    console.log(">>>>> contrib array", contribPointsData);
    updateContribMarkerList();
    marker.dragging.disable();
  });

  if (description === "") {
    return alert("Please add a location description!");
  }
  if (imageUrl === "" && description !== "") {
    marker.bindPopup("<b>Description:</b> " + description).openPopup();
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

  console.log("array points>>>>", contribPointsData);
  $("#contrib-markerModal").hide();
  $("#contrib-description").val("");
  $("#contrib-image").val("");
}

export function removeMarker(index) {
  map.removeLayer(pointsData[index].marker);
  pointsData.splice(index, 1);
  updateMarkerList();
}
// Contributions - Remove a single contribution marker
export function removeContribMarker(index) {
  map.removeLayer(contribPointsData[index].marker);
  contribPointsData.splice(index, 1);
  updateContribMarkerList();
}

export function clearContribLayer() {
  for (let i = 0; i < contribPointsData.length; i++) {
    map.removeLayer(contribPointsData[i].marker);
  }
  map.removeLayer(contribPointsData);
  contribPointsData.length = 0;
}

// Update Contrib Marker List
export function updateContribMarkerList() {
  let $contribList = $("#contrib-marker-list");
  // let $listAction = $("#contrib-marker-list").on("click", ".fa-trash", function() {
  //   removeMarker(index);
  // })
  $contribList.empty();

  contribPointsData.forEach(function (markerObj, index) {
    let $list = $("#contrib-marker-list");
    let $listItem = $(`<div class="point-item"></div>`);

    let $button = $(
      `
      <div class="point-actions">
          <button class="icon-button delete-point-button" type="submit">
            <span data-toggle="tooltip" title="Delete Marker"><i class="fa-solid fa-trash contrib-marker-delete action-item"></i></span>
          </button>
        </div>
      `
    ).click(function () {
      removeContribMarker(index);
    });

    $listItem
      .append(`<div>🟡 ${markerObj.description} </div>`)
      .append($button)
      .click(function () {
        map.setView(markerObj.marker.getLatLng(), 13); // Center the map on the marker
        markerObj.marker.openPopup(); // Open the marker's popup
      });

    $list.append($listItem);
  });

  if ($contribList.is(":not(:empty)")) {
    $("#save-contribution").show();
    $("#save-new-point").show();
  } else {
    contribPointsData.length = 0;
    $("#save-contribution").hide();
    $("#save-new-point").hide();
  }
}

/**
 * Action item: Contribute - Add point to existing map
 * POST /maps/:username/:user_id/add-contribution
 */
export function createContribPoint(map_id) {
  const promises = [];

  for (const point of contribPointsData) {
    let description = point.description;
    let latitude = point.latitude;
    let longitude = point.longitude;
    let imageUrl = point.imageUrl;

    // Promise to add contribution points to the points table
    const addContribPointPromise = new Promise((resolve, reject) => {
      $.ajax({
        url: "/maps/points/add",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          description,
          imageUrl,
          latitude,
          longitude,
          map_id,
        }),
        success: function (point) {
          console.log("SUCCESS creating contribution point!!!");
          resolve(point);
        },
        error: function (xhr, status, error) {
          reject(console.log("Error with addContribPointPromise (#1)", error));
        },
      });
    });

    promises.push(addContribPointPromise);
  }

  return Promise.all(promises);
}
