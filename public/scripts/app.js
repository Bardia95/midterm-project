$(document).ready(function() {
  // hides the signup and login buttons
  if (!document.cookie) {
    $("#signup").css("display", "block");
    $("#login").css("display", "block");
    $("#logout").css("display", "none");
    $("#newpost").css("display", "none");
  } else if (document.cookie) {
    $("#logout").css("display", "block");
    $("#newpost").css("display", "block");
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
});
