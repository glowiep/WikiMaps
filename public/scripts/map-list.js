// For guest sidebar
import { loadMapInfo, loadPoints, fetchMapList } from "/scripts/helpers.js";
$(() => {
  $("#map-list").on("click", ".card", function(e) {
    e.preventDefault();
    const map_id = $(this).attr('id');
    loadMapInfo(map_id);
    loadPoints(map_id);
  });

  fetchMapList();

});
