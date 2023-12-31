// Client facing scripts here
$(() => {
  console.log("test")
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
      for (const map of response.maps) {
        $mapList.append(`<li class="list"><a href='#'>` + map.title + `</a></li>`);
        // $(`<li class="list">`).text(map.title).appendTo($mapList);
      }
    })
  };

  $fetchMapList();

});
