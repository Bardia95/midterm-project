$(document).ready(function() {
  $("#logo").on("click", function() {
    renderPosts();
  });
  renderPosts();
  function renderPosts() {
    $("main").empty();
    // grab all the posts in the database
    $.ajax({
      url: "/render",
      type: "GET"
    }).then(result => {
      // result[0] is all the posts, result[1] are all liked and dislikes
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
    <aside>
      <div class="comments">
        <p>content</p>
        <p>username</p>
      </div>
      <div class="comments-form">
        <form action="/post/comment" method="POST" class="comment-form">
          <textarea placeholder="comment" name="content"></textarea>
          <input type="submit" name="comment-submit" class="comment-submit">
        </form>
      </div>
    </aside>
  </article>`;
  }


});
