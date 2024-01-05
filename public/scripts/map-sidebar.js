/* Sidebar AJAX requests here */

$(() => {
  // POST /maps/:username/:user_id/add
  $("#mapForm").submit(function (event) {
    event.preventDefault();
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
        loadMyMaps();
        $fetchMapList();
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });

})