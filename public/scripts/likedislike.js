$(document).ready(function() {
  // check if user is logged in with cookie
  if (document.cookie) {
    $("body").on("click", ".fa-chevron-up", function(event) {
      event.stopImmediatePropagation();
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
        // if response is 1, it has never been liked, if reponse is 2 it was disliked before now liked, if response is 3, it is already liked
        if (response === 1) {
          $downArrow.removeClass("disliked");
          $upArrow.addClass("liked");
          var currentLike = parseInt($upArrow.siblings("p").text(), 10);
          // adds one to the currentlike
          $upArrow.siblings("p").text(currentLike + 1);
        } else if (response === 2) {
          $downArrow.removeClass("disliked");
          $upArrow.addClass("liked");
          var currentLike = parseInt($upArrow.siblings("p").text(), 10);
          // adds two to the currentlike
          $upArrow.siblings("p").text(currentLike + 2);
        } else if (response === 3) {
          console.log("You've already liked this post");
        }
      });
    });
    // same code dislikes
    $("body").on("click", ".fa-chevron-down", function(event) {
      event.stopImmediatePropagation();
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
        // if response is 1, it has never been disliked, if reponse is 2 it was liked before now disliked, if response is 3, it is already disliked
        if (response === 1) {
          $upArrow.removeClass("liked");
          $downArrow.addClass("disliked");
          var currentLike = parseInt($downArrow.siblings("p").text(), 10);
          // adds one to the currentlike
          $downArrow.siblings("p").text(currentLike - 1);
        } else if (response === 2) {
          $upArrow.removeClass("liked");
          $downArrow.addClass("disliked");
          var currentLike = parseInt($downArrow.siblings("p").text(), 10);
          // adds one to the currentlike
          $downArrow.siblings("p").text(currentLike - 2);
        } else if (response === 3) {
          console.log("You've already disliked this post");
        }
      });
    });
  } else {
    $("body").on("click", ".fa-chevron-up", function(event) {
      event.stopImmediatePropagation();
      alert("Please Login or Sign Up to like posts! :)");
    });
    $("body").on("click", ".fa-chevron-down", function(event) {
      event.stopImmediatePropagation();
      alert("Please Login or Sign Up to dislike posts! :)");
    });
  }
});
