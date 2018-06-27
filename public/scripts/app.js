$(document).ready(function() {
  $("#login").on("click", function() {
    // make popup form
    console.log("showing login form");

    $(".loginform").dialog("open");
  });

  $(".loginform").dialog({
    autoOpen: false,
    modal: true
  });
  $(".loginform").on("submit", function(event) {
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
        $(".loginform").dialog("close");
      } else {
        window.alert("Invalid Login");
      }
    });
  });

  $("#newpost").on("click", function() {
    // make popup form
    console.log("showing post form");

    $(".new-resource").dialog("open");
  });

  $(".new-resource").dialog({
    autoOpen: false,
    modal: true
  });
  $(".new-resource").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const URL = formSubmissionData.children("input#URL").val();
    const type = formSubmissionData.children("input#type").val();
    const subject = formSubmissionData.children("input#subject").val();
    const description = formSubmissionData.children("input#description").val();

    $.ajax({
      url: "/resource",
      type: "POST",
      data: { title: title, link: URL, type: type, subject: subject, description: description }
    }).then(function(response) {
      if (response === true) {
        $(".new-resource").dialog("close");
      } else {
        window.alert("Invalid Post");
      }
    });
  });
});
