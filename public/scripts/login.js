$(document).ready(function() {
  // make login form
  $("#login").on("click", function() {
    $("#loginform").dialog("open");
  });
  // sets dialog specifications and closes dialog if clicked outside
  $("#loginform").dialog({
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
    clickOutsideTrigger: "#login"
  });
  $("#loginform").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const email = formSubmissionData.children("input#email").val();
    const password = formSubmissionData.children("input#password").val();
    $.ajax({
      url: "/login",
      type: "POST",
      data: { email: email, password: password }
    }).then(function(response) {
      if (response === true) {
        $("#loginform").dialog("close");
        document.cookie = "loggedin";
        window.location.reload();
      } else {
        window.alert("Invalid Login");
      }
    });
  });
});
