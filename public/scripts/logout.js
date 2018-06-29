$(document).ready(function() {
  // logout
  $("#logout").on("click", function() {
    console.log(document.cookie);

    document.cookie = ";expires=0";
    window.location.reload();
    // delete session cookies from ajax
    $.ajax({
      url: "/logout",
      type: "POST"
    }).then(result => {
      console.log("logged out");
    });
  });
});
