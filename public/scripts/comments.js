$(document).ready(function() {
  // comments
  $("body").on("click", "article", function(event) {
    const post_id = $(this).attr("postid");

    $.ajax({
      url: "/post/comments",
      type: "POST",
      data: {
        post_id:  1,
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

