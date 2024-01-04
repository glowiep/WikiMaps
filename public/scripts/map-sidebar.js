/* Sidebar AJAX requests here */

$(() => {
  // POST /maps/:username/:user_id/add
  
  let counter = 0;
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
    this.reset();
  });



  /**
   * Function to load maps for the user, displayed on the profile tab - My Maps
   * GET /maps/:user_id
   */
  function loadMyMaps() {
    $.ajax({
      url: `/maps/:user_id`,
      type: "GET",
      success: function (maps) {
        const $myMapsList = $('#my-maps-list')
        // Clear existing list items
        $myMapsList.empty();

        // Append new list items based on API response
        $.each(maps, function (index, map) { // eventually link to http://localhost:8080/api/maps/<map_id>
          $myMapsList.append(`
          <div id="my-maps-list">
            <div class="card" id = map${map.id}>
            <a class="map-list-item">
              <div class="map-card"><b> ${map.title}  </b></div>
              <div class="map-card"> ${map.description} </div>

            </a>
            </div>
          </div>
          `)
        });
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
  loadMyMaps();
  

  // This loads the list of public maps in the Discover tab (for logged in user)
  const $fetchMapList = function() {
    $.ajax({
      url: 'api/maps/list',
      type: 'GET',
      dataType: 'json'
    })
    .done((response) => {
      console.log(response);
      const $mapList = $('#map-list');
      // Clear existing list items
      $mapList.empty();

      // Append new list items based on API response
      for (const map of response.maps) {  // eventually link to http://localhost:8080/api/maps/<map_id>
        $mapList.append(`
      <div id="map-list">
        <div class="card">
          <i class="fa-solid fa-magnifying-glass"></i> <a class="map-list-item" href="#"><b>` + map.title + `</b></a>
        </div>
      </div>
      `)
      }
    })
  };

  $fetchMapList();
})