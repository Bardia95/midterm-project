$(document).ready(function() {
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
  $(window).on("load", function() {
    $("#my-profile").html("My Profile");
  });
});
