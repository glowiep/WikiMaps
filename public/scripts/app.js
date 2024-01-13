// Client facing scripts here

$(() => {
  $("#closeModalBtn").on("click", function () {
    closeMarkerModal();
  });
  function closeMarkerModal() {
    var markerModal = $("#markerModal");
    markerModal.hide();
  }

  $("#contrib-closeModalBtn").on("click", function () {
    closeContribMarkerModal();
  });
  function closeContribMarkerModal() {
    var contribMarkerModal = $("#contrib-markerModal");
    contribMarkerModal.hide();
  }

  $("#signup-button").on("click", function() {
    alert("This is our midterm project. Not accepting new users at this time 🤗");
  })
  
});

// introJs().setOptions({
//   steps: [{
//     intro: "Welcome to wikimaps!"
//   }, {
//     element: document.querySelector('#log-in-button'),
//     intro: "Click here to login!"
//   },
//   {
//     element: document.querySelector('.fa-earth'),
//     intro: "Click here to discover public maps"
//   },{
//     element: document.querySelector('.geocoder-control-input'),
//     intro: "Click here to search for locations"
//   }],
  
// }).start();