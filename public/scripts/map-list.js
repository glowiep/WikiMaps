/* Sidebar My Maps, Contributions and Favorites lists AJAX requests here */
$(() => {
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
            <div class="card" id=map${map.id}>
              <a class="map-list-item">
                <div class="map-card"><b> ${map.title}  </b></div>
                <div class="map-card"> ${map.description} </div>
              </a>
              <div class="item-bar">
                <button class="icon-button fav-button" type="submit">
                  <span><i class="fa-solid fa-heart action-item"></i></span>
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

  /**
   * This loads the list of maps in the contributions tab (for logged in user)
   * GET /maps/:user_id/contributions
   */
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
          <div class="card" id=map${map.id}>
            <a class="map-list-item" href="#">
              <div class="map-card"><b> ${map.title}  </b></div>
              <div class="map-card"> ${map.description} </div>
            </a>
            <div class="item-bar">
              <button class="icon-button fav-button" type="submit">
                <span><i class="fa-solid fa-heart action-item"></i></span>
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


  /**
   * This loads the list of maps in the contributions tab (for logged in user)
   * GET /maps/:user_id/favorites
   */
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
          <div class="card" id=map${map.id}>
            <a class="map-list-item" href="#">
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

});