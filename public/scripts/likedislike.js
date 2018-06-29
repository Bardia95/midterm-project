$(document).ready(function() {
  // check if user is logged in with cookie
  if (document.cookie) {
    $("body").on("click", ".fa-chevron-up", function() {
      $(this).css("color", "gold");

      var currentLike = parseInt(
        $(this)
          .siblings("p")
          .text(),
        10
      );
      // adds one to the currentlike
      $(this)
        .siblings("p")
        .text(currentLike + 1);
    });
    // save it into the post likes table with ajax
  }
  // check if user liked it already
});
