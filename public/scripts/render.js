$(document).ready(function() {
  $('#logo').on('click', function() {
    renderPosts();
  })
  renderPosts();
  function renderPosts() {
    $("main").empty();
    // grab all the posts in the database
    $.ajax({
      url: "/render",
      type: "POST"
    }).then(result => {
      // result is an array of post objects
      console.log(result[0]);

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
        <p>2</p>
        <i class='fas fa-chevron-down'></i>
      </div>
    </footer>
  </article>`;
  }
});
