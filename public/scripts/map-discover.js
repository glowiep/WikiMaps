// This loads the list of public maps in the Discover tab (for guest)
$(() => {
  const $fetchMapList = function() {
    $.ajax({
      url: 'api/discover',
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
        <div class="card" id=map${map.id}>
        <a class="map-card" href="#">  
          <i class="fa-solid fa-magnifying-glass action-item"></i> 
          <div class="map-card"><b> ${map.title} </b></div>
          <div class="map-card"> ${map.description} </div>
        </a>         
          </div>
        `)
      }
    })
  };

  $fetchMapList();

});
