// $(document).ready(function() {
//   // comments
//   $(".comment-form").on("submit", function(event) {
//     event.preventDefault();
//     const formSubmissionData = $(event.target);
//     const content = formSubmissionData.children("textarea").val();


//     $.ajax({
//       url: "/post/:id/comment",
//       type: "POST",
//       data: {
//         content: content,
//         post_id:  1,
//         user_id: 1
//       }
//     }).then(function(response) {
//       if (response) {
//         console.log("response: ", response);
//       } else {
//         window.alert("Invalid Comment");
//       }
//     });
//   });
// });

