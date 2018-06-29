$(document).ready(function() {
  $("#my-profile").on("click", function() {
    renderOwnPosts();
  });
  function renderOwnPosts() {
    $("main").empty();
    // grab all my posts in the database
    $.ajax({
      url: "/user",
      type: "GET"
    }).then(result => {
      // result is an array of post objects
      result[0].forEach(post => {
        $("main").prepend(createPostElement(post, result[1]));
      });
    });
  }
  function createPostElement(postObject, arrayOfLikesOrDislikes) {
    const postID = postObject["id"];
    const postTitle = postObject["title"];
    const postDescription = postObject["description"];
    const postDate = postObject["date_posted"];
    const likeCount = postObject["likes_count"];
    let liked = "";
    let disliked = "";
    if (typeof arrayOfLikesOrDislikes === "object") {
      arrayOfLikesOrDislikes.forEach(element => {
        if (element["post_id"] === postID && element["like_or_dislike"] === true) {
          liked = "liked";
        } else if (element["post_id"] === postID && element["like_or_dislike"] === false) {
          disliked = "disliked";
        }
      });
    }
    return ` <article class='post' data-postid=${postID}>
    <header>
      <h2>${postTitle}</h1>
    </header>
    <div class="post-description">
      <p>${postDescription}</p>
    </div>
    <footer>
      <div class='timeposted'>
        <p>${moment(postDate).fromNow()}</p>
      </div>
      <div class='icons'>
        <i class='fas fa-chevron-up ${liked}'></i>
        <p>${likeCount}</p>
        <i class='fas fa-chevron-down ${disliked}'></i>
      </div>
    </footer>
  </article>`;
  }
});
