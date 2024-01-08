// For guest sidebar
import { loadMapInfo, loadPoints, fetchMapList } from "/scripts/helpers.js";
$(() => {
  // $("#map-list").on("click", ".card", function(e) {
  //   e.preventDefault();
  //   const map_id = $(this).attr('id');
  //   loadMapInfo(map_id);
  //   loadPointsDiscover(map_id);
  // });
  
  // Refresh view-tab point list when contributions are saved
  // $("#view-tab").on("click", "#save-contribution", function(e) {
  //   e.preventDefault();
  //   const map_id = $("#view-tab").find(".map-title-info").attr('id');
  //   setTimeout(() => {
  //     loadPoints(map_id);
  //   }, 230);
  // });

  fetchMapList();
});
