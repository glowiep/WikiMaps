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

  
  /**
   * Action item: Favorite button
   * POST /maps/favorites/add
   */
  $("#profile").on("click", ".fav-button", function(e) {
    e.preventDefault();
    console.log('Anchor clicked!');
    const map_id = $(this).closest('.card').find('.map-list-item').attr('id');
    console.log(JSON.stringify({ map_id }));
    
    $.ajax({
      url: "/maps/favorites/add",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ map_id }),
      success: function (fav) {
        loadFavorites();
        console.log("favorite added created", fav);
        
      },
      error: function (xhr, status, error) {
        loadFavorites();
        console.error("Error:", error);
      },
    });
  });

   /**
   * Action item: Remove Favorite button
   * POST /maps/favorites/delete
   */
   $("#fav-tab").on("click", ".fa-heart-crack", function(e) {
    e.preventDefault();
    console.log('Anchor clicked!');
    const map_id = $(this).closest('.card').find('.map-list-item').attr('id');
    console.log(JSON.stringify({ map_id }));
    
    $.ajax({
      url: "/maps/favorites/delete",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ map_id }),
      success: function (unfav) {
        loadFavorites();
        console.log("favorite is deleted", unfav);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });


  /**
   * Function to load maps for the user, displayed on the profile tab - My Maps
   * GET /maps/:user_id/my-maps
   */
  function loadMyMaps() {
    $.ajax({
      url: `/maps/:user_id/my-maps`,
      type: "GET",
      success: function (maps) {
        const $myMapsList = $('#my-maps-list')
        // Clear existing list items
        $myMapsList.empty();

        // Append new list items based on API response
        $.each(maps, function (index, map) { // eventually link to http://localhost:8080/api/maps/<map_id>
          $myMapsList.append(`
            <div class="card">
              <a class="map-list-item" id=${map.id}>
                <div class="map-card"><b> ${map.title}  </b></div>
                <div class="map-card"> ${map.description} </div>
              </a>
              <div class="item-bar">
                <button class="icon-button fav-button" type="submit">
                  <span><i class="fa-regular fa-heart action-item"></i></span>
                </button>
                <button class="icon-button view-button" type="submit">
                  <span><i class="fa-solid fa-eye action-item"></i></span>
                </button>
                <button class="icon-button edit-button" type="submit">
                  <span><i class="fa-solid fa-pen-to-square action-item"></i></span>
                </button>
                <button class="icon-button delete-button" type="submit">
                  <span><i class="fa-solid fa-trash action-item"></i></span>
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
  loadMyMaps();

  // This loads the list of maps in the contributions tab (for logged in user)
  function loadContributions() {
    $.ajax({
      url: `/maps/:user_id/contributions`,
      type: "GET"
    })
    .done((response) => {
      const $myContribList = $('#my-contrib-list')

      // Clear existing list items
      $myContribList.empty();

      // Append new list items based on API response
      for (const map of response["data"]) {
        $myContribList.append(`
          <div class="card">
            <a class="map-list-item" id=${map.id}>
              <div class="map-card"><b> ${map.title}  </b></div>
              <div class="map-card"> ${map.description} </div>
            </a>
            <div class="item-bar">
              <button class="icon-button fav-button" type="submit">
                <span><i class="fa-regular fa-heart action-item"></i></span>
              </button>
              <button class="icon-button view-button" type="submit">
                <span><i class="fa-solid fa-eye action-item"></i></span>
              </button>
              <button class="icon-button edit-button" type="submit">
                <span><i class="fa-solid fa-pen-to-square action-item"></i></span>
              </button>
            </div>
          </div>
          `)
        }
      })
      .fail((xhr, status, error) => {
        console.error("Error:", error);
      });
  };
  loadContributions();

  // This loads the list of maps in the favorites tab (for logged in user)
  function loadFavorites() {
    $.ajax({
      url: `/maps/:user_id/favorites`,
      type: "GET"
    })
    .done((response) => {
      const $myFavList = $('#my-fav-list')

      // Clear existing list items
      $myFavList.empty();

      // Append new list items based on API response
      for (const map of response["data"]) {
        $myFavList.append(`
          <div class="card">
            <a class="map-list-item" id=${map.id}>
              <div class="map-card"><b> ${map.title}  </b></div>
              <div class="map-card"> ${map.description} </div>
            </a>
            <div class="item-bar">
            <button class="icon-button view-button" type="submit">
              <span><i class="fa-solid fa-eye action-item"></i></span>
            </button>
            <button class="icon-button unfav-button" type="submit">
              <span><i class="fa-solid fa-heart-crack action-item"></i></span>
            </button>
            <button class="icon-button edit-button" type="submit">
              <span><i class="fa-solid fa-pen-to-square action-item"></i></span>
            </button>
            </div>
            </div>
          `)
        }
      })
      .fail((xhr, status, error) => {
        console.error("Error:", error);
      });
  };
  loadFavorites();
  

  // /maps/:username/:user_id/api/maps/list - loads Discover tab public maps list (for logged in user)
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
        <div class="card" id=${map.id}>
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

  
})