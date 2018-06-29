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
      // result is an array of post objects
      result.forEach(post => {
        $("main").prepend(createPostElement(post));
      });
    });
  }

  function createPostElement(postObject) {
    const postID = postObject["id"];
    const postTitle = postObject["title"];
    const postDescription = postObject["description"];
    const postDate = postObject["date_posted"];
    const likeCount = postObject["likes_count"];

    return ` <article class='post rendered' data-postid=${postID}>
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
        <i class='fas fa-chevron-up'></i>
        <p>${likeCount}</p>
        <i class='fas fa-chevron-down'></i>
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
          <input type="submit" name="comment-submit" id="comment-submit">
        </form>
      </div>
    </aside>
  </article>`;
  }


});
