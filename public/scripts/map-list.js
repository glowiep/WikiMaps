// For guest sidebar
$(() => {
  $("#map-list").on("click", ".card", function(e) {
    e.preventDefault();
    const map_id = $(this).attr('id');
    loadMapInfo(map_id);
    loadPoints(map_id);
  });

  /**
   * Function to load points based on the map_id, to display on the view tab
   * GET /maps/:user_id/points
   */
  function loadMapInfo(map_id) {
    $.ajax({
      url: `/maps/:user_id/${map_id}/map-info`,
      type: "GET",
      success: function (maps) {
        const $defaultText = $('#view-tab-default');
        const $mapInfo = $('#map-info-div');
        // Hide default view tab text
        $defaultText.hide();
        // Clear map info
        $mapInfo.empty();

        // Append point list items based on API response
        $.each(maps, function (index, map) {
          $mapInfo.append(`
            <h6 id=${map.id}>MAP TITLE</h6>
            <div id="map-title">${map.title}</div>
            <br>
            <h6>MAP DESCRIPTION</h6>
            <div id="map-description">${map.description}</div>
            <br>
          `)
        });
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
  
  /**
   * Function to load points based on the map_id, to display on the view tab
   * GET /maps/:user_id/points
   */
  function loadPoints(map_id) {
    $.ajax({
      url: `/maps/:user_id/${map_id}/points`,
      type: "GET",
      success: function (points) {
        console.log(points);
        const $pointList = $('#point-list')
        // Clear existing list items
        $pointList.empty();

        $pointList.append(`
          <button id="contribute-button" class="btn btn-success">Contribute</button>
        `)

        // Append point list items based on API response
        $.each(points, function (index, point) {
          $pointList.append(`
            <div class="point-item" id=${point.id}>
              <div>📍 ${point.description} </div>
              <div class="point-actions">
                <button class="icon-button view-point-button" type="submit">
                  <span><i class="fa-solid fa-eye action-item"></i></span>
                </button>
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


  // This loads the list of public maps in the Discover tab (for guest)
  const $fetchMapList = function() {
    $.ajax({
      url: 'api/maps/list',
      type: 'GET',
      dataType: 'json'
    })
    .done((response) => {
      const $mapList = $('#map-list');
      // Clear existing list items
      $mapList.empty();

      // Append new list items based on API response
      for (const map of response.maps) {  // eventually link to http://localhost:8080/api/maps/<map_id>
        $mapList.append(`
        <div class="card discover" id=${map.id}>
          <button class="icon-button view-button" type="submit">
            <span><i class="fa-solid fa-magnifying-glass action-item"></i></span>
          </button>       
          <div class="map-card"><b> ${map.title} </b></div>
          <div class="map-card"> ${map.description} </div>
        </div>
        `)
      }
    })
  };

  $fetchMapList();

});
