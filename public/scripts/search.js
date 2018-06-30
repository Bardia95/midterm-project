$(document).ready(function() {
  $("#search").on("click", function() {
    $(".search-form").dialog("open");
  });
  $(".search-form").dialog({
    autoOpen: false,
    modal: true,
    show: {
      effect: "fade",
      duration: 150
    },
    hide: {
      effect: "fade",
      duration: 150
    },
    clickOutside: true,
    clickOutsideTrigger: "#search"
  });
});
