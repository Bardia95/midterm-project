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
    const oldPassword = formSubmissionData.children("input#oldpassword").val();
    const newPassword = formSubmissionData.children("input#newpassword").val();

    // ajax request to server
    $.ajax({
      url: "/editprofile",
      type: "PUT",
      data: { oldPassword: oldPassword, newPassword: newPassword }
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
