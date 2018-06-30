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
  $(document).on("submit", "#editprofile", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const password = formSubmissionData.children("input#passwordedit").val();

    // ajax request to server
    $.ajax({
      url: "/editprofile",
      type: "PUT",
      data: { password: password }
    }).then(response => {
      if (response === 1) {
        $("#editprofile").dialog("close");
        alert("Password Succesfully Changed");
      } else {
        alert("Password Change Failed");
      }
    });
  });
});
