$(document).ready(function() {
  $("body").on("click", ".rendered", function(event) {
    const dialogClone = $(this)
      .clone()
      .removeClass("rendered");
    dialogClone.dialog().dialog("open");
    dialogClone.children("aside").css("display", "block");
    const postID = dialogClone.data("postid");
    renderComments(postID, dialogClone);

    dialogClone.dialog({
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
      clickOutsideTrigger: "$(this)"
    });
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
      console.log(result);
      result.forEach(comment => {
        dialog.find(".comments").append(createCommentElement(comment));
      });
    });
  }

  function createCommentElement(comment) {
    const content = comment["text"];
    console.log(content);
    const username = comment["username"];
    console.log(username);
    return `
        <p>${content}</p><br>
        <p>- ${username}</p>`;
  }
});
