/* Sidebar AJAX requests here */
import {
  createMap,
  loadFavorites,
  loadContributions,
  loadMapInfo,
  loadDiscoverMapInfo,
  loadMyMaps,
  addPointsToMap,
  fetchMapList,
  loadPoints,
  loadDiscoverPoints,
  clearContribLayer,
  createContribPoint,
  
} from "/scripts/helpers.js";

$(() => {
  // POST /maps/:username/:user_id/add
  $("#mapForm").submit(function (event) {
    event.preventDefault();
    createMap();
    this.reset();
  });

  // POST /maps/:username/:user_id/add-contribution
  $("#view-tab").on("click", "#save-contribution", function (e) {
    e.preventDefault();
    $("#contrib-marker-list").empty();
    $("#save-contribution").hide();

    const map_id = $("#view-tab").find(".map-title-info").attr("id");
    console.log(map_id);
    createContribPoint(map_id)
      .then((results) => {
        // Extract point_ids from results (assuming point has an id property)
        const point_ids = results.map((point) => point.id);

        // Create an array of promises for the second AJAX requests - to add to contributions table
        const secondAjaxPromises = point_ids.map((point_id) => {
          console.log(point_id);
          return $.ajax({
            url: "/maps/:username/:user_id/add-contribution",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ map_id, point_id }),
          });
        });

        // Wait for all the second AJAX requests to complete
        return Promise.all(secondAjaxPromises);
      })
      .then(() => {
        console.log("All contributions processed successfully.");
        loadDiscoverPoints(map_id);
        loadContributions();
      })
      .catch((error) => {
        console.error("Error adding contributions in 2nd promise:", error);
      });
  });

  // POST /maps/:username/:user_id/add-contribution - User add new point to exisiting map
  $("#view-tab").on("click", "#save-new-point", function (e) {
    e.preventDefault();
    $("#contrib-marker-list").empty();
    $("#save-new-point").hide();

    const map_id = $("#view-tab").find(".map-title-info").attr("id");
    console.log(map_id);
    createContribPoint(map_id)
      .then(() => {
        console.log("New point(s) added successfully.");
        loadPoints(map_id);
      })
      .catch((error) => {
        console.error("Error adding new point(s):", error);
      });
  });

  /**
   * Action item: View Map button - display points list
   * GET /maps/:user_id/:map_id/points
   */
  $("#profile").on("click", ".view-button", function (e) {
    e.preventDefault();
    const map_id = $(this).closest(".card").attr("id");
    loadMapInfo(map_id);
    loadPoints(map_id);
    addPointsToMap(map_id);
    // Clear contribution points layer if exists
    setTimeout(() => {
      if (
        $("#contrib-marker-list").length === 0 ||
        $("#contrib-marker-list").is(":empty")
      ) {
        clearContribLayer();
      }
    }, 150);
  });

  $("#fav-tab").on("click", ".view-button", function (e) {
    e.preventDefault();
    const map_id = $(this).closest(".card").find(".map-list-item").attr("id");
    loadDiscoverMapInfo(map_id);
    loadDiscoverPoints(map_id);
    addPointsToMap(map_id);
    // Clear contribution points layer if exists
    setTimeout(() => {
      if (
        $("#contrib-marker-list").length > 0 &&
        $("#contrib-marker-list").is(":empty")
      ) {
        clearContribLayer();
      }
    }, 150);
  });

  $("#map-list").on("click", ".card", function (e) {
    e.preventDefault();
    const map_id = $(this).attr("id");
    loadDiscoverMapInfo(map_id);
    loadDiscoverPoints(map_id);
    addPointsToMap(map_id);
  });

  /**
   * Action item: Favorite button
   * POST /maps/favorites/add
   */
  $("#profile").on("click", ".fav-button", function (e) {
    e.preventDefault();
    const map_id = $(this).closest(".card").attr("id");
    console.log(JSON.stringify({ map_id }));

    if ($(this).find(".fa-heart").hasClass("fa-regular")) {
      $(this).find(".fa-heart").removeClass("fa-regular");
      $(this).find(".fa-heart").addClass("fa-solid");
      addFavAjax(map_id);
    } else {
      $(this).find(".fa-heart").addClass("fa-regular");
      $(this).find(".fa-heart").removeClass("fa-solid");
      removeFavAjax(map_id);
    }
  });

  function addFavAjax(map_id) {
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
        console.error(
          "(Not able to insert into favorites database) Error:",
          error
        );
      },
    });
  }

  /**
   * Action item: Discover page Favorite button
   * POST /maps/favorites/add
   */
  $("#view-tab").on("click", "#discover-fav-button", function (e) {
    e.preventDefault();
    const map_id = $("#view-tab").find(".map-title-info").attr("id");
    console.log(JSON.stringify({ map_id }));
    if ($("#view-tab").find(".fa-heart").hasClass("fa-regular")) {
      $("#view-tab").find(".fa-heart").removeClass("fa-regular");
      $("#view-tab").find(".fa-heart").addClass("fa-solid");
      addFavAjax(map_id);
    } else {
      $("#view-tab").find(".fa-heart").addClass("fa-regular");
      $("#view-tab").find(".fa-heart").removeClass("fa-solid");
      removeFavAjax(map_id);
    }
  });

  /**
   * Action item: Delete contribution circle-minus button
   * POST /maps/contribution/delete
   */
  $("#profile").on("click", ".fa-circle-minus", function (e) {
    e.preventDefault();
    const map_id = $(this).closest(".card").attr("id");
    console.log(JSON.stringify({ map_id }));

    $.ajax({
      url: "/maps/contribution/delete",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ map_id }),
      success: function (contrib) {
        loadContributions();
        console.log("Contribution deleted", contrib);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });

  /**
   * Action item: Delete points
   * POST /maps/point_id/delete
   */
  $("#view-tab").on("click", ".delete-point-button", function (e) {
    e.preventDefault();
    const point_id = $(this).closest(".point-item").attr("id");
    const map_id = $("#map-info-div .map-title-info").attr("id");
    console.log(JSON.stringify({ map_id }));
    console.log(JSON.stringify({ point_id }));

    $.ajax({
      url: "/maps/delete/point",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ point_id }),
      success: function (point) {
        loadPoints(map_id);
        addPointsToMap(map_id);
        console.log("Point deleted", point);
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  });

  $("#fav-tab").on("click", ".fa-heart-crack", function (e) {
    e.preventDefault();
    console.log("Anchor clicked!");
    const map_id = $(this).closest(".card").find(".map-list-item").attr("id");
    console.log(JSON.stringify({ map_id }));
    removeFavAjax(map_id);
  });

  /**
   * Action item: Remove Favorite button
   * POST /maps/favorites/delete
   */
  function removeFavAjax(map_id) {
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
  }

  loadMyMaps();

  loadContributions();

  loadFavorites();

  $("#profile").on("click", ".fa-trash", function (e) {
    e.preventDefault();
    console.log("Delelte clicked!");
    const map_id = $(this).closest(".card").attr("id");
    console.log(">>>>>>>map_id<<<<<<", JSON.stringify({ map_id }));

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

  $("#map-list").on("click", ".discover", function (e) {
    e.preventDefault();
    const map_id = $(this).attr("id");
    loadDiscoverMapInfo(map_id);
    loadDiscoverPoints(map_id);
    addPointsToMap(map_id);
  });

  fetchMapList();
});
