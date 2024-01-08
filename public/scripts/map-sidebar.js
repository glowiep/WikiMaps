/* Sidebar AJAX requests here */
import { createPoint,createMap,loadFavorites,loadContributions,loadMapInfo,loadMyMaps,addPointsToMap,fetchMapList,loadPoints } from "/scripts/helpers.js";
$(() => {
  // POST /maps/:username/:user_id/add
  $("#mapForm").submit(function (event) {
    event.preventDefault();
    createMap();
    this.reset();
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
    addPointsToMap(map_id);
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

  



 


 
  loadMyMaps();

  
  loadContributions();

  
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
        fetchMapList();
        console.log("maps is deleted", del);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });

  // /maps/:username/:user_id/api/maps/list - loads Discover tab public maps list (for logged in user)
  // const fetchMapList = function() {
  //   $.ajax({
  //     url: 'api/maps/list',
  //     type: 'GET',
  //     dataType: 'json'
  //   })
  //   .done((response) => {
  //     const $mapList = $('#map-list');
  //     // Clear existing list items
  //     $mapList.empty();

  //     // Append new list items based on API response
  //     for (const map of response.maps) {  // eventually link to http://localhost:8080/api/maps/<map_id>
  //       $mapList.append(`
  //       <div class="card" id=${map.id}>
  //         <button class="icon-button view-button" type="submit">
  //           <span><i class="fa-solid fa-magnifying-glass action-item"></i></span>
  //         </button>       
  //         <div class="map-card discover"><b> ${map.title} </b></div>
  //         <div class="map-card"> ${map.description} </div>
  //       </div>
  //     `)
  //     }
  //   })
  // };

  fetchMapList();

  
})