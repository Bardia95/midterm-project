$(document).ready(function() {
  // hides the signup and login buttons
  if (document.cookie.length > 0) {
    $("#signup").css("display", "none");
    $("#login").css("display", "none");
  }

  // make login form
  $("#login").on("click", function() {
    $("#loginform").dialog("open");
  });
  $("#loginform").dialog({
    autoOpen: false,
    modal: true
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
        $("#signup").css("display", "none");
        $("#login").css("display", "none");
      } else {
        window.alert("Invalid Login");
      }
    });
  });

  // signup form
  $("#signup").on("click", function() {
    $("#signupform").dialog("open");
  });
  $("#signupform").dialog({
    autoOpen: false,
    modal: true
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
        $("#signup").css("display", "none");
        $("#login").css("display", "none");
      } else {
        window.alert("Email Or Username Already Exists");
      }
    });
  });
  $("#newpost").on("click", function() {
    // new post form
    console.log("showing post form");

    $(".new-resource").dialog("open");
  });

  $(".new-resource").dialog({
    autoOpen: false,
    modal: true
  });
  $("#resource-form").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const URL = formSubmissionData.children("input#URL").val();
    const type = formSubmissionData.children("input#type").val();
    const subject = formSubmissionData.children("input#subject").val();
    const description = formSubmissionData.children("input#description").val();
    const title = formSubmissionData.children("input#title").val();
    console.log("form submission", event);

    $.ajax({
      url: "/resource",
      type: "POST",
      data: {
        title: title,
        link: URL,
        type: type,
        subject: subject,
        description: description
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
});
