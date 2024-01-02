$(() => {
  const $fetchMyMaps = function() {
    $.ajax({
      url: '/maps/:username/:user_id/profile/my-maps',
      type: 'GET',
      dataType: 'json'
    })
    .done((response) => {
      const $myMapsList = $('#my-maps-list');
      // Clear existing list items
      // $myMapsList.empty();
      
      // Append list of my maps
      for (const map of response.maps) {
        $myMapsList.append(`
        <div class="card">
        <a class="map-list-item" href="#"><b>` + map.title + `</b></a>
        </div>
        `)
      }
    })
  }

  $fetchMyMaps()
})