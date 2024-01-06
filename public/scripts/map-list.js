// For guest sidebar
$(() => {
  $("#discover-tab").on("click", ".discover", function(e) {
    e.preventDefault();
    const map_id = $(this).attr('id');
    loadPoints(map_id);
  });
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

        // Append point list items based on API response
        $.each(points, function (index, point) {
          $pointList.append(`
            <div class="point-item" id=${point.id}>
              <div>📍 ${point.description} </div>
              <div class="point-actions">
                <button class="icon-button view-point-button">
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
