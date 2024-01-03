// This loads the list of public maps in the Discover tab (for both )
$(() => {
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

});
