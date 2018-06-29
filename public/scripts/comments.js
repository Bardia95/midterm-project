$(document).ready(function() {
  // comments
  $("article").on("click", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const content = formSubmissionData.children("textarea").val();
    const post_id = $(this).attr("postid");
    console.log(post_id);


    $.ajax({
      url: "/post/:id/comment",
      type: "POST",
      data: {
        content: content,
        post_id:  post_id,
      }
    }).then(function(response) {
      if (response) {
        console.log("response: ", response);
      } else {
        window.alert("Invalid Comment");
      }
    });
  });
});

