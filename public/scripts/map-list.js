// For GUEST sidebar
import {
  loadDiscoverMapInfo,
  loadGuestPoints,
  fetchMapList,
  addPointsToMap,
  loadMapInfo
} from "/scripts/helpers.js";

$(() => {
  $("#map-list").on("click", ".discover", function (e) {
    e.preventDefault();
    const map_id = $(this).attr("id");
    loadDiscoverMapInfo(map_id);
    loadGuestPoints(map_id);
    addPointsToMap(map_id);
  });

  // Refresh view-tab point list when contributions are saved
  $("#view-tab").on("click", "#save-contribution", function (e) {
    e.preventDefault();
    const map_id = $("#view-tab").find(".map-title-info").attr("id");
    setTimeout(() => {
      loadGuestPoints(map_id);
    }, 230);
  });

  // Refresh view-tab point list when contributions are saved
  $("#view-tab").on("click", ".save-new-point", function (e) {
    e.preventDefault();
    const map_id = $("#view-tab").find(".map-title-info").attr("id");
    setTimeout(() => {
      loadMapInfo(map_id)
      loadPoints(map_id);
    }, 250);
  });

  fetchMapList();
});
