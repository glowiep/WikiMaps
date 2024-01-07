/* Sidebar AJAX requests here */

$(() => {
  // POST /maps/:username/:user_id/add
  $("#mapForm").submit(function (event) {
    event.preventDefault();
    createMap();
    this.reset();
  });

  function createMap() {
    
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
          $.getScript("./map-auth.js", function () {
            $.createPoint(map.id)
          });

          setTimeout(() => {
            loadMapInfo(map.id)
            loadPoints(map.id)
          }, 150);

          loadMyMaps();
          loadFavorites();
          $fetchMapList();
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
        },
      });
    }
  
  /**
   * Action item: Delete point button - delete point
   * POST /maps/:point_id/points
   */
  $("#view-tab").on("click", ".fa-trash", function(e) {
    e.preventDefault();
    console.log('Point delete clicked!');
    const point_id = $(this).closest('.point-item').attr('id');
    console.log(">>>>>point_id",JSON.stringify({ point_id }));
    
    $.ajax({
      url: "/maps/:point_id/delete",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ point_id }),
      success: function (del) {
        loadPoints(point_id);
        console.log("point is deleted", del);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });


  /**
   * Action item: View Map button - display points list
   * GET /maps/:user_id/:map_id/points
   */
  $("#profile").on("click", ".view-button", function(e) {
    e.preventDefault();
    const map_id = $(this).closest('.card').attr('id');
    loadMapInfo(map_id);
    loadPoints(map_id);
  });

  $("#fav-tab").on("click", ".view-button", function(e) {
    e.preventDefault();
    const map_id = $(this).closest('.card').find('.map-list-item').attr('id');
    loadMapInfo(map_id);
    loadPoints(map_id);
  });

  $("#map-list").on("click", ".card", function(e) {
    e.preventDefault();
    const map_id = $(this).attr('id');
    loadMapInfo(map_id);
    loadPoints(map_id);
  });

  /**
   * Action item: Favorite button
   * POST /maps/favorites/add
   */
  $("#profile").on("click", ".fav-button", function(e) {
    e.preventDefault();
    const map_id = $(this).closest('.card').attr('id');
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
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="private"/>
              <label class="form-check-label" for="private"> Private </label>
            </div>
            <button type="submit" class="btn btn-success" disabled>Save</button>
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
        const $defaultText = $('#view-tab-default');
        const $pointList = $('#point-list');
        // Hide default view tab text
        $defaultText.hide();
        // Clear existing list items
        $pointList.empty();

        // Append point list items based on API response
        $.each(points, function (index, point) {
          $pointList.append(`
            <div class="point-item" id=${point.id}>
              <div>📍 ${point.description} </div>
              <div class="point-actions">
                <button class="icon-button edit-point-button" type="submit">
                  <span><i class="fa-solid fa-pen-to-square action-item"></i></span>
                </button>
                <button class="icon-button delete-point-button" type="submit">
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
            <div class="card" id=${map.id}>
              <a class="map-list-item">
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
                <button class="icon-button delete-button" type="submit" id = ${map.id}>
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
          <div class="card" id=${map.id}>
            <a class="map-list-item">
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
  

  $("#profile").on("click", ".fa-trash", function(e) {
    e.preventDefault();
    console.log('Delelte clicked!');
    const map_id = $(this).closest('.card').attr('id');
    console.log(">>>>>>>map_id<<<<<<",JSON.stringify({ map_id }));
    
    $.ajax({
      url: "/maps/:map_id/delete",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ map_id }),
      success: function (del) {
        loadMyMaps();
        $fetchMapList();
        console.log("maps is deleted", del);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });

  // /maps/:username/:user_id/api/maps/list - loads Discover tab public maps list (for logged in user)
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
        <div class="card" id=${map.id}>
          <button class="icon-button view-button" type="submit">
            <span><i class="fa-solid fa-magnifying-glass action-item"></i></span>
          </button>       
          <div class="map-card discover"><b> ${map.title} </b></div>
          <div class="map-card"> ${map.description} </div>
        </div>
      `)
      }
    })
  };

  $fetchMapList();

  
})