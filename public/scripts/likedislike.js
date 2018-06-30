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
          $upArrow.addClass("liked");
          var currentLike = parseInt($upArrow.siblings("p").text(), 10);
          // adds one to the currentlike
          $upArrow.siblings("p").text(currentLike + 1);
        } else {
          console.log("You've already liked this post");
        }
      });
    });
    // same code dislikes
    $("body").on("click", ".fa-chevron-down", function() {
      const $downArrow = $(this);
      const $upArrow = $(this).siblings("i");
      const $postID = $(this)
        .parents("article")
        .data("postid");
      $.ajax({
        url: "/dislike",
        type: "PUT",
        data: { post_id: $postID }
      }).then(response => {
        if (response === true) {
          $upArrow.removeClass("liked");
          $downArrow.addClass("disliked");
          var currentLike = parseInt($downArrow.siblings("p").text(), 10);
          // adds one to the currentlike
          $downArrow.siblings("p").text(currentLike - 1);
        } else {
          console.log("You've already disliked this post");
        }
      });
    });
  } else {
    $("body").on("click", ".fa-chevron-up", function() {
      alert("Please Login or Sign Up to like posts! :)");
    });
    $("body").on("click", ".fa-chevron-down", function() {
      alert("Please Login or Sign Up to dislike posts! :)");
    });
  }
});
