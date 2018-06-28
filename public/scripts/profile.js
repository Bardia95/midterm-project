$(document).ready(function() {
  // Profile Page
  $("#my-profile").on("click", function() {
    $("main").empty();
    let html = `
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
      $('main').append(html);
  });
});
