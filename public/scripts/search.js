$(document).ready(function() {
  $("#search").on("click", function() {
    $(".search-form").dialog("open");
  });
  $(".search-form").dialog({
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
    clickOutsideTrigger: "#search"
  });
  $(".search-form").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const searchterm = formSubmissionData.children("input#searchterm").val();
    const type = formSubmissionData.children("input[name='type']:checked").val();
    const subject = formSubmissionData.children("input[name='subject']:checked").val();

    $.ajax({
      url: "/search",
      type: "POST",
      data: {
        searchterm: searchterm,
        type: type,
        subject: subject
      }
    }).then(response => {
      if (response === 0) {
        $(".search-form").dialog("close");
        $("main").empty();
        $("main").append("<h1>Sorry No Search Results Were Found. Try Again :(</h1>");
      } else if (response === null) {
        alert("Please input something to search for");
      } else {
        $(".search-form").dialog("close");
        // else render all the posts on a new page
        $("main").empty();
        $("main").append("<h1>Your Search Results:</h1>");
        $("main").append('<section class="posts-container"></section>');
        response[0].forEach(post => {
          $(".posts-container").append(createPostElement(post, response[1]));
        });
      }
    });
  });
});

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
