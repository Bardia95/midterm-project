$(document).ready(function() {
  // check if user is logged in with cookie
  if (document.cookie) {
    $("body").on("click", ".fa-chevron-up", function() {
      const $upArrow = $(this);
      const $downArrow = $(this).siblings("i");
      const $postID = $(this)
        .parents("article")
        .data("postid");

      // when clicked do ajax request
      $.ajax({
        url: "/like",
        type: "PUT",
        data: { post_id: $postID }
      }).then(function(response) {
        if (response === true) {
          $downArrow.removeClass("disliked");
          $upArrow.css("color", "gold");
          var currentLike = parseInt($upArrow.siblings("p").text(), 10);
          // adds one to the currentlike
          $upArrow.siblings("p").text(currentLike + 1);
        } else {
          console.log("You've already liked this post");
        }
      });
    });
    // save it into the post likes table with ajax
  }
  // check if user liked it already
});
