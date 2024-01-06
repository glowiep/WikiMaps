// Client facing scripts here

$(() => {
  $("#closeModalBtn").on("click", function () {
    closeMarkerModal();
  });
  function closeMarkerModal() {
    var markerModal = $("#markerModal");
    markerModal.hide();
  }
});