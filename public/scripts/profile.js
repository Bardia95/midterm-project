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
      $("main").append(createProfileHeader(result[2]));
      $("main").append('<section class="posts-container"></section>');
      // result is an array of post objects
      result[0].forEach(post => {
        $(".posts-container").append(createPostElement(post, result[1]));
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
  function createProfileHeader(profileData) {
    const username = profileData[0]["username"];
    const email = profileData[0]["email"];
    return `
    <div class= "profile-header">
      <img src="https://is4-ssl.mzstatic.com/image/thumb/Music62/v4/83/30/7b/83307ba6-ad08-463e-e4aa-401d112ec5ac/source/1200x630bb.jpg" alt="profile-picture" height="200" width="200">
      <h1>Hello ${username}</h1>
      <button type="button" class="edit-info-button">Edit Profile</button>
      <h2>Your Posts</h2>
    </div>
    <aside>
    <div id="editprofile" style="background-color: lightgreen; display: none">
    <form action="/editprofile" method="post">
      <p>Please enter new password</p>
      <label for="password">Password</label>
      <input id="passwordedit" type="password" name="password">
      <input type="submit" value="submit">
    </form>
  </div>
  </aside>
    `;
  }
});
