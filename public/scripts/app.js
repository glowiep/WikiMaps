// Client facing scripts here

$(() => {
  $("#closeModalBtn").on("click", function () {
    closeMarkerModal();
  });
  function closeMarkerModal() {
    var markerModal = $("#markerModal");
    markerModal.hide();
  }

  $("#contrib-closeModalBtn").on("click", function () {
    closeContribMarkerModal();
  });
  function closeContribMarkerModal() {
    var contribMarkerModal = $("#contrib-markerModal");
    contribMarkerModal.hide();
  }

  // $("#addContribPointBt").on("click", function() {
  //   addContribMarker();
  // })
});