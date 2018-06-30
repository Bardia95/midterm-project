$(document).ready(function() {
  // new post form
  $("#newpost").on("click", function() {
    $(".new-post").dialog("open");
  });
  // sets dialog specifications and closes dialog if clicked outside
  $(".new-post").dialog({
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
    clickOutsideTrigger: "#newpost"
  });
  $(".post-form").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const URL = formSubmissionData.children("input#URL").val();
    const type = formSubmissionData.children("input[name='type']:checked").val();
    const subject = formSubmissionData.children("input[name='subject']:checked").val();
    const description = formSubmissionData.children("textarea.description").val();
    const title = formSubmissionData.children("input#title").val();
    const date = new Date().getTime();

    $.ajax({
      url: "/post",
      type: "POST",
      data: {
        title: title,
        link: URL,
        type: type,
        subject: subject,
        description: description,
        date: date
      }
    }).then(function(response) {
      if (response) {
        $("post").data("");
        $(".new-post").dialog("close");
        renderPosts();
      } else {
        window.alert("Invalid Post");
      }
    });
  });
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
        <p>2</p>
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
          <input type="submit" name="comment-submit" class="comment-submit">
        </form>
      </div>
    </aside>
  </article>`;
  }
});
