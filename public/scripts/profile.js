$(document).ready(function() {

  $("#my-profile").on("click", function() {
    renderOwnPosts();
  });
  function renderOwnPosts() {
    $("main").empty();

    // grab all my posts in the database
    $.ajax({
      url: "/user",
      type: "POST",
      data: { username: document.cookie }
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
        <i class='fas fa-chevron-up'></i>
        <p>${likeCount}</p>
        <i class='fas fa-chevron-down'></i>
      </div>
    </footer>
  </article>`;
  }
});
