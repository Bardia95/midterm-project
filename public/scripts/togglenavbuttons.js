$(document).ready(function() {
  // hides the signup and login buttons
  if (!document.cookie) {
    $("#signup").css("display", "block");
    $("#login").css("display", "block");
    $("#logout").css("display", "none");
    $(".newpost").css("display", "none");
    $("#my-profile").css("display", "none");
  } else if (document.cookie) {
    $("#logout").css("display", "block");
    $("#newpost").css("display", "block");
    $("#my-profile").css("display", "block");
  }
});
