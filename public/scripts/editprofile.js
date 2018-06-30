$(document).ready(function() {
  $("body").on("click", "#edit-info-button", function() {
    // sets dialog specifications and closes dialog if clicked outside
    var opt = $("#editprofile").dialog({
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
      clickOutsideTrigger: "#edit-info-button"
    });
    // pop up form
    $("#editprofile")
      .dialog(opt)
      .dialog("open");
  });
});
