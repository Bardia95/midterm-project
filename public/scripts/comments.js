$(document).ready(function() {
  // comments
  $("body").on("click", ".rendered", function(event) {
    // const post_id = $(this).attr("postid");
    // $('article').dialog().dialog('close');
    let dialogClone = $(this).clone().removeClass('rendered');
    dialogClone.dialog().dialog("open");
    dialogClone.children('aside').css("display", "block");

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
    clickOutsideTrigger: "body"
    });
  });

  $(".comment-form").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const content = formSubmissionData.children("textarea").val();

    $.ajax({
      url: "/post/comment",
      type: "POST",
      data: {
        content: content,

      }
    }).then(function(response) {
      if (response === true) {
        $("comments").data("");
        renderComments();
      } else {
        window.alert("Invalid Comment");
      }
    });
  });
  // sets dialog specifications and closes dialog if clicked outside

  function renderPosts() {
    $("comments").empty();
    // grab all the posts in the database
    $.ajax({
      url: "/post/comment",
      type: "GET"
    }).then(result => {
      // result is an array of post objects
      result.forEach(comment => {
        $("comments").prepend(createPostElement(comment));
      });
    });
  };
});
