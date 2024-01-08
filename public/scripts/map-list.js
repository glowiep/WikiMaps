// For guest sidebar
import { loadDiscoverMapInfo, loadDiscoverPoints, fetchMapList } from "/scripts/helpers.js";
$(() => {
  $("#map-list").on("click", ".card", function(e) {
    e.preventDefault();
    const map_id = $(this).attr('id');
    loadDiscoverMapInfo(map_id);
    loadDiscoverPoints(map_id);
    addPointsToMap(map_id);
  });
  
  // Refresh view-tab point list when contributions are saved
  $("#view-tab").on("click", "#save-contribution", function(e) {
    e.preventDefault();
    const map_id = $("#view-tab").find(".map-title-info").attr('id');
    setTimeout(() => {
      loadDiscoverPoints(map_id);
    }, 230);
  });

  fetchMapList();
});
