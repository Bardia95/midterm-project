$(document).ready(function() {
  renderPosts();
  // hides the signup and login buttons
  if (!document.cookie) {
    $("#signup").css("display", "block");
    $("#login").css("display", "block");
    $("#logout").css("display", "none");
    $("#newpost").css("display", "none");
    $("#my-profile").css("display", "none");
  } else if (document.cookie) {
    $("#logout").css("display", "block");
    $("#newpost").css("display", "block");
    $("#my-profile").css("display", "block");
  }
  // closes signup/login/post box if clicked outside of element

  // make login form
  $("#login").on("click", function() {
    $("#loginform").dialog("open");
  });
  // sets dialog specifications and closes dialog if clicked outside
  $("#loginform").dialog({
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
    clickOutsideTrigger: "#login"
  });
  $("#loginform").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const email = formSubmissionData.children("input#email").val();
    const password = formSubmissionData.children("input#password").val();
    $.ajax({
      url: "/login",
      type: "POST",
      data: { email: email, password: password }
    }).then(function(response) {
      if (response === true) {
        $("#loginform").dialog("close");
        document.cookie = "loggedin";
        window.location.reload();
      } else {
        window.alert("Invalid Login");
      }
    });
  });

  // signup form
  $("#signup").on("click", function() {
    $("#signupform").dialog("open");
  });
  // sets dialog specifications and closes dialog if clicked outside
  $("#signupform").dialog({
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
    clickOutsideTrigger: "#signup"
  });
  $("#signupform").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const email = formSubmissionData.children("input#email").val();
    const password = formSubmissionData.children("input#password").val();
    const username = formSubmissionData.children("input#username").val();
    $.ajax({
      url: "/register",
      type: "POST",
      data: { email: email, password: password, username: username }
    }).then(function(response) {
      if (response === true) {
        $("#signupform").dialog("close");
        document.cookie = "loggedin";
        window.location.reload();
      } else {
        window.alert("Email Or Username Already Exists");
      }
    });
  });
  // new post form
  $("#newpost").on("click", function() {
    console.log("showing post form");
    $(".new-resource").dialog("open");
  });
  // sets dialog specifications and closes dialog if clicked outside
  $(".new-resource").dialog({
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
  $("#resource-form").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const URL = formSubmissionData.children("input#URL").val();
    const type = formSubmissionData.children("input[name='type']:checked").val();
    const subject = formSubmissionData.children("input[name='subject']:checked").val();
    const description = formSubmissionData.children("textarea#description").val();
    const title = formSubmissionData.children("input#title").val();
    const date = new Date().getTime();

    $.ajax({
      url: "/resource",
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
        console.log("response: ", response);
        $(".new-resource").dialog("close");
      } else {
        window.alert("Invalid Post");
      }
    });
  });
  // logout
  $("#logout").on("click", function() {
    document.cookie = ";expires=0";
    window.location.reload();
    // delete session cookies from ajax
    $.ajax({
      url: "/logout",
      type: "POST"
    }).then(result => {
      console.log("logged out");
    });
  });

  // Profile Page
  $("#my-profile").on("click", function() {
    $("main").empty();
    const html = `
      <section>
        <img src=user.picture>
        <div class="username">
          <h2>user.username</h2>
        </div>
        <div class="userinfo">
          <p>user.email</p> <button>Edit Email</button>
          <button>Edit Password</button>
        </div>
        <input type="radio" name="toggle"> <!-- Toggle between upvoted and own posts -->
        <div class="upposts">
           <article class='post'>
              <header>
                <h2>post.title</h1>
              </header>
              <footer>
                <p>post.description</p>
                <div class='timeposted'>
                  <p>post.date</p>
                </div>
                <div class='icons'>
                  <i class='fas fa-chevron-up'></i>
                  <p>Upvotes - Downvotes</p>
                  <i class='fas fa-chevron-down'></i>
                </div>
              </footer>
              <aside>
                <div class="comments">
                  <p>Comment 1</p>
                  <p>user.username</p>
                </div>
                <form action="/post/comment" action="POST" id="comments-form">
                  <textarea placeholder="Comment"></textarea>
                  <input type="submit" id="comment-submit">
                </form>
              </aside>
            </article>
        </div>
        <div class="ownposts">
          <article class='post'>
              <header>
                <h2>post.title</h1>
              </header>
              <footer>
                <p>post.description</p>
                <div class='timeposted'>
                  <p>post.date</p>
                </div>
                <div class='icons'>
                  <i class='fas fa-chevron-up'></i>
                  <p>Upvotes - Downvotes</p>
                  <i class='fas fa-chevron-down'></i>
                </div>
              </footer>
              <aside>
                <div class="comments">
                  <p>Comment 1</p>
                  <p>user.username</p>
                </div>
                <form action="/post/comment" action="POST" id="comments-form">
                  <textarea placeholder="Comment"></textarea>
                  <input type="submit" id="comment-submit">
                </form>
              </aside>
            </article>
        </div>
      </section>`;
    $("main").append(html);
  });
});

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
