$(document).ready(function() {
   const toggleNav = function() {
    if (!document.cookie) {
      $("#signup").css("display", "block");
      $("#login").css("display", "block");
      $("#logout").css("display", "none");
      $("#newpost").css("display", "none");
    } else if (document.cookie) {
      $("#logout").css("display", "block");
      $("#newpost").css("display", "block");
      $("#signup").css("display", "none");
      $("#login").css("display", "none");
      $("#my-profile").css("display", "block");
    }
  }
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
    const username = formSubmissionData.children("input#username").val();
    const password = formSubmissionData.children("input#password").val();
    $.ajax({
      url: "/login",
      type: "POST",
      data: { username: username, password: password }
    }).then(function(response) {
      if (response) {
        $("#loginform").dialog("close");
        document.cookie = username;
        $("#my-profile").html(document.cookie);
        toggleNav();
      } else {
        window.alert("Invalid Login");
      }
    });
  });
});
