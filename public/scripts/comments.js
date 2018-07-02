$(document).ready(function() {
  $("body").on("click", ".rendered", function(event) {
    const dialogClone = $(this)
      .clone()
      .removeClass("rendered")
      .attr("id", "dialogIsOpen");
    var opt = dialogClone.dialog({
      autoOpen: false,
      modal: true,
      dialogClass: 'noTitleStuff',
      show: {
        effect: "fade",
        duration: 150
      },
      hide: {
        effect: "fade",
        duration: 150
      },
      clickOutside: true,
      clickOutsideTrigger: ".rendered"
    });
    dialogClone.dialog(opt).dialog("open");
    dialogClone.children("aside").css("display", "block");
    const postID = dialogClone.data("postid");
    renderComments(postID, dialogClone);

    if (document.cookie) {
    $("body").on("click", ".fa-chevron-up", function(event) {
      event.stopPropagation();
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
      event.stopPropagation();
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
      event.stopPropagation();
      alert("Please Login or Sign Up to like posts! :)");
    });
    $("body").on("click", ".fa-chevron-down", function(event) {
      event.stopPropagation();
      alert("Please Login or Sign Up to dislike posts! :)");
    });
  }
  });

  $("body").on("submit", ".comment-form", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const content = formSubmissionData.children("textarea").val();
    const postID = $(this)
      .parents("article")
      .data("postid");
    const thisDialog = $(this).parents("article");
    renderComments(postID, thisDialog);
    if (content === "" || content === " ") {
      alert("Please input valid comment");
      return;
    }

    $.ajax({
      url: "/post/comment",
      type: "POST",
      data: {
        content: content,
        post_id: postID
      }
    }).then(function(response) {
      if (response) {
        $("comments").data("");
      } else {
        window.alert("Invalid Comment");
      }
    });
  });
  // sets dialog specifications and closes dialog if clicked outside

  function renderComments(post_id, dialog) {
    dialog.find(".comments").empty();
    $.ajax({
      url: "/post/comments",
      type: "POST",
      data: { post_id: post_id }
    }).then(result => {
      // result is an array of comment objects
      result.forEach(comment => {
        dialog.find(".comments").append(createCommentElement(comment));
      });
    });
  }

  function createCommentElement(comment) {
    const content = comment["text"];

    const username = comment["username"];

    return `
        <p>${content}</p><br>
        <p>- ${username}</p>`;
  }
});
